import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    age: number;

    @Prop()
    description: string;

    @Prop({ default: true })
    active: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
