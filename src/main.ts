import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import {Logger, ValidationPipe} from '@nestjs/common';
async function bootstrap() {
  dotenv.config();
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
  Logger.log(`Server is running on port ${PORT}`);
}
bootstrap();
