import {Redis} from '../../../helpers/redis';
import {Logger} from '@nestjs/common';

export class CartModel {

    public redis = new Redis();

    getCart = async (id: any, req: any) => {
        const status = await this.redis.checkRedis('CART_' + id);
        let cart: any = [];
        if (status === 0) {
            await this.redis.setRedis('CART_' + id, req, 31556926);
            cart = req;
        } else {
            const result = await this.redis.getRedis('CART_' + id);
            cart = result;
            cart.forEach((value, index) => {
            });
        }
        return cart;
    }
}