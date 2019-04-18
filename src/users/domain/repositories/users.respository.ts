import {AddressDto, UsersDto} from '../dtos/users.dto';
import {UsersEntity} from '../entities/users.entity';
import {UsersModel} from '../models/users.model';

export class UsersRespository {

    public model = new UsersModel();
    public userEntity = new UsersEntity();

    async getProfileUser(id: any) {
        const obj = await this.model.getUserInfo(id);
        return obj;
    }
    async updateInfoUser(obj: UsersDto) {
        this.userEntity.assignInfoFromReq(obj);
        const status = await this.model.updateUserInfo(this.userEntity);
        return status;
    }

    async storeAddressUser(obj: AddressDto) {
        this.userEntity.assignAddressFromReq(obj);
        const status = await this.model.storeAddressUser(this.userEntity);
        let address: any = [];
        if (status > 0) {
            address = await this.getAddressUser(obj.x_partner_id);
        }
        return address;
    }

    async updateAddressUser(obj: AddressDto) {
        this.userEntity.assignAddressFromReq(obj);
        const status = await this.model.updateAddressUser(this.userEntity);
        let address: any = [];
        if (status > 0) {
            address = await this.getAddressUser(obj.x_partner_id);
        }
        return address;
    }

    async deleteAddressUser(request: any) {
        const status = await this.model.deleteAddressUser(request);
        return status;
    }

    async getAddressUser(partner_id: any) {
        const address = await this.model.getAddressUser(partner_id);
        return address;
    }
}
