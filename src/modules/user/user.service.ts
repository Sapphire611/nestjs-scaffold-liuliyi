import { PaginateResult } from '@/common/interfaces';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { FilterQuery, Model, Schema } from 'mongoose';
import { paginate } from 'nestjs-paginate-mongo';
import { CreateUserDto, ListUserDto, ResponseUserDto, UpdateUserDto } from './dto';
import { UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService implements OnModuleInit {
  private readonly logger = new Logger(UserService.name);

  constructor(@Inject('UserModel') private readonly userModel: Model<UserDocument>) {}

  async onModuleInit() {
    this.initAdmin();
  }

  async create(createUserDto: CreateUserDto) {
    if (!createUserDto.displayName) {
      createUserDto.displayName = createUserDto.name;
    }
    return await this.userModel.create(createUserDto);
    // const newUser = new this.userModel(createUserDto);
    // return await newUser.save();
  }

  async findAll(query: ListUserDto): Promise<PaginateResult<ResponseUserDto>> {
    // common filter Version
    const filter: FilterQuery<UserDocument> = {};
    if (query.keys) {
      const pattern = new RegExp(query.keys, 'i');
      filter.$or = [{ name: { $regex: pattern } }, { displayName: { $regex: pattern } }];
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

  async findOne(_id: Schema.Types.ObjectId): Promise<ResponseUserDto | null> {
    return this.userModel.findOne({ _id });
  }

  async update(_id: Schema.Types.ObjectId, updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne({ _id }, updateUserDto);
  }

  async remove(_id: Schema.Types.ObjectId) {
    return this.userModel.deleteOne({ _id });
  }

  async findByNameAndPassword(name: string, password: string): Promise<ResponseUserDto | null> {
    return this.userModel.findOne({ name, password });
  }

  async initAdmin() {
    const admin = await this.userModel.findOne({ source: 'admin' });

    if (!admin) {
      await this.userModel.create({
        name: 'admin',
        displayName: 'admin',
        source: 'admin',
        password: 'e10adc3949ba59abbe56e057f20f883e',
        age: '18',
        description: 'init admin user',
        active: true,
      });

      this.logger.debug('Init Admin ...');
    }
  }
}
