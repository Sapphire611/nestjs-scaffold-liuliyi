import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Basic')
@Controller('/api')
export class AppController {
  @ApiOperation({
    summary: 'Test 4 Connection',
    description: '测试连通情况用，会返回 nestjs-scaffold-liuliyi is running~'
  })
  @Get()
  getHello(): string {
    return 'nestjs-scaffold-liuliyi is running~';
  }
}
