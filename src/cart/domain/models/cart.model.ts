import {Redis} from '../../../helpers/redis';
import * as lodash from 'lodash';

export class CartModel {

    public redis = new Redis();

    getCart = async (id: any, req: any) => {
        const status = await this.redis.checkRedis('CART_' + id);
        let cart: any = [];
        if (status === 0) {
            await this.redis.setRedis('CART_' + id, req, 31556926);
            cart = req;
        } else {
            let old_cart: any = [];
            old_cart = await this.redis.getRedis('CART_' + id);
            old_cart.forEach((value) => {
                req.forEach((v) => {
                    if (value.id === v.id && value.qty !== v.qty) {
                        value.qty = v.qty;
                    }
                });
            });
            const new_cart = lodash.differenceBy(req, old_cart, 'id');
            if (Object.entries(new_cart).length > 0) {
                old_cart.push(new_cart[0]);
            }
            cart = old_cart;
            await this.redis.setRedis('CART_' + id, cart, 31556926);
        }
        return cart;
    }

    deleteItem = async (id: any, partner_id: any) => {
        const status = await this.redis.checkRedis('CART_' + partner_id);
        let cart: any = [];
        if (status === 1) {
            cart = await this.redis.getRedis('CART_' + partner_id);
            if (typeof id !== 'undefined') {
                cart = lodash.reject(cart,  (el) => {
                    return el.id === id;
                });
                await this.redis.setRedis('CART_' + partner_id, cart, 31556926);
            }
        }
        return cart;
    }
}
