import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import {DbModule} from './users/infrastructure/db/db.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [UsersModule, AuthenticationModule],
})
export class AppModule {}
