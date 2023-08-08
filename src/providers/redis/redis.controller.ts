import { Controller, Get, Inject } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import Redis from 'ioredis';

@ApiTags('Basic')
@Controller('/redis')
export class RedisController {
  constructor(@Inject('REDIS_CONNECTION') private readonly redisClient: Redis){}
  @ApiOperation({
    summary: '测试redis',
  })
  @Get()
  getHello(): any {
    return this.redisClient.ping();
  }
}
