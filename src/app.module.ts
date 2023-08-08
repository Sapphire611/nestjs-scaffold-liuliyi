import { AppController } from '@/app.controller';
import { AuthModule, FileModule, PhotoModule, UserModule } from '@/modules';
import { MongoModule, RedisModule, TypeOrmCustomModule } from '@/providers';
import { Module } from '@nestjs/common';

@Module({
  imports: [UserModule, AuthModule, RedisModule, PhotoModule, TypeOrmCustomModule, MongoModule, FileModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
