import './polyfills'; // 👈 Must be first, before anything else

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Serve static assets
  app.useStaticAssets(join(__dirname, '..', 'uploads', 'gallery'), {
    prefix: '/uploads/gallery/',
  });
  app.useStaticAssets(join(__dirname, '..', 'uploads', 'locations'), {
    prefix: '/uploads/locations/',
  });

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Trekking Tours API')
    .setDescription('API documentation for the Trekking Tours backend')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 App running on http://localhost:${port}`);
  console.log(`📚 Swagger docs:     http://localhost:${port}/api`);
  console.log(`🖼️  Gallery images:  http://localhost:${port}/uploads/gallery/...`);
  console.log(`🗺️  Location images: http://localhost:${port}/uploads/locations/...`);
}

bootstrap();
