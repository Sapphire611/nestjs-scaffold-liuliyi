import { config, testConfig } from '@/config';
import { Provider } from '@nestjs/common';
import mongoose from 'mongoose';

const mongodbUrl = process.env.NODE_ENV !== 'test' ? config.mongodb : testConfig.mongodb;
mongoose.set('strictQuery', false); // the 'strictQuery' option will be switched back to 'false' by default in Mongoose 7.

export const mongoProviders: Provider[] = [
  {
    provide: 'MONGO_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> => await mongoose.connect(mongodbUrl),
  },
];
