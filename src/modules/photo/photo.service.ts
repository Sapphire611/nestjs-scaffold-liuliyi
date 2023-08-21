import { Paging, getOrder, string2Boolean } from '@/common/utils';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { MongoRepository } from 'typeorm';
import { CreatePhotoDto, ListPhotoDto, UpdatePhotoDto } from './dto';
import { Photo } from './photo.entity';

@Injectable()
export class PhotoService {
  @InjectRepository(Photo)
  private readonly photoRepository: MongoRepository<Photo>;

  async findAll(query: ListPhotoDto) {
    const page = query.page ?? 1;
    const size = query.size ?? 100;

    // FindOptionsWhere<T>
    const filter: any = {
      isPublished: string2Boolean(query.isPublished),
    };

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

  async create(createPhotoDto: CreatePhotoDto) {
    return this.photoRepository.save(createPhotoDto);
  }

  async detail(_id: string) {
    const filter = { _id: new ObjectId(_id) };
    return this.photoRepository.findOneBy(filter);
  }

  async update(_id: string, updateUserDto: UpdatePhotoDto) {
    const filter = { _id: new ObjectId(_id) };
    return this.photoRepository.updateOne(filter, { $set: updateUserDto });
  }

  async delete(_id: string) {
    const filter = { _id: new ObjectId(_id) };
    return this.photoRepository.deleteOne(filter);
  }
}
