import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Photo } from './photo.entity';

@Injectable()
export class PhotoService {
  constructor(
    // @Inject('PHOTO_REPOSITORY')
    @InjectRepository(Photo)
    private readonly photoRepository: MongoRepository<Photo>
  ) {}

  async findAll(): Promise<Photo[]> {
    return this.photoRepository.find();
  }
}
