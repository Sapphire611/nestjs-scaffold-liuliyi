import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, Length } from 'class-validator';
import { Types } from 'mongoose';

export class CreatePhotoDto {
  @ApiProperty({ description: '用户名', example: 'test1' })
  @IsString()
  @Length(3, 10)
  name: string;

  @ApiProperty({ description: '说明', example: 'nothing~' })
  @IsString()
  description?: string;

  @ApiProperty({ description: '文件名', example: 'testName1.jpg' })
  @IsString()
  @Length(3, 30)
  fileName: string;

  @ApiProperty({ description: '是否有效', example: false })
  @IsBoolean()
  isPublished: boolean;

  @ApiProperty({ description: '创建时间', example: new Date() })
  createdAt: Date;

  @ApiProperty({ description: '更新时间', example: new Date() })
  updatedAt: Date;
}

export class ResponseUserDto extends CreatePhotoDto {
  _id: Types.ObjectId;
}
