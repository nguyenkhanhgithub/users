import * as passport from 'passport';
import * as passportLocal from 'passport-local';
import * as passportFacebook from 'passport-facebook';
import * as passportGoogle from 'passport-google-oauth';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as bcrypt from 'bcrypt';
import * as CryptoJS from 'crypto-js';
import {AuthModel} from '../models/auth.model';
import {Redis} from '../../../helpers/redis';
import validate from '../../../helpers/validate';

const LocalStrategy = passportLocal.Strategy;
const FacebookStrategy = passportFacebook.Strategy;
const GoogleStrategy = passportGoogle.OAuth2Strategy;

export default class PassportService {

    public model = new AuthModel();
    public redis = new Redis();
    public prefix = 'MIDAS_';

    public initialize = () => {
        passport.use('login', this.loginLocal());
        passport.use('facebook', this.loginFacebook());
        passport.use('google', this.loginGoogle());
        passport.use('register', this.registerLocal());
        dotenv.config();
        return passport.initialize();
    }

    public callLoginLocal = (req: express.Request, callBack: any) => {
        passport.authenticate('login', callBack)(req);
    }

    private loginLocal = (): passportLocal.Strategy => {
        return new LocalStrategy({
            usernameField: 'username',
            passwordField: 'x_password',
            passReqToCallback: true,
        }, async (req, username, x_password, done: (error: any, value?: any) => void) => {
            const requests: any = {
                username: username
            };
            const obj = await this.model.loginLocal(requests);
            if (Object.entries(obj).length !== 0) {
                const isPasswordMatching = await bcrypt.compare(x_password, obj[0].x_password);
                if (isPasswordMatching === true) {
                    delete obj[0].x_password;
                    return done(null, obj[0]);
                } else {
                    return done(null, false);
                }
            } else {
                return done(null, false);
            }
        });
    }

    public callLoginFacebook = (req: express.Request, res: express.Response, callback: any) => {
        passport.authenticate('facebook', { scope : ['email'] }, callback)(req, res);
    }

    private loginFacebook = (): passportFacebook.Strategy => {
        return new FacebookStrategy({
            clientID: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET,
            callbackURL: '/auth/facebook',
            profileFields: ['name', 'emails', 'link', 'locale', 'timezone'],
            passReqToCallback: true,
        }, async  (req: any, accessToken: string, refreshToken: string, profile: any, done: (error: any, value?: any) => void) => {
            const requests: any = {
                username: profile._json.email,
                x_provider: profile.provider,
                x_provider_id: profile.id,
            };
            const obj = await this.model.validateUserByEmail(requests);
            if (Object.entries(obj).length === 1) {
                return done(null, obj[0]);
            } else {
                const status = await this.model.storeUser(requests);
                return done(null, status);
            }
        });
    }

    public callLoginGoogle = (req: express.Request, res: express.Response, callback: any) => {
        passport.authenticate('google', { scope: ['profile', 'email'] }, callback)(req, res);
    }

    private loginGoogle = (): passportGoogle.OAuth2Strategy => {
        return new GoogleStrategy({
            clientID: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: '/auth/google',
            passReqToCallback: true,
        }, async (req: any, accessToken: string, refreshToken: string, profile: any, done: (error: any, value?: any) => void) => {
            const requests: any = {
                username: profile._json.email,
                x_provider: profile.provider,
                x_provider_id: profile.id,
            };
            const obj = await this.model.validateUserByEmail(requests);
            if (Object.entries(obj).length === 1) {
                return done(null, obj[0]);
            } else {
                const status = await this.model.storeUser(requests);
                return done(null, status);
            }
        });
    }

    public callRegisterLocal = (req: express.Request, callBack: any) => {
        passport.authenticate('register', callBack)(req);
    }

