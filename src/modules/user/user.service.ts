import { PaginateResult } from '@/common/interfaces';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Schema } from 'mongoose';
import { paginate } from 'nestjs-paginate-mongo';
import { listUserDto } from './dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userModel.create(createUserDto);
  }

  async findAll(query: listUserDto): Promise<PaginateResult<User>> { 
    // common filter Version
    const filter: FilterQuery<UserDocument> = {};
    if (query.keys) {
      filter.$and = [];
      let pattern = new RegExp(query.keys, 'i');
      filter.$and.push({
        $or: [{ name: { $regex: pattern } }, { code: { $regex: pattern } }, { remark: { $regex: pattern } }],
      });
    }

    // paginate from nestjs-paginate-mongo
    return paginate(this.userModel.find(filter), { page: query.page, perPage: query.size });

    // Aggregate Version
    // const oprs = [];
    // if (query.keys) {
    //   oprs.push({
    //     $match: {
    //       name: {
    //         $regex: query.keys,
    //         $options: 'i',
    //       },
    //     },
    //   });
    // }
    // return aggregatePaginate(this.userModel, oprs, { perPage: +query.size, page: +query.page });
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
