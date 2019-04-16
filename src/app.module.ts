import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import {DbModule} from './users/infrastructure/db/db.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [UsersModule, AuthenticationModule, CartModule],
  controllers: [],
})
export class AppModule {}
