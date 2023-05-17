import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async create(createUserDto: CreateUserDto) {
    return await this.userModel.create(createUserDto);
  }

  async findAll() {
    return await this.userModel.find({});
  }

  async findOne(_id: number) {
    return await this.userModel.findOne({ _id });
  }

  async update(_id: number, updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne({ _id }, updateUserDto);
  }

  async remove(_id: number) {
    return await this.userModel.deleteOne({ _id });
  }
}
