import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { description, name, version } from '../package.json';
import { AppModule } from './app.module';
import config from './config/local.config';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe()); // 全局验证管道
  app.enableCors(); // 允许跨域

  enableSwagger(app); // 启用swagger

  await app.listen(config.port || 3000);
  Logger.debug(`${name}-${version} is running on: http://127.0.0.1:${config.port}`);
  Logger.debug(`swagger is running on: http://127.0.0.1:${config.port}/${config.swaggerSuffix}`);
}

bootstrap().then(() => {
  Logger.debug('bootstrap success');
}).catch((err) => {
  Logger.error(err);
});

const enableSwagger = async (app: INestApplication) => {
  const swaggerOptions = new DocumentBuilder()
    .setTitle(name)
    .setVersion(version)
    .setDescription(description)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions, {
    ignoreGlobalPrefix: false,
  });
  SwaggerModule.setup(config.swaggerSuffix, app, document);
}


