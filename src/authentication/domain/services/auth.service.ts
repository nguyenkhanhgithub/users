import {Injectable, Req, Res} from '@nestjs/common';
import {RegisterDto, LoginDto, VertifyDto} from '../dtos/auth.dto';
import {AuthRepository} from '../respository/auth.repository';

@Injectable()
export class AuthService {
    constructor(private readonly repository: AuthRepository) {}

    async registerLocal(obj: RegisterDto, @Req() req) {
        const status = this.repository.registerLocal(obj, req);
        return status;
    }

    async vertify(obj: VertifyDto) {
        const status = this.repository.vertify(obj);
        return status;
    }

    async vertifyLink(@Req() req) {
        const status = this.repository.vertifyLink(req);
        return status;
    }

    async loginLocal(obj: LoginDto, @Req() req) {
        const result = this.repository.loginLocal(obj, req);
        return result;
    }

    async loginFacebook(@Req() req, @Res() res, callBack: any) {
        const result = this.repository.loginFacebook(req, res, (error: any, value: any) => {
            callBack(null, value);
        });
        return result;
    }

    async loginGoogle(@Req() req, @Res() res, callBack: any) {
        const result = this.repository.loginGoogle(req, res, (error: any, value: any) => {
            callBack(null, value);
        });
        return result;
    }
}
