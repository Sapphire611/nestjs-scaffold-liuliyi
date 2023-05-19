import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, @InjectConnection() private readonly connection: any) {
    console.log('UserService constructor');
    console.log(connection);
    connection.on('close', () => {
      console.log('UserService connection close');
    });
    setTimeout(() => {
      connection.close();
    }, 2000);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userModel.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find({});
  }

  async findOne(_id: Schema.Types.ObjectId): Promise<User | null> {
    return this.userModel.findOne({ _id });
  }

  async update(_id: Schema.Types.ObjectId, updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne({ _id }, updateUserDto);
  }

  async remove(_id: Schema.Types.ObjectId) {
    return this.userModel.deleteOne({ _id });
  }
}
