import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { Schema } from 'mongoose';

export class CreateUserDto {
  @ApiProperty({ description: '用户名', example: 'testName1' })
  @IsString()
  @Length(3, 10)
  name: string;

  @ApiProperty({ description: '年龄', example: 18 })
  age: number;

  @ApiProperty({ description: '密码(md5加密)', example: 'e10adc3949ba59abbe56e057f20f883e' })
  password: string;

  @ApiProperty({ description: '说明', example: 'nothing~' })
  description?: string;

  // @ApiProperty()
  // active?: boolean;
}

export class ResponseUserDto extends CreateUserDto {
  _id: Schema.Types.ObjectId;
}
