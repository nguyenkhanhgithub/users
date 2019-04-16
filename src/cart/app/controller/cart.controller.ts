import {Body, Controller, Get, Param, Post, Req, Res} from '@nestjs/common';
import {ApiOperation, ApiResponse} from '@nestjs/swagger';
import {CartService} from '../../domain/services/cart.service';
import {CartDto} from '../../domain/dtos/cart.dto';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}
    @ApiOperation({title: 'Shopping cart user'})
    @ApiResponse({status: 200, description: 'Shopping cart user'})
    @Post(':id')
    async getCart(@Param() param, @Body() cart: CartDto) {
        const obj = this.cartService.getCart(param.id, cart);
        return obj;
    }
}
