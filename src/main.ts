import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { GlobalErrorHandler } from './middlewares/global-error-handler.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({ origin: '*' })
  app.useGlobalFilters(new GlobalErrorHandler())
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(3000);
}
bootstrap();
