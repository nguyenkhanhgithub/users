import Modoo from '../../../base_models/modoo';
import {Redis} from '../../../helpers/redis';

export class UsersModel extends Modoo {

    public redis = new Redis();

    async updateUserInfo(request: any) {
        const id = request.partner_id;
        delete request.partner_id;
        const status = await this.odooUpdate('res.partner', parseInt(id), request);
        return status;
    }

    async storeAddressUser(request: any) {
        if (typeof request.x_default_address_id !== 'undefined' && request.x_default_address ===  1) {
            await this.odooUpdate('x_address', parseInt(request.x_default_address_id), { x_default_address: 0 });
        }
        const status = await this.odooCreate('x_address', request);
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
        return status;
    }

    async deleteAddressUser(request: any) {
        const status = await this.odooDelete('x_address', parseInt(request.id));
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
        const obj = await this.odooSearchRead(
            'res.partner',
            [['id', '=', parseInt(id)]],
            ['x_avatar', 'x_gender', 'email', 'phone', 'name', 'mobile', 'x_birthday', 'id']
        );
        return obj[0];
    }

    async getAddressUser(id: any) {
        const address = await this.odooSearchRead('x_address', [['x_partner_id', '=', parseInt(id)]], []);
        return address;
    }
}
