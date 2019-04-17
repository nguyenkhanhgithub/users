import { Injectable } from '@nestjs/common';
import {CartRepository} from '../respository/cart.repository';

@Injectable()
export class CartService {
    constructor(private readonly respository: CartRepository) {}
     getCart = async (id: any, req: any) => {
        const obj = this.respository.getCart(id, req);
        return obj;
    }

    deleteItem = async (id: any, partner_id: any) => {
        const obj = this.respository.deleteItem(id, partner_id);
        return obj;
    }
}
