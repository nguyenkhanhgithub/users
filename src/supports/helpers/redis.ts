import * as redis from 'redis';
import { Logger } from '@nestjs/common';

export class Redis {
    private client: any;
    private prefix = 'MIDAS_REDIS_';
    constructor() {
        this.client = redis.createClient();
        this.client.on('error', (error: any) => {
            Logger.log('Error: ' + error);
        });
    }

    getRedis = (key: any) => {
        return new Promise( ( resolve, reject ) => {
            this.client.get(this.prefix + key, (error: any, value: any) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(JSON.parse(value));
            });
        });
    }

    setRedis = (key: any, object: any, exprire: any) => {
        this.client.set(this.prefix + key, JSON.stringify(object), 'EX', exprire, redis.print);
    }

     checkRedis = (key: any) => {
        return new Promise( ( resolve, reject ) => {
            this.client.exists(this.prefix + key, (error: any, value: boolean) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(value);
            });
        });
    }

    delRedis = (key: any) => {
        return new Promise((resolve, reject) => {
           this.client.del(`${this.prefix}${key}` , (error: any, value: any) => {
               if (error) {
                   reject(error);
                   return;
               }
               resolve(value);
           });
        });
    }
}
