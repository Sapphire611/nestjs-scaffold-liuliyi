import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import mongoose from 'mongoose';
import config from '../../../config/local.config';
import { UserController } from './user.controller';
import { UserModule } from './user.module';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, MongooseModule.forRootAsync({
        useFactory: () => ({
          uri: config.mongodbUrl,
        }),
      }),],
    }).overrideProvider(UserController).useValue(UserController).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
});
