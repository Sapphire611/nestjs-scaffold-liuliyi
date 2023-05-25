import { Mongoose } from 'mongoose';
import { UserSchema } from '@/modules/user/schemas/user.schema';

export const userProviders = [
  {
    provide: 'UserModel',
    useFactory: (mongoose: Mongoose) => mongoose.model('User', UserSchema, 'users'),
    inject: ['MONGO_CONNECTION'],
  },
];
