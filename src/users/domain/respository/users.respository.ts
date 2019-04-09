import {AddressDto, UsersDto} from '../dtos/users.dto';
import {UsersEntity} from '../entities/users.entity';
import {UsersModel} from '../models/users.model';

export class UsersRespository {

    async getProfileUser(id: any) {
        const model = new UsersModel();
        const obj = await model.getUserInfo(id);
        return obj;
    }
    async updateInfoUser(obj: UsersDto) {
        const model = new UsersModel();
        const userEntity = new UsersEntity();
        userEntity.assignInfoFromReq(obj);
        const status = await model.updateUserInfo(userEntity);
        return status;
    }

    async storeAddressUser(obj: AddressDto) {
        const model = new UsersModel();
        const userEntity = new UsersEntity();
        userEntity.assignAddressFromReq(obj);
        const status = await model.storeAddressUser(userEntity);
        return status;
    }
}
