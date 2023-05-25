import { Module } from '@nestjs/common';
import { databaseProviders } from './mongo.providers';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class MongoModule {}
