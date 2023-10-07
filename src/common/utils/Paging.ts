import { ApiProperty } from '@nestjs/swagger';

// 分页返回的对象格式
export class Paging<T> {
  constructor(props: { docs: T[]; total: number; page: number; size: number }) {
    this.docs = props.docs;
    this.total = props.total;
    this.page = props.page;
    this.size = props.size;
  }

  @ApiProperty({ description: '当前页数据', example: [] })
  docs: T[];

  @ApiProperty({ description: '分页总数', example: 100 })
  total: number;

  @ApiProperty({ description: '分页页码', example: 1 })
  page?: number = 1;

  @ApiProperty({ description: '分页大小', example: 100 })
  size?: number = 100;
}

//
export const getOrder = (sort?: string): Object => {
  if (!sort) {
    return {
      createdAt: 'DESC',
    };
  }

  if (sort.startsWith('-')) {
    return {
      [sort.substring(1)]: 'DESC',
    };
  } else {
    return {
      [sort]: 'ASC',
    };
  }
};
