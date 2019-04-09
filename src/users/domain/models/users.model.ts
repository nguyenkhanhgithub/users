import Modoo from '../../../base_models/modoo';
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
        if (typeof request.x_default_address_id !== 'undefined' && request.x_default_address ===  1) {
            await this.odooUpdate('x_address', parseInt(request.x_default_address_id), { x_default_address: 0 });
        }
        const status = await this.odooCreate('x_address', request);
        if (status > 0) {
            const address = await this.odooSearchRead('x_address', [['x_partner_id', '=', parseInt(request.x_partner_id)]], []);
            await this.redis.setRedis('ADDRESS_' + request.x_partner_id, address);
        }
        return status;
    }

    async updateAddressUser(request: any) {
        if (typeof request.x_default_address_id !== 'undefined' && request.x_default_address ===  1) {
            if (request.x_default_address_id !== request.id) {
                await this.odooUpdate('x_address', parseInt(request.x_default_address_id), { x_default_address: 0 });
            }
        }
        if (typeof request.x_default_address_id !== 'undefined' && request.x_default_address !== 'undefined') {
            if (request.x_default_address_id === request.address_id) {
                request.x_default_address = 1;
            }
        }
        const status = await this.odooUpdate('x_address', parseInt(request.address_id), request);
        if (status === true) {
            const address = await this.odooSearchRead('x_address', [['x_partner_id', '=', parseInt(request.x_partner_id)]], []);
            await this.redis.setRedis('ADDRESS_' + request.x_partner_id, address);
        }
        return status;
    }

    async deleteAddressUser(request: any) {
        const status = await this.odooDelete('x_address', parseInt(request.id));
        if (status === true) {
            const address = await this.odooSearchRead('x_address', [['x_partner_id', '=', parseInt(request.x_partner_id)]], []);
            await this.redis.setRedis('ADDRESS_' + request.x_partner_id, address);
        }
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
            const address = await this.odooSearchRead('x_address', [['x_partner_id', '=', parseInt(id)]], []);
            await this.redis.setRedis('ADDRESS_' + id, address);
            return address;
        }
    }
}
