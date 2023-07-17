import { Module } from '@nestjs/common';
import { mongoProviders } from './mongoose.providers';

@Module({
  providers: [...mongoProviders],
  exports: [...mongoProviders],
})
export class MongoModule {}
