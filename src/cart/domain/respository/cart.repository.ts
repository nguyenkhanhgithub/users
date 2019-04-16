import {CartEntity} from '../entities/cart.entity';
import {CartModel} from '../models/cart.model';

export class CartRepository {

    private model = new CartModel();

    getCart = async (id: any, req: any) => {
        // request = req (du lieu test thu)
        const request: any = [
            {
                id: 201,
                img: 'https://cp.chozoi.com/public/ImgProduct/205/anh0.jpeg',
                name: 'Ghế đẹp',
                price: 1600000,
                qty: 16,
                url: 'Ghe_rat_dep_205'
            },
            {
                id: 120,
                img: 'https://cp.chozoi.com/public/ImgProduct/205/anh0.jpeg',
                name: 'Ghe Xau',
                price: 2000000,
                qty: 16,
                url: 'Ghe_rat_dep_206',
            }
        ]
        const cart: any = [];
        let result: any;
        if (Object.entries(request).length > 0) {
            request.forEach((value, index) => {
                const cartEntity = new CartEntity();
                cartEntity.assignCartFromReq(value);
                cart.push(cartEntity);
            });
        }
        result = this.model.getCart(id, cart);
        return result;
    }
}