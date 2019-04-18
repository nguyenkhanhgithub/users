import {Connection} from 'typeorm';
import {UsersEntity} from '../../domain/entities/users.entity';
import {UsersRespository} from '../../domain/repositories/users.respository';

export const usersProvider = [
    // {
    //     provide: 'USERS_RESPOSITORY',
    //     useFactory: (connection: Connection) => connection.getCustomRepository(UsersRespository),
    //     inject: ['POSTGRES_DATABASE_CONNECTION'],
    // },
];
