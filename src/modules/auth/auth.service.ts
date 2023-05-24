import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto-js';
import { Types } from 'mongoose';
import { CreateUserDto, ResponseUserDto } from '../user/dto';
import { UserService } from '../user/user.service';
import { createRandomUserDTO } from './dto';

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
    const createUserDto: CreateUserDto = {
      name: 'test' + this.randomNumberSuffix(4),
      displayName: 'test',
      age: 18,
      password: crypto.MD5('123456').toString(),
      description: 'test',
      active: true,
    };

    const user = await this.userService.create(createUserDto);
    const userId: Types.ObjectId = user._id;

    const payload = { id: userId, username: user.name };
    const token = await this.jwtService.signAsync(payload);

    const userResult: createRandomUserDTO = {
      _id: userId,
      name: user.name,
      displayName: createUserDto.name,
      password: createUserDto.password,
      age: user.age,
      description: user.description,
      active: user.active,
      token: token,
    };

    return userResult;
  }
}
