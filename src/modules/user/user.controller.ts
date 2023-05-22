import { PaginateResult } from '@/common/interfaces';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Schema } from 'mongoose';
import { CreateUserDto, UpdateUserDto, listUserDto } from './dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('Users 用户相关 [@nestjs/mongoose]')
@Controller('/api/v1/users')
@ApiExtraModels(CreateUserDto, UpdateUserDto)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: '获得用户列表',
  })
  @Get()
  findAll(@Query() listUserDto: listUserDto): Promise<PaginateResult<User>> {
    return this.userService.findAll(listUserDto);
  }

  @ApiOperation({
    summary: '查询用户详情',
  })
  @ApiParam({
    name: 'id',
    description: '用户id',
    type: 'string',
  })
  @Get(':id')
  findOne(@Param('id') id: Schema.Types.ObjectId) {
    return this.userService.findOne(id);
  }

  @ApiOperation({
    summary: '创建用户',
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({
    summary: '修改用户',
    description: 'body中的参数均为可选项',
  })
  @ApiParam({
    name: 'id',
    description: '用户id',
    type: 'string',
  })
  @Patch('/:id')
  update(@Param('id') id: Schema.Types.ObjectId, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({
    summary: '删除用户',
  })
  @ApiParam({
    name: 'id',
    description: '用户id',
    type: 'string',
  })
  @Delete(':id')
  remove(@Param('id') id: Schema.Types.ObjectId) {
    return this.userService.remove(id);
  }
}
