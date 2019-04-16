import {CartDto} from '../dtos/cart.dto';

export class CartEntity {
    public id: any;
    public img: any;
    public name: any;
    public price: any;
    public qty: any;
    public url: any;

    assignCartFromReq(obj: CartDto) {
        this.id = parseInt(obj.id);
        this.img = obj.img;
        this.name = obj.name;
        this.price = parseFloat(obj.price);
        this.qty = parseInt(obj.qty);
        this.url = obj.url;
    }
}