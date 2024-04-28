import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/loggers.middleware';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {config as dotenvConfig } from 'dotenv';

dotenvConfig({path: '.development.env'});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
  .setTitle('E-commerce Back')
  .setDescription('API para el manejo de un e-commerce',)
  .setVersion('1.0')
  .addBearerAuth()
  .build()
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.use(loggerGlobal)
  await app.listen(parseInt(process.env.DB_PORT));
}
bootstrap();
