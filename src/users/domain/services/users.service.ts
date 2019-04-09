import {Injectable, Logger} from '@nestjs/common';
import {UsersRespository} from '../respository/users.respository';
import {AddressDto, UsersDto} from '../dtos/users.dto';

@Injectable()
export class UsersService {
    constructor(private readonly respository: UsersRespository ) {}

    async getProfileUser(id: any) {
        const obj = await this.respository.getProfileUser(id);
        return obj;
    }

    async updateInfoUser(obj: UsersDto) {
        const status = await this.respository.updateInfoUser(obj);
        return status;
    }

    async storeAddressUser(obj: AddressDto) {
        const status = await this.respository.storeAddressUser(obj);
        return status;
    }

    async updateAddressUser(obj: AddressDto) {
        const status = await this.respository.updateAddressUser(obj);
        return status;
    }

    async deleteAddressUser(request: any) {
        const status = await this.respository.deleteAddressUser(request);
        return status;
    }
}
