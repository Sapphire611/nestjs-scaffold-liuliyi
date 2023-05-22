import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, comment: '用户名', index: true })
  name: string;

  @Prop({ required: true, comment: '年龄' })
  age: number;

  @Prop({ required: true, comment: '密码(md5加密)' })
  password: string;

  @Prop({ comment: '用户描述' })
  description: string;

  @Prop({ required: true, default: true, comment: '是否激活', index: true })
  active: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
