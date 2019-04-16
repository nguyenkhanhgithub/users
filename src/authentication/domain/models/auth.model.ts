import Modoo from '../../../base_models/modoo';
import valid from '../../../helpers/validate';
import * as bcrypt from 'bcrypt';

export class AuthModel {
    public odoo = new Modoo();

    async checkUser(username: any) {
        const condition = (valid.regexPhoneNumber(username) === true) ? [['phone' , '=', username]] : [['email', '=', username]];
        const status = await this.odoo.odooSearchCount('res.partner', condition);
        return status;
    }

    async loginLocal(request: any) {
        const condition = (valid.regexPhoneNumber(request.username) === true) ? ['phone' , '=', request.username] : ['email', '=', request.username];
        const obj = await this.odoo.odooSearchRead(
            'res.users',
            [condition],
            ['id', 'name', 'email', 'phone', 'x_password', 'seller', 'x_vertify', 'x_state', 'partner_id']
        );
        return obj;
    }

    async validateUserByEmail(request: any) {
        const obj = await this.loginLocal(request);
        if (Object.entries(obj).length > 0) {
            delete obj[0].x_password;
            obj[0].status = 1;
        }
        return obj;
    }

    async storeUser(requests: any) {
        const facebook = (typeof requests.x_provider !== 'undefined' && requests.x_provider === 'facebook') ? requests.x_provider : false;
        const facebook_id = (typeof requests.x_provider_id !== 'undefined' && requests.x_provider === 'facebook') ? requests.x_provider_id : false;
        const gmail = (typeof requests.x_provider !== 'undefined' && requests.x_provider === 'gmail') ? requests.x_provider : false;
        const gmail_id = (typeof requests.x_provider !== 'undefined' && requests.x_provider === 'gmail') ? requests.x_provider : false;
        const data: any = {
            name: requests.username,
            seller: false,
            x_state: 'new',
            x_facebook: facebook,
            x_facebook_id: facebook_id,
            x_gmail: gmail,
            x_gmail_id: gmail_id,
            login: requests.username,
            sel_group_49_50_51_52: 49,
            in_group_39: true,
            in_group_40: true,
            in_group_10: true,
            x_vertify: 'active',
            password: (typeof requests.x_provider === 'undefined' && typeof requests.password !== 'undefined') ? requests.password : 'default123',
            x_password: (typeof requests.x_provider === 'undefined' && typeof requests.password !== 'undefined')
                ? bcrypt.hashSync(requests.password, 10) : false,
        };
        if (valid.regexPhoneNumber(requests.username) !== true) {
            data.email = requests.username;
        } else {
            data.phone = requests.username;
        }

        const status = await this.odoo.odooCreate('res.users', data);
        if (status !== 0) {
            if (typeof requests.provider !== 'undefined') {
                const obj = this.validateUserByEmail(requests);
                return obj;
            } else {
                return status;
            }
        } else {
            return false;
        }
    }
}
