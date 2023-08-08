import { config } from '@/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { description, name, version } from '../package.json';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe()); // 全局验证管道
  app.enableCors(); // 允许跨域

  // 启动 Swagger
  const swaggerOptions = new DocumentBuilder().setTitle(name).setVersion(version).setDescription(description).addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, swaggerOptions, {
    ignoreGlobalPrefix: false,
  });
  SwaggerModule.setup(config.swaggerSuffix, app, document);

  // 开始监听端口
  await app.listen(config.port);
  Logger.debug(`${name}-${version} is running on: http://127.0.0.1:${config.port}`);
  Logger.debug(`swagger is running on: http://127.0.0.1:${config.port}/${config.swaggerSuffix}`);
  // mongoose
  const mongooseInstance = app.get('MONGO_CONNECTION');
  Logger.debug(`mongoose is running on: ${mongooseInstance.connection._connectionString}`);

  // redis
  const redisInstance = app.get('REDIS_CONNECTION');
  Logger.debug(`redis is running on: http://${redisInstance.options.host}:${redisInstance.options.port}/${redisInstance.options.db}`);
}

bootstrap();
