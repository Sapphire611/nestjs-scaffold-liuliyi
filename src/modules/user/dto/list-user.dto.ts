import { ApiProperty } from '@nestjs/swagger';

export class listUserDto {
  @ApiProperty({ description: '分页页码', example: 1 })
  page: string;

  @ApiProperty({ description: '分页大小', example: 10 })
  size: string;

  @ApiProperty({ description: '🔍关键字搜索(name)', required: false })
  keys?: string;
}
