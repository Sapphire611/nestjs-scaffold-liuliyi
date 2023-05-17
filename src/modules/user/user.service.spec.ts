import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import mongoose from 'mongoose';
import config from '../../../config/local.config';
import { UserModule } from './user.module';
import { UserService } from './user.service';
describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, MongooseModule.forRootAsync({
        useFactory: () => ({
          uri: config.mongodbUrl,
        }),
      }),],
    }).overrideProvider(service).useValue(service).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
});
