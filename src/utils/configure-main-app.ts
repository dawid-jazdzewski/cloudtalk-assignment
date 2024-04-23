import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { ConfigService } from '@/config/config.service';

import { TypeORMExceptionFilter } from './exception-filters';
import { validationOptions } from './validation-options';

export const configureMainApp = (app: INestApplication): void => {
  const configService = app.get(ConfigService);
  app.setGlobalPrefix(configService.app.apiPrefix);

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  app.useGlobalFilters(new TypeORMExceptionFilter());

  app.enableVersioning({
    type: VersioningType.URI,
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle(configService.app.name)
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);
};
