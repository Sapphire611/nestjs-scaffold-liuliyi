import { AuthGuard } from '@/common/auth/auth.guard';
import { PaginateResult } from '@/common/interfaces';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Schema } from 'mongoose';
import { CreateUserDto, ListUserDto, ResponseUserDto, UpdateUserDto } from './dto';
import { UserService } from './user.service';

@ApiTags('Users 用户相关')
@Controller('/api/v1/users')
@ApiExtraModels(CreateUserDto, UpdateUserDto)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: '获得用户列表',
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get()
  findAll(@Query() listUserDto: ListUserDto): Promise<PaginateResult<ResponseUserDto>> {
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
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: Schema.Types.ObjectId) {
    return this.userService.findOne(id);
  }

  @ApiOperation({
    summary: '创建用户',
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
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
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
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
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: Schema.Types.ObjectId) {
    return this.userService.remove(id);
  }
}
