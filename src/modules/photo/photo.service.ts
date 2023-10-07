import { Paging, getOrder } from '@/common/utils';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { MongoRepository } from 'typeorm';
import { CreatePhotoDto, ListPhotoDto, UpdatePhotoDto } from './dto';
import { Photo } from './photo.entity';

@Injectable()
export class PhotoService {
  @InjectRepository(Photo)
  private readonly photoRepository: MongoRepository<Photo>;

  /**
   * 查询照片列表
   * @param query
   * @returns
   */
  async list(query: ListPhotoDto) {
    Logger.debug(JSON.stringify(query));
    const page = query.page ?? 1;
    const size = query.size ?? 100;

    // FindOptionsWhere<T>

    const filter: any = {};

    if (query.isPublished) {
      filter.isPublished = query.isPublished;
    }

    // createdAt:
    if (query.beginAt || query.endAt) {
      const createdAtJSON: any = {};
      if (query.beginAt) createdAtJSON.$gte = new Date(query.beginAt);
      if (query.endAt) createdAtJSON.$lte = new Date(query.endAt);

      filter.createdAt = createdAtJSON;
    }

    if (query.keys) {
      filter.$or = [
        { name: { $regex: query.keys || '', $options: 'i' } },
        { description: { $regex: query.keys || '', $options: 'i' } },
      ];
    }

    const [photos, count] = await this.photoRepository.findAndCount({
      where: filter,
      order: getOrder(query.sort),
      take: size,
      skip: (page - 1) * size,
    });

    return new Paging({ docs: photos, total: count, page, size });
  }

  /**
   * 创建一张照片
   * @param createPhotoDto
   * @returns 创建好的Photo信息
   */
  async create(createPhotoDto: CreatePhotoDto) {
    return this.photoRepository.save({ ...createPhotoDto, isPublished: false, status: 'auditing' });
  }

  /**
   * 获得一张照片的详细信息
   * @param _id ObjectId
   * @returns photo 信息
   */
  async detail(_id: string) {
    const filter = { _id: new ObjectId(_id) };
    return this.photoRepository.findOneBy(filter);
  }

  /**
   * 更新一张照片信息
   * @param _id ObjectId
   * @param updateUserDto 要更新的内容
   * @returns 更新后的Mongo结果
   */
  async update(_id: string, updateUserDto: UpdatePhotoDto) {
    const filter = { _id: new ObjectId(_id) };
    return this.photoRepository.updateOne(filter, { $set: updateUserDto });
  }

  /**
   * 删除一个照片
   * @param _id ObjectId
   * @returns 删除后的Mongo结果
   */
  async delete(_id: string) {
    const filter = { _id: new ObjectId(_id) };
    return this.photoRepository.deleteOne(filter);
  }

  /**
   * 获得照片列表
   * @returns 返回Photo的所有Category
   */
  async getCategories() {
    return Array.from(new Set((await this.photoRepository.find()).map(each => each.category)));
  }
}
