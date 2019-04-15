import {LoginDto, RegisterDto} from '../dtos/auth.dto';

export class AuthEntity {

    public username: string;
    public password: string;

    assignAuthFromReq(obj: LoginDto) {
        this.username = obj.username;
        this.password = obj.x_password;
    }
}
