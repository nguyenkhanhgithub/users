import {Injectable, Logger} from '@nestjs/common';
import {UsersRespository} from '../respository/users.respository';
import {AddressDto, UsersDto} from '../dtos/users.dto';

@Injectable()
export class UsersService {
    constructor(private readonly respository: UsersRespository ) {}

    getProfileUser = async (id: any) => {
        const obj = await this.respository.getProfileUser(id);
        return obj;
    }

    updateInfoUser = async (obj: UsersDto) => {
        const status = await this.respository.updateInfoUser(obj);
        return status;
    }

    storeAddressUser = async (obj: AddressDto) => {
        const status = await this.respository.storeAddressUser(obj);
        return status;
    }

    updateAddressUser = async (obj: AddressDto) => {
        const status = await this.respository.updateAddressUser(obj);
        return status;
    }

    deleteAddressUser = async (request: any) => {
        const status = await this.respository.deleteAddressUser(request);
        return status;
    }
}
