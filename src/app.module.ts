import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import config from './config/local.config'; // 单测需要使用，使用相对路径
import { UserModule } from './modules/user/user.module'; // 单测需要使用，使用相对路径

// mongodbUrl 测试环境和正式环境分离
const mongodbUrl = process.env.NODE_ENV === 'test' ? config.mongodbTestUrl : config.mongodbUrl;
@Module({
  imports: [UserModule, MongooseModule.forRoot(mongodbUrl)],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
