import { Column, CreateDateColumn, Entity, ObjectId, ObjectIdColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Photo {
  @ObjectIdColumn({ comment: '主键id' })
  _id: ObjectId;

  @Column({ type: String, comment: '名称' })
  name: string;

  @Column({ type: String, comment: '描述' })
  description: string;

  @Column({ type: String, comment: '文件名' })
  filename: string;

  @Column({ type: Boolean, default: false, comment: '是否发布' })
  isPublished: boolean;

  @CreateDateColumn({ type: Date, default: Date.now(), comment: '创建时间戳' })
  createdAt: Date;

  @UpdateDateColumn({ type: Date, default: Date.now(), comment: '更新时间戳' })
  updatedAt: Date;
}
