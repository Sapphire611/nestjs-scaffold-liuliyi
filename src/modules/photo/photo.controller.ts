import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { Photo } from './photo.entity';
import { PhotoService } from './photo.service';

@ApiTags('Photo 用户相关(TypeOrm)')
@Controller('/api/v1/photos')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @ApiOperation({
    summary: '获得照片列表',
  })
  @Get()
  findAll(): Promise<Photo[]> {
    return this.photoService.findAll();
  }

  @Post()
  @ApiOperation({
    summary: '添加一张照片',
  })
  create(@Body() createPhotoDto: CreatePhotoDto) {
    return this.photoService.create(createPhotoDto);
  }
}
