import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, Length } from 'class-validator';
import { Types } from 'mongoose';

export class CreatePhotoDto {
  @ApiProperty({ description: '用户名', example: '小白猫' })
  @IsString()
  @Length(2, 10)
  name: string;

  @ApiProperty({ description: '说明', example: '诶嘿嘿嘿' })
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Url (http)',
    example: 'https://th.bing.com/th/id/OIP.iY9EwHM8msHe9Km6GdzAFgHaHa?pid=ImgDet&rs=1',
  })
  @IsString()
  @Length(10, 500)
  fileUrl: string;

  @ApiProperty({ description: '照片类别', example: '宠物' })
  @IsString()
  category: string;

  // @ApiProperty({ description: '说明', example: 'success' })
  // @IsString()
  // status: string;

  @ApiProperty({ description: '是否有效', example: false })
  @IsBoolean()
  isPublished?: boolean;

  @ApiProperty({ description: '创建时间', example: new Date() })
  createdAt: Date;

  @ApiProperty({ description: '更新时间', example: new Date() })
  updatedAt: Date;
}

export class ResponsePhotoDto extends CreatePhotoDto {
  _id: Types.ObjectId;
}
