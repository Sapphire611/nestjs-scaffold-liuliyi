import { AppController } from '@/app.controller';
import { AuthModule } from '@/common/auth/auth.module';
import { UserModule } from '@/modules/user/user.module';
import { MongoModule } from '@/providers/mongo/mongo.module';
import { RedisModule } from '@/providers/redis/redis.module';
import { Module } from '@nestjs/common';
import { ScheduleModule } from './providers/schedule/schedule.module';

@Module({
  imports: [UserModule, AuthModule, MongoModule, RedisModule, ScheduleModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
