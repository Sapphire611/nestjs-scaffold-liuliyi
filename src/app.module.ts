import { AppController } from '@/app.controller';
import { AuthModule, UserModule } from '@/modules';
import { MongoModule, RedisModule } from '@/providers';
import { Module } from '@nestjs/common';

@Module({
  imports: [UserModule, AuthModule, MongoModule, RedisModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
