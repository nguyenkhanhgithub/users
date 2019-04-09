import { createConnection } from 'typeorm';
import {UsersEntity} from '../../domain/entities/users.entity';
import 'reflect-metadata';

export const postgresProvider = {
    provide: 'POSTGRES_DATABASE_CONNECTION',
    useFactory: async () => await createConnection({
        type: 'postgres',
        name: 'postgresConnection',
        host: 'localhost',
        port: 5432,
        username: 'openpg',
        password: 'openpgpwd',
        database: 'Chozoi',
        entities: [
            UsersEntity,
        ],
        synchronize: true,
        logging: true,
    }),
};
