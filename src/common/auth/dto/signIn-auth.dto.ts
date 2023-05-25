import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({ description: '用户名', example: 'admin' })
  @IsString()
  name: string;

  @ApiProperty({ description: '密码(md5)', example: 'e10adc3949ba59abbe56e057f20f883e' })
  @IsString()
  password: string;
}
