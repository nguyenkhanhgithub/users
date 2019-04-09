import Modoo from '../base_models/modoo';
import {Redis} from '../helpers/redis';

export class UsersModel extends Modoo {

    public redis = new Redis();

    async updateUserInfo(request: any) {
        const id = request.partner_id;
        delete request.partner_id;
        const status = await this.odooUpdate('res.partner', parseInt(id), request);
        if (status === true) {
            const info = await this.odooSearchRead('res.partner',
                [['id', '=', parseInt(id)]],
                ['x_avatar', 'x_gender', 'email', 'phone', 'name', 'mobile', 'x_birthday', 'id'],
            );
            await this.redis.setRedis('INFO_USER_' + id, info);
        }
        return status;
    }

    async storeAddressUser(request: any) {
        const status = await this.odooCreate('x_address', request);
        return status;
    }

    async getUserInfo(id: any)  {
        const profile: any = {
            info: await this.getInfoUser(id),
            address: await this.getAddressUser(id),
        }
        return profile;
    }

    async getInfoUser(id: any) {
        const status = await this.redis.checkRedis('INFO_USER_' + id);
        if (status === 0) {
            const obj = await this.odooSearchRead(
                'res.partner',
                [['id', '=', parseInt(id)]],
                ['x_avatar', 'x_gender', 'email', 'phone', 'name', 'mobile', 'x_birthday', 'id']
            );
            await this.redis.setRedis('INFO_USER_' + id, obj[0]);
            return obj[0];
        } else {
            return await this.redis.getRedis('INFO_USER_' + id);
        }
    }

    async getAddressUser(id: any) {
        const status = await this.redis.checkRedis('ADDRESS_' + id);
        if (status === 1) {
            return await this.redis.getRedis('ADDRESS_' + id);
        } else {
            const address = await this.odooSearchRead('x_address', [['x_partner_id', '=', 9]], []);
            await this.redis.setRedis('ADDRESS_' + id, address);
            return address;
        }
    }
}
