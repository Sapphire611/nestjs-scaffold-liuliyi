import { ListDto } from '@/common/utils';
import { ParseBoolean } from '@/common/utils';
import { ApiProperty } from '@nestjs/swagger';

export class ListPhotoDto extends ListDto {
  @ApiProperty({ description: '开始时间戳(基于createdAt)', required: false, example: new Date('2022-08-22T14:30:00') })
  beginAt?: Date;

  @ApiProperty({ description: '结束时间戳(基于createdAt)', required: false, example: new Date('2024-08-22T14:30:00') })
  endAt?: Date;

  @ApiProperty({ description: '是否发布', required: false, example: false })
  @ParseBoolean()
  isPublished?: string;

  @ApiProperty({ description: '类别', required: false, example: false })
  @ParseBoolean()
  category?: string;

  @ApiProperty({ description: '照片状态', required: false, example: false })
  status?: string;
}
