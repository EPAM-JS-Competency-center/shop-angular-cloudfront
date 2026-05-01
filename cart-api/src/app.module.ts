import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthModule, CartModule, OrderModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
