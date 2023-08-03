import { filterObject } from '@/common/utils';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { DeleteResult } from 'mongodb';
import { FilterQuery, PaginateModel, Schema } from 'mongoose';
import { CreateUserDto, ListUserDto, ResponseUserDto, UpdateUserDto } from './dto';
import { UserDocument } from './schemas/user.schema';
@Injectable()
export class UserService implements OnModuleInit {
  private readonly logger = new Logger(UserService.name);

  constructor(@Inject('UserModel') private readonly userModel: PaginateModel<UserDocument>) {}

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

  async findAll(query: ListUserDto) {
    // common filter Version
    const filter: FilterQuery<UserDocument> = filterObject({
      $or: query.keys ? [{ name: { $regex: new RegExp(query.keys, 'i') } }] : undefined,
    });

    // paginate from mongoose-paginate-v2
    return this.userModel.paginate(filter, {
      page: query.page ?? 1,
      perPage: query.size ?? 100,
      sort: query.sort ?? 'createdAt',
      pagination: query.pagination ?? true,
    });
  }

  async findOne(_id: Schema.Types.ObjectId): Promise<ResponseUserDto | null> {
    return this.userModel.findOne({ _id });
  }

  async update(_id: Schema.Types.ObjectId, updateUserDto: UpdateUserDto): Promise<any> {
    return this.userModel.updateOne({ _id }, updateUserDto);
  }

  async remove(_id: Schema.Types.ObjectId): Promise<DeleteResult> {
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
