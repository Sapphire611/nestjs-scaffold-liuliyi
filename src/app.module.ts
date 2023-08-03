import { AppController } from '@/app.controller';
import { AuthModule, UserModule } from '@/modules';
import { MongoModule, RedisModule } from '@/providers';
import { Module } from '@nestjs/common';

@Module({
  imports: [UserModule, AuthModule, RedisModule, MongoModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
