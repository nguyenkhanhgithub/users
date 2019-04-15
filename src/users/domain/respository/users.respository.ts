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
        return status;
    }

    async updateAddressUser(obj: AddressDto) {
        this.userEntity.assignAddressFromReq(obj);
        const status = await this.model.updateAddressUser(this.userEntity);
        return status;
    }

    async deleteAddressUser(request: any) {
        const status = await this.model.deleteAddressUser(request);
        return status;
    }
}
