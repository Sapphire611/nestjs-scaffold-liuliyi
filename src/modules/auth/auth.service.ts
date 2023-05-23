import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as crypto from 'crypto-js';
import { Model } from 'mongoose';
import { CreateUserDto, ResponseUserDto } from '../user/dto';
import { User, UserDocument } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { createRandomUserDTO } from './dto';

@Injectable()
export class AuthService {
  constructor( private userService: UserService, private jwtService: JwtService) {}

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

  /**
   * 生成随机n位后缀
   * @param n 后缀位数
   * @returns
   */
  randomNumberSuffix(n: number): number {
    return Math.floor(Math.random() * Math.pow(10, n));
  }

  /**
   * 生成随机用户,并返回其token
   * @returns
   */
  async createRandomUser(): Promise<createRandomUserDTO> {
    const createUserDto = new CreateUserDto();

    createUserDto.name = 'test' + this.randomNumberSuffix(4);
    createUserDto.displayName = createUserDto.name;
    createUserDto.age = 18;
    createUserDto.password = crypto.MD5('123456').toString();
    createUserDto.description = createUserDto.name;
    createUserDto.active = true;

    const user = await this.userService.create(createUserDto);
    const payload = { id: user._id, username: user.name };
    const token = await this.jwtService.signAsync(payload);

    const dto = new createRandomUserDTO();
    dto.name = user.name;
    dto.displayName = user.displayName ?? '';
    dto.age = user.age;
    dto.description = user.description;
    dto.active = user.active;
    dto.token = token;

    return dto;
  }
}
