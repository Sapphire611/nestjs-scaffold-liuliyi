import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Basic')
@Controller('/api')
export class AppController {
  public helloMessage: string;

  constructor() {
    this.helloMessage = 'Hello!'
  }

  @ApiOperation({
    summary: '测试连通性',
  })
  @Get()
  getHello(): string {
    return this.helloMessage;
  }
}
