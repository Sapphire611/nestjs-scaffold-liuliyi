import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggingInterceptor } from '@/common/interceptor/index';
@ApiTags('Basic')
@Controller('/')
export class AppController {
  @ApiOperation({
    summary: '测试连通性',
  })
  @UseInterceptors(LoggingInterceptor)
  @ApiOkResponse({
    status: 200,
    description: '成功响应的例子',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Hello, World!',
        },
      },
    },
  })
  @Get()
  getHello(): Object {
    console.debug({ message: 'Hello, World!' })
    return { message: 'Hello, World!' };
  }
}
