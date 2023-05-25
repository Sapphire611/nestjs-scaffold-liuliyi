import { Module } from '@nestjs/common';
import { mongoProviders } from './mongo.providers';

@Module({
  providers: [...mongoProviders],
  exports: [...mongoProviders],
})
export class MongoModule {}
