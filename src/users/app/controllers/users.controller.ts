import {Body, Controller, Get, Logger, Param, Post, Req} from '@nestjs/common';
import {UsersService} from '../../domain/services/users.service';
import {ApiOperation, ApiResponse, ApiUseTags} from '@nestjs/swagger';
import {AddressDto, UsersDto} from '../../domain/dtos/users.dto';
import {Request} from 'express';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiOperation({title: 'Get info user'})
    @ApiResponse({status: 200, description: 'Get info user'})
    @Get('profile/:id')
    async getProfileUser(@Param() param) {
        const obj = await this.usersService.getProfileUser(param.id);
        return obj;
    }

    @ApiOperation({title: 'Update info user'})
    @ApiResponse({status: 200, description: 'Update info user'})
    @Post('update_info')
    async updateInfoUser(@Body() obj: UsersDto) {
        const status = await this.usersService.updateInfoUser(obj);
        return status;
    }

    @ApiOperation({title: 'Insert address user'})
    @ApiResponse({status: 200, description: 'Insert address user'})
    @Post('store_address')
    async storeAddressUser(@Body() obj: AddressDto) {
        // const status = await this.usersService.storeAddressUser(obj);
        // return status;
        return '1';
    }
}
