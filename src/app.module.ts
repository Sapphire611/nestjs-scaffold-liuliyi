import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [TasksModule, MongooseModule.forRoot('mongodb://172.16.30.120:27017/nest-test')],
  controllers: [],
  providers: [],
})
export class AppModule {}
