import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthModule } from "../auth/auth.module";
import { OrderItem } from "./order-item.entity";
import { Order } from "./order.entity";
import { OrderService } from "./order.service";
import { OrdersController } from "./orders.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem]),
    AuthModule
  ],
  controllers: [OrdersController],
  providers: [OrderService],
  exports: [OrderService]
})
export class OrdersModule {}