    private registerLocal = (): passportLocal.Strategy => {
        return new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true,
        }, async (req, username, password, done: (error: any, value?: any) => void) => {
            try {
               const status = await this.model.checkUser(username);
               if (status === 1) {
                   return done(null, {message: `${this.prefix}ERROR_EXISTS_USERNAME`});
               } else {
                   if (req.body.confirm_password !== password) {
                       return done(false, {message: `${this.prefix}ERROR_CONFIRM`});
                   } else {
                       const REDIS_DATA: any = {
                           username: username,
                           password: password,
                       };
                       const res: any = {
                           data: null,
                           message: null,
                       }
                       if (validate.regexPhoneNumber(username) !== true) {
                            // TODO: redister bang email
                            const ACTIVE_CODE = this.generateActiveCode(10, 99);
                            REDIS_DATA.active_code = ACTIVE_CODE;
                            this.redis.setRedis(`REG_EMAIL_CODE` + username + ACTIVE_CODE, REDIS_DATA, 3600);
                            // TODO: send mail o day
                            const stt_mail = await this.sendEmailVertify(REDIS_DATA, ACTIVE_CODE);
                            if (stt_mail === true) {
                                res.data = stt_mail;
                                res.message = `${this.prefix}SEND_SUCCESS`;
                            } else {
                                res.data = null;
                                res.message = `${this.prefix}SEND_FALSE`;
                            }
                       } else {
                            // TODO: register bang otp
                            const OTP = 'OTP1234';
                            REDIS_DATA.active_code = OTP;
                            this.redis.setRedis(`REG_PHONE_OTP` + username + OTP, REDIS_DATA, 600);
                            res.data = true
                            res.message = `${this.prefix}SEND_SUCCESS`;
                       }
                       return done(null, res);
                   }
               }
            } catch (e) {
                done(e);
            }
        });
    }

    public vertifyAction = async (request: any, callBack: any) => {
        if (validate.regexPhoneNumber(request.username) !== true) {
            const result = await this.vertifyActiveCode(request);
            callBack(null, result);
        } else {
            const result = await this.vertifyOTP(request);
            callBack(null, result);
        }
    }

    private vertifyActiveCode = async (request: any) => {
        if (typeof request.active_code !== 'undefined') {
            const status = await this.redis.checkRedis(`REG_EMAIL_CODE` + request.username + request.active_code);
            const done: any = {
                data: null,
                message: null,
            };
            if (status === 1) {
                const obj = await this.redis.getRedis(`REG_EMAIL_CODE` + request.username + request.active_code);
                const result = await this.model.storeUser(obj);
                if (result > 0) {
                    await this.redis.delRedis(`REG_PHONE_OTP` + request.username + request.active_code);
                    done.data = result;
                    done.message = `${this.prefix}REG_SUCCESS`;
                }
                return done;
            } else {
                done.data = null;
                done.message = `${this.prefix}ERROR_ACTIVE_CODE`;
                return done;
            }
        }
    }

    private vertifyOTP = async (request: any) => {
        if (typeof request.active_code !== 'undefined') {
            const status = await this.redis.checkRedis(`REG_PHONE_OTP` + request.username + request.active_code);
            const done: any = {
                data: null,
                message: null,
            };
            if (status === 1) {
                const obj = await this.redis.getRedis(`REG_PHONE_OTP` + request.username + request.active_code);
                const result = await this.model.storeUser(obj);
                if (result > 0) {
                    await this.redis.delRedis(`REG_PHONE_OTP` + request.username + request.active_code);
                    done.data = result;
                    done.message = `${this.prefix}REG_SUCCESS`;
                }
                return done;
            } else {
                done.data = null;
                done.message = `${this.prefix}ERROR_ACTIVE_CODE`;
                return done;
            }
        }
    }

    public active_link = async (request: any, callBack: any) => {
        const key = request.query.active;
        const status = await this.redis.checkRedis(key);
        const done: any = {
            data: null,
            message: null,
        }
        if (status === 1) {
            const obj = await this.redis.getRedis(key);
            const stt = await this.model.storeUser(obj);
            if (stt > 0) {
                await this.redis.delRedis(key);
                done.data = stt;
                done.message = `${this.prefix}REG_SUCCESS`;
            }
            callBack(null, done);
        } else {
            done.message = `${this.prefix}REG_FAILED`;
            callBack(null, done);
        }
    }

    private sendEmailVertify = async (request: any, active_code: any) => {
        const ciphertext = CryptoJS.AES.encrypt(active_code, 'SECRET_KEY' + active_code).toString();
        const bytes = CryptoJS.AES.decrypt(ciphertext.toString(), 'SECRET_KEY' + active_code).toString();
        const active_link = `${process.env.APP_URL}/auth/vertify_link?active=` + bytes + '&expire=3600';
        await this.redis.setRedis(bytes, request, 3600);
        let status: any;
        (await this.redis.checkRedis(bytes) === 1) ? status = true : status = false;
        return new Promise<boolean>( async (resolve, reject) => {
            resolve(status);
        });
    }

    private generateActiveCode = (min: number, max: number): string => {
        const CODE = new Date().getTime();
        const SUB_CODE = CODE.toString().substr(-4, 4);
        const RANDOM_NUMBER =  Math.floor(Math.random() * (max - min + 1) ) + min;
        return RANDOM_NUMBER.toString() + SUB_CODE;
    }
}
