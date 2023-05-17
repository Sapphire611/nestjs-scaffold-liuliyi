import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import config from '../config/local.config';
import { AppController } from './app.controller';
import { UserModule } from './modules/user/user.module';
@Module({
  imports: [UserModule, MongooseModule.forRoot(config.mongodbUrl)],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
