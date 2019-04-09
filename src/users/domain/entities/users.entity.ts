import {AddressDto, UsersDto} from '../dtos/users.dto';

export class UsersEntity {
    public partner_id: any;
    public x_gender: any;
    public x_avatar: any;
    public x_birthday: any;

    public name: any;
    public email: any;
    public phone: any;
    public mobile: any;

    public address_id: any;
    public x_address_name: any;
    public x_default_address: any;
    public x_details_address: any;
    public x_name: any;
    public x_partner_id: any;
    public x_receive_address: any;
    public x_default_address_id: any;

    assignInfoFromReq(obj: UsersDto) {
        this.partner_id = obj.partner_id;
        this.x_gender = obj.x_gender;
        this.x_avatar = obj.x_avatar;
        this.x_birthday = obj.x_birthday;
    }

    assignAddressFromReq(obj: AddressDto) {
        this.address_id = parseInt(obj.id);
        this.x_address_name = obj.x_address_name;
        this.x_default_address = parseInt(obj.x_default_address);
        this.x_details_address = obj.x_details_address;
        this.x_name = obj.x_name;
        this.x_partner_id = parseInt(obj.x_partner_id);
        this.x_receive_address = parseInt(obj.x_receive_address);
        this.x_default_address_id = parseInt(obj.x_default_address_id);
    }
}
