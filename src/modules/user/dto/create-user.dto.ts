import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString, Length } from 'class-validator';
import { Types } from 'mongoose';

export class CreateUserDto {
  @ApiProperty({ description: '用户名', example: 'test1' })
  @IsString()
  @Length(3, 10)
  name: string;

  @ApiProperty({ description: '用户名', example: 'testName1' })
  @IsString()
  @Length(3, 10)
  displayName: string;

  @ApiProperty({ description: '年龄', example: 18 })
  @IsNumber()
  age: number;

  @ApiProperty({ description: '密码(md5加密)', example: 'e10adc3949ba59abbe56e057f20f883e' })
  @IsString()
  password: string;

  @ApiProperty({ description: '说明', example: 'nothing~' })
  @IsString()
  description?: string;

  @ApiProperty({ description: '是否有效', example: false })
  @IsBoolean()
  active?: boolean;
}

export class ResponseUserDto extends CreateUserDto {
  _id: Types.ObjectId;
}
