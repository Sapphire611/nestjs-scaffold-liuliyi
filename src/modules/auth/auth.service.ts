import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ResponseUserDto } from '../user/dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async getToken(username: string, password: string): Promise<any> {
    const user: ResponseUserDto | null = await this.userService.findByNameAndPassword(username, password);

    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = { id: user._id, username: user.name };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
