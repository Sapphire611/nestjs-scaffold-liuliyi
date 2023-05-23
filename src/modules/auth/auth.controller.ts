import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { SignInDto } from './dto';
@ApiTags('Auth 鉴权相关')
@Controller('/api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: '用户名密码登陆',
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.getToken(signInDto.name, signInDto.password);
  }

  @ApiOperation({
    summary: '查看个人信息',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
