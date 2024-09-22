import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';
import metadata from './metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173',
  });

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/',
  });

  const config = new DocumentBuilder()
    .setTitle('Full Stack Demo API')
    .setDescription('The demo API description')
    .setVersion('1.0')
    .build();

  const options: SwaggerDocumentOptions = {
    // @NOTE: remove controller key from method names.
    // this is useful for code generation with rtk
    operationIdFactory: (_controllerKey, methodKey) => methodKey,
  };

  const customOptions: SwaggerCustomOptions = {
    jsonDocumentUrl: 'api/openapi.json',
  };

  await SwaggerModule.loadPluginMetadata(metadata);

  const document = SwaggerModule.createDocument(app, config, options);

  SwaggerModule.setup('api', app, document, customOptions);

  await app.listen(3000);
}
bootstrap();
