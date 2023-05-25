import config from '@/config/local.config';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { description, name, version } from '../package.json';
import { AppModule } from './app.module';
class Bootstrap {
  app: INestApplication;
  port: number;

  constructor() {
    this.init();
    this.port = config.port || 3000;
  }

  async init() {
    this.app = await NestFactory.create(AppModule);
    await this.bootstrap(this.app);
  }

  async bootstrap(app: INestApplication) {
    app.useGlobalPipes(new ValidationPipe()); // 全局验证管道
    app.enableCors(); // 允许跨域

    this.enableSwagger(app); // 启用swagger

    await app.listen(this.port);
    Logger.debug(`${name}-${version} is running on: http://127.0.0.1:${this.port}`);
    Logger.debug(`swagger is running on: http://127.0.0.1:${this.port}/${config.swaggerSuffix}`);

    this.checkMongo(app); // mongodb 连接成功后 , 输出 url
    this.checkRedis(app); // redis 连接成功后 , 输出 url
  }

  checkRedis(app: INestApplication) {
    const redisInstance = app.get('REDIS_CLIENT');
    Logger.debug(`redis is running on: ${redisInstance.config.url}`);
  }

  checkMongo(app: INestApplication) {
    const mongoInstance = app.get('MONGO_CONNECTION');
    Logger.debug(`mongodb is running on: ${mongoInstance.connection._connectionString}`);
  }

  enableSwagger(app: INestApplication) {
    const swaggerOptions = new DocumentBuilder().setTitle(name).setVersion(version).setDescription(description).addBearerAuth().build();

    const document = SwaggerModule.createDocument(app, swaggerOptions, {
      ignoreGlobalPrefix: false,
    });
    SwaggerModule.setup(config.swaggerSuffix, app, document);
  }
}

new Bootstrap();
