import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '用户名', example: 'testName1' })
  @IsString()
  @Length(3, 10)
  name: string;

  @ApiProperty({ description: '年龄', example: 18 })
  age: boolean;

  @ApiProperty({ description: '说明', example: 'nothing~' })
  description?: string;

  // @ApiProperty()
  // active?: boolean;
}

export class ResponseUserDto extends CreateUserDto {
  _id: string;
}
