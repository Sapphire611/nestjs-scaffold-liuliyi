import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsString } from 'class-validator';

export class ListDto {
  @ApiProperty({ description: '分页页码', required: false, example: 1 })
  // @Transform(value => Number(value))
  // @IsNumber()
  page?: number = 1;

  @ApiProperty({ description: '分页大小', required: false, example: 100 })
  // @Transform(value => Number(value))
  // @IsNumber()
  size?: number = 100;

  @ApiProperty({ description: '排序字段', required: false, example: '-createdAt' })
  @IsString()
  sort?: string = 'createdAt';

  @ApiProperty({ description: '是否分页,false 拿全量', required: false, example: true })
  @Transform(value => Boolean(value))
  @IsBoolean()
  pagination?: boolean = true;

  @ApiProperty({ description: '🔍关键字搜索(name)', required: false })
  keys?: string;
}

export const string2Boolean = (value: string | undefined): boolean | undefined => {
  return value === 'true' ? true : value === 'false' ? false : undefined;
};
