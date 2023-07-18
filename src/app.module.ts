import { AppController } from '@/app.controller';
import { AuthModule, UserModule } from '@/modules';
import { MongoModule, RedisModule, typeOrmModule } from '@/providers';
import { Module } from '@nestjs/common';

@Module({
  imports: [UserModule, AuthModule, RedisModule, MongoModule, typeOrmModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
