import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { initializeTransactionalContext, patchTypeORMRepositoryWithBaseRepository } from 'typeorm-transactional-cls-hooked'

import { AppModule } from './app.module';
import { GlobalErrorHandler } from './middlewares/global-error-handler.middleware';
import { LoggingMiddleware } from './middlewares/logging.middleware';

async function bootstrap() {
  initializeTransactionalContext()
  patchTypeORMRepositoryWithBaseRepository()
  
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({ origin: '*' })
  app.useGlobalFilters(new GlobalErrorHandler())
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new LoggingMiddleware())

  await app.listen(3000);
}
bootstrap();
