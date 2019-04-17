import {LoginDto, RegisterDto, VertifyDto} from '../dtos/auth.dto';
import PassportService from '../passport/passport.service';
import {Req, Res} from '@nestjs/common';

export class AuthRepository {
    public passport = new PassportService();

    async registerLocal(obj: RegisterDto, @Req() req) {
        return new Promise((resolve, reject) => {
            this.passport.callRegisterLocal(req, (error: any, value: any) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(value);
            });
        });
    }

    async vertify(obj: VertifyDto) {
        return new Promise((resolve, reject) => {
            this.passport.vertifyAction(obj, (error: any, value: any) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(value);
            });
        });
    }

    async vertifyLink(@Req() req) {
        return new Promise((resolve, reject) => {
            this.passport.active_link(req, (error: any, value: any) => {
                if (error) {
                    reject(error);
                    return;
                }
                let message: any;
                if (value.data === null) {
                    message = 'Link kích hoạt tài khoản đã hết hiệu lực.';
                } else {
                    message = 'Tài khoản của bạn đã được kích hoạt';
                }
                resolve(message);
            });
        });
    }

    async loginLocal(obj: LoginDto, @Req() req) {
        return new Promise((resolve, reject) => {
            this.passport.callLoginLocal(req, (error: any, value: any) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(value);
            });
        });
    }

    async loginFacebook(@Req() req, @Res() res, callBack: any) {
        this.passport.callLoginFacebook(req, res, (error: any, value: any) => {
            callBack(null, value);
        });
    }
    async loginGoogle(@Req() req, @Res() res, callBack: any) {
        this.passport.callLoginGoogle(req, res, (error: any, value: any) => {
            callBack(null, value);
        });
    }
}
