import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Basic')
@Controller('/')
export class AppController {
  @ApiOperation({
    summary: '测试连通性',
  })
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
    return { message: 'Hello, World!' };
  }
}
