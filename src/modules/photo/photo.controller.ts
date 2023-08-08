import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
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
}
