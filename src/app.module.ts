import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import TypeOrmConfig from './config/typeorm.config'

import { AuthModule } from './modules/auth/auth.module';
import { OrdersModule } from './modules/orders/orders.module';

import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => TypeOrmConfig.getConfig(configService),
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    OrdersModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
