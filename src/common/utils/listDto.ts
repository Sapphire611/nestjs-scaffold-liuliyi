import { ApiProperty } from '@nestjs/swagger';

export class ListDto {
  @ApiProperty({ description: '分页页码', example: 1 })
  page?: number = 1;

  @ApiProperty({ description: '分页大小', example: 100 })
  size?: number = 100;

  @ApiProperty({ description: '排序字段', example: '-createdAt' })
  sort?: string = '-createdAt';

  @ApiProperty({ description: '是否分页,false 拿全量', example: true })
  pagination?: boolean = true;

  @ApiProperty({ description: '🔍关键字搜索(name)', required: false })
  keys?: string;
}
