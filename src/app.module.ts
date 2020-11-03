import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './modules/auth/auth.module';
import { AppController } from './app.controller';
import { Auth } from './modules/auth/auth.entity';
import { OrderItem } from './modules/orders/order-item.entity';
import { Order } from './modules/orders/order.entity';
import { OrdersModule } from './modules/orders/orders.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'template_node_nest',
      entities: [
        Auth,
        Order,
        OrderItem
      ],
      synchronize: true,
      logging: ['query']
    }),
    AuthModule,
    OrdersModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
