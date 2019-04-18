import {Body, Controller, Get, Post, Req, Res} from '@nestjs/common';
import {ApiOperation, ApiResponse} from '@nestjs/swagger';
import {LoginDto, RegisterDto, VertifyDto} from '../../domain/dtos/auth.dto';
import {AuthService} from '../../domain/services/auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}
    @ApiOperation({title: 'login authentication'})
    @ApiResponse({status: 200, description: 'login authentication'})
    @Post('register')
    async registerLocal(@Body() obj: RegisterDto, @Req() req) {
        const result = await this.authService.registerLocal(obj, req);
        return result;
    }

    @ApiOperation({title: 'Active account'})
    @ApiResponse({status: 200, description: 'Active account'})
    @Post('vertify')
    async vertify(@Body() obj: VertifyDto) {
        const status = await this.authService.vertify(obj);
        return status;
    }

    @ApiOperation({title: 'Active link'})
    @ApiResponse({status: 200, description: 'Active link'})
    @Get('vertify_link')
    async vertifyLink(@Req() req) {
        const status = await this.authService.vertifyLink(req);
        return status;
    }

    @ApiOperation({title: 'login authentication'})
    @ApiResponse({status: 200, description: 'login authentication'})
    @Post('login')
    async loginLocal(@Body() login: LoginDto, @Req() req) {
        const result = await this.authService.loginLocal(login, req);
        return result;
    }

    @ApiOperation({title: 'Facebook passport authentication'})
    @ApiResponse({status: 200, description: 'Facebook passport authentication'})
    @Get('facebook')
    async loginFacebook(@Req() req, @Res() res) {
        await this.authService.loginFacebook(req, res, (error: any, value: any) => {
            res.send({statusCode: 200, data: value});
        });
    }

    @ApiOperation({title: 'Google passport authentication'})
    @ApiResponse({status: 200, description: 'Google passport authentication'})
    @Get('google')
    async loginGoogle(@Req() req, @Res() res) {
        await this.authService.loginGoogle(req, res, (error: any, value: any) => {
            res.send({statusCode: 200, data: value});
        });
    }
}
