import { IsNotEmpty } from 'class-validator';

export class LoginDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;
}

export class RegisterDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    confirm_password: string;
}

export class VertifyDto {

    username: string;

    @IsNotEmpty()
    active_code: string;
}