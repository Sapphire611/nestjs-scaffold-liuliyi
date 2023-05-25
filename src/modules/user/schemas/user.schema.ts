import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, comment: '用户名(登陆用)', index: true })
  name: string;

  @Prop({ comment: '昵称(显示用)', index: true })
  displayName: string;

  @Prop({ required: true, comment: '来源', index: true, default: 'user', enum: ['user', 'admin'] })
  source: string;

  @Prop({ required: true, comment: '年龄' })
  age: number;

  @Prop({ required: true, comment: '密码(md5加密)', index: true })
  password: string;

  @Prop({ comment: '用户描述' })
  description: string;

  @Prop({ required: true, default: true, comment: '是否激活', index: true })
  active: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
