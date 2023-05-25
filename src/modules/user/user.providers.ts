import { Mongoose } from 'mongoose';
import { UserSchema } from './schemas/user.schema';

export const userProviders = [
  {
    provide: 'UserModel',
    useFactory: (mongoose: Mongoose) => mongoose.model('User', UserSchema, 'users'),
    inject: ['MONGO_CONNECTION'],
  },
];
