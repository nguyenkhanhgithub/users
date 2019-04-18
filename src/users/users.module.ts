import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {UsersController} from './app/controllers/users.controller';
import {UsersService} from './domain/services/users.service';
import {UsersRespository} from './domain/repositories/users.respository';
import {usersProvider} from './infrastructure/providers/users.provider';

@Module({
    imports: [CqrsModule],
    controllers: [UsersController],
    providers: [
        UsersService,
        UsersRespository,
        ...usersProvider,
    ],
})
export class UsersModule {}
