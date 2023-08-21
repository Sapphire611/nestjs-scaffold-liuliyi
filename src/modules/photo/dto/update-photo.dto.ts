import { PartialType } from '@nestjs/swagger';
import { CreatePhotoDto } from './create-photo.dto';

// 使用PartialType，可以方便地创建一个新的部分类型
// 该类型继承自现有类型，但所有属性都变为可选的
export class UpdatePhotoDto extends PartialType(CreatePhotoDto) {}
