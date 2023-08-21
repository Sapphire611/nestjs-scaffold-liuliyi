import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ListPhotoDto } from './dto';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { PhotoService } from './photo.service';

@ApiTags('Photo 用户相关(TypeOrm)')
@Controller('/api/v1/photos')
@ApiExtraModels(CreatePhotoDto, UpdatePhotoDto)
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @ApiOperation({
    summary: '获得照片列表',
  })
  @Get()
  findAll(@Query() listPhotoDto: ListPhotoDto) {
    return this.photoService.findAll(listPhotoDto);
  }

  @Post()
  @ApiOperation({
    summary: '添加一张照片',
  })
  create(@Body() createPhotoDto: CreatePhotoDto) {
    return this.photoService.create(createPhotoDto);
  }

  @ApiOperation({
    summary: '查询照片详情',
  })
  @ApiParam({
    name: 'id',
    description: '照片id',
    type: 'string',
  })
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.photoService.detail(id);
  }

  @ApiOperation({
    summary: '修改照片信息',
    description: 'body中的参数均为可选项',
  })
  @ApiParam({
    name: 'id',
    description: '照片id',
    type: 'string',
  })
  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdatePhotoDto) {
    return this.photoService.update(id, updateUserDto);
  }

  @ApiOperation({
    summary: '删除照片',
  })
  @ApiParam({
    name: 'id',
    description: '用户id',
    type: 'string',
  })
  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.photoService.delete(id);
  }
}
