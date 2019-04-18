import { Module } from '@nestjs/common';
import { CartController } from './app/controller/cart.controller';
import { CartService } from './domain/services/cart.service';
import {CartRepository} from './domain/repositories/cart.repository';

@Module({
  controllers: [CartController],
  providers: [
      CartService,
      CartRepository,
  ],
})
export class CartModule {}
