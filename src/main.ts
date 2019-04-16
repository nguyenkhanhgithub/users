import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import {Logger, ValidationPipe} from '@nestjs/common';
import PassportService from './authentication/domain/passport/passport.service';

async function bootstrap() {
  dotenv.config();
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule);
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });
  const passport = new PassportService();
  app.useGlobalPipes(new ValidationPipe());
  app.use(passport.initialize());
  await app.listen(PORT);
  Logger.log(`Server is running on port ${PORT}`);
}
bootstrap();
