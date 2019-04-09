import {Body, Controller, Delete, Get, Logger, Param, Post, Put, Req} from '@nestjs/common';
import {UsersService} from '../../domain/services/users.service';
import {ApiOperation, ApiResponse, ApiUseTags} from '@nestjs/swagger';
import {AddressDto, UsersDto} from '../../domain/dtos/users.dto';
import {Request} from 'express';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiOperation({title: 'Get info user'})
    @ApiResponse({status: 200, description: 'Get info user'})
    @Get('info/:id')
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
        const status = await this.usersService.storeAddressUser(obj);
        return status;
    }

    @ApiOperation({title: 'Update address user'})
    @ApiResponse({status: 200, description: 'Update address user'})
    @Put('update_address')
    async updateAddressUser(@Body() obj: AddressDto) {
        const status = await this.usersService.updateAddressUser(obj);
        return status;
    }

    @ApiOperation({title: 'Delete address user'})
    @ApiResponse({status: 200, description: 'Delete address user'})
    @Delete('delete_address/:id')
    async deleteAddressUser(@Param() param, @Req() request: Request) {
        const req: any  = {
            id: param.id,
            x_partner_id: request.body.x_partner_id
        }
        const status = this.usersService.deleteAddressUser(req);
        return status;
    }
}
