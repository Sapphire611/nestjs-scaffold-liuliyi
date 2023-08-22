import { config, testConfig } from '@/config';
import { Logger, Module, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { RedisController } from './redis.controller';

const redisUrl = process.env.NODE_ENV !== 'test' ? config.redis : testConfig.redis;
const db = redisUrl.split('/')?.[3];
const [host, port] = redisUrl.split('/')?.[2].split(':');
@Module({
  providers: [
    {
      provide: 'REDIS_CONNECTION', // 自定义的 provider 标识符
      useFactory: () => {
        try {
          const redis = new Redis({
            host,
            port: Number(port),
            db: +db,
          });
          // Test the connection
          redis.on('error', error => {
            Logger.error(`Failed to connect to Redis: ${error.message}`);
            throw new Error(`Failed to connect to Redis: ${error.message}`);
          });

          return redis;
        } catch (error) {
          return null; // Return null in case of connection failure
        }
      },
    },
  ],
  controllers: [RedisController], // 将 RedisController 注册到 RedisModule 中
  exports: ['REDIS_CONNECTION'], // 将 Redis provider 导出，以便其他模块可以使用
})
export class RedisModule implements OnModuleInit {
  onModuleInit() {
    Logger.log(`redis is running on: ${config.redis}`);
  }
}
