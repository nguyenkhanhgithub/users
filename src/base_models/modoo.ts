import * as dotenv from 'dotenv';
dotenv.config();
import Odoo = require('odoo-xmlrpc');

class Modoo {

    public odoo = new Odoo({
        url: process.env.ODOO_URL,
        db: process.env.ODOO_DB,
        username: process.env.ODOO_USERNAME,
        password: process.env.ODOO_PASSWORD,
    });

    /**
     * Odoo read.
     *
     * @param {string}   model Table name
     * @param {any}      ids   [61,...]
     */
    odooRead = (model: string, ids: any, fileds: any = []) => {
        const self = this;
        return new Promise( ( resolve, reject ) => {
            self.odoo.connect( (error: any) => {
                if (error) {
                    reject(error);
                    return;
                }
                const params = [ [ ids, fileds ] ]

                self.odoo.execute_kw(model, 'read', params, (error: any, value: any) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve( value );
                });
            });
        });

    }

    /**
     * Odoo search and read.
     *
     * @param {string}   model    Table name
     * @param {array}    where    [["id","=","61"],...]
     * @param {array}    fields
     * @param {int}      Offset
     * @param {int}      Limit
     */
    odooSearchRead = (model: string, where: any, fields: any = [], offset: any = null, limit: any = null) => {
        const self = this;
        return new Promise( ( resolve, reject ) => {
            self.odoo.connect( (error: any) => {
                if (error) {
                    reject(error);
                    return;
                }
                const params: any = [ [
                    where, fields, offset, limit
                ] ];

                self.odoo.execute_kw(model, 'search_read', params, (error: any, value: any) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve( value );
                });
            });
        });
    }

    /**
     * Odoo Create.
     * @param {string}   model    Table name
     * @param {array}    data     The data
     * @param {function} function Cllback function.
     */

    odooCreate = (model: string, data: any) => {
        const self = this;
        return new Promise( ( resolve, reject ) => {
            self.odoo.connect( (error: any) => {
                if (error) {
                    reject(error);
                    return;
                }

                const params = [[data]];

                self.odoo.execute_kw( model, 'create', params, (error: any, value: any) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve( value );
                });
            });
        });
    }

    /**
     * Odoo Update
     * @param {string}   model    Table name
     * @param {object}    data     The data
     * @param {function} callback Cllback function.
     */
    odooUpdate = (model: string, id: number, data: any) => {
        const self = this;
        return new Promise( ( resolve, reject ) => {
            self.odoo.connect( (error: any) => {
                if (error) {
                    reject(error);
                    return;
                }

                const params: any = [ [
                    [id], data
                ] ];

                self.odoo.execute_kw(model, 'write', params,  (error: any, value: any) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve( value );
                });
            });
        });
    }

    /**
     * Odoo Delete
     * @param {string}   model    Table name
     * @param {array}    data     The data
     * @param {function} callback Cllback function.
     */
    odooDelete = (model: string, id: number) => {
        const self = this;
        return new Promise( ( resolve, reject ) => {
            self.odoo.connect( (error: any) => {
                if (error) {
                    reject(error);
                    return;
                }

                const params = [[[ id ]]];
                self.odoo.execute_kw(model, 'unlink', params, (error: any, value: any) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve( value );
                });
            });
        });
    }

    odooSearchCount = (model: string, condition: any) => {
        const self = this;
        return new Promise( ( resolve, reject ) => {
            self.odoo.connect( (error: any) => {
                if (error) {
                    reject(error);
                    return;
                }
                const params = [[condition]];
                self.odoo.execute_kw(model, 'search_count', params, (error: any, value: any) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve( value );
                });
            });
        });
    }
}

export default Modoo;
