import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Product API')
    .setDescription('This is an API for a property rental and letting system.')
    .setVersion('1.0')
    .addTag('Real-estate')
    .addBearerAuth(
      {  type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app
    .useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(4000);
}

bootstrap();
