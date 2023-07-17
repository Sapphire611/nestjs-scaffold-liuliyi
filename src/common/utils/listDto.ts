import { ApiProperty } from '@nestjs/swagger';

export class ListDto {
  @ApiProperty({ description: '分页页码', example: 1 })
  page?: number;

  @ApiProperty({ description: '分页大小', example: 10 })
  size?: number;

  @ApiProperty({ description: '排序字段', example: '-createdAt' })
  sort?: string;

  @ApiProperty({ description: '是否分页,false 拿全量', example: true })
  pagination?: boolean;

  @ApiProperty({ description: '🔍关键字搜索(name)', required: false })
  keys?: string;
}
