import { Module } from '@nestjs/common';
import { ShopController } from './app/controller/shop.controller';
import { ShopService } from './domain/services/shop.service';
import {ShopRepository} from './domain/repositories/shop.repository';

@Module({
  controllers: [ShopController],
  providers: [ShopService, ShopRepository]
})
export class ShopModule {}
