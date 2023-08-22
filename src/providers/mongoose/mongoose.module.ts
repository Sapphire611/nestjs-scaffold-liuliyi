import { config } from '@/config';
import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { mongoProviders } from './mongoose.providers';

@Module({
  providers: [...mongoProviders],
  exports: [...mongoProviders],
})

export class MongoModule implements OnModuleInit {
  onModuleInit() {
    // mongoose
    Logger.log(`mongoose is running on: ${config.mongodb}`);
  }
}
