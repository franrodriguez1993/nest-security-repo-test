import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Reject request with data that is not in the DTO
      forbidNonWhitelisted: true,
      disableErrorMessages:
        process.env.ENVIRONMENT == 'production' ? true : false,
      transformOptions: {
        enableImplicitConversion: true, // Convertir Query params en numbers
      },
    }),
  );
  const PORT = process.env.PORT;
  // await app.listen(PORT, '127.0.0.1');

  const config = new DocumentBuilder()
  .setTitle('Notimation Dashboard')
  .setDescription('')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('docs', app, document);

  await app.listen(PORT);
}
bootstrap();
