import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthController } from './app/controller/auth.controller';
import { AuthService } from './domain/services/auth.service';
import {AuthRepository} from './domain/repositories/auth.repository';

@Module({
    imports: [CqrsModule],
    controllers: [AuthController],
    providers: [
        AuthService,
        AuthRepository,
    ],
})
export class AuthenticationModule {}
