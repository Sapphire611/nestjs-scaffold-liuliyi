import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
// 单测需要使用的模块/配置，必须使用相对路径
import { AuthModule } from './common/auth/auth.module';
import config from './config/local.config';
import { UserModule } from './modules/user/user.module';

// mongodbUrl 测试环境和正式环境分离
const mongodbUrl = process.env.NODE_ENV === 'test' ? config.mongodbTestUrl : config.mongodbUrl;
@Module({
  imports: [UserModule, AuthModule, MongooseModule.forRoot(mongodbUrl)],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
