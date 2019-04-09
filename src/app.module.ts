import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import {DbModule} from './users/infrastructure/db/db.module';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [DbModule, UsersModule],
})
export class AppModule {}
