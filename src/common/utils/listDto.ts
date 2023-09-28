import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { ParseBoolean, ParseInt } from './transformer';

export class ListDto {
  @ApiProperty({ description: '分页页码', required: false, example: 1 })
  @ParseInt()
  @IsNumber()
  page?: number = 1;

  @ApiProperty({ description: '分页大小', required: false, example: 100 })
  @ParseInt()
  @IsNumber()
  size?: number = 100;

  @ApiProperty({ description: '排序字段', required: false, example: '-createdAt' })
  @IsString()
  sort?: string = 'createdAt';

  @ApiProperty({ description: '是否分页,false 拿全量', required: false, example: true })
  @ParseBoolean()
  @IsBoolean()
  pagination?: boolean = true;

  @ApiProperty({ description: '🔍关键字搜索(name)', required: false })
  keys?: string;
}
