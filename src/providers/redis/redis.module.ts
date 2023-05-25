import { RedisModule as redisModule } from '@nestjs-modules/ioredis';
import { Module } from '@nestjs/common';
import { redisProviders } from './redis.providers';

@Module({
  imports: [redisModule],
  providers: [...redisProviders],
  exports: [...redisProviders],
})
export class RedisModule {}
