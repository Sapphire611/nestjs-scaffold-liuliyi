import { INestApplication } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import * as request from 'supertest';
import { AppModule } from '../../app.module';
import config from '../../config/local.config';

describe('UserController', () => {
  let app: INestApplication;

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, MongooseModule.forRoot(config.mongodbTestUrl)],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    // 测试数据库中清除所有User数据
    const userModel = module.get<Model<any>>(getModelToken('User')); 
    await userModel.deleteMany({});
  });


  // it('[POST] /api/v1/users', () => {
  //   const requestBody = {
  //     name: 'test',
  //     age: 18,
  //     description: 'test',
  //     active: true,
  //   };

  //   return request(app.getHttpServer())
  //     .post('/api/v1/users')
  //     .send(requestBody)
  //     .expect((res) => {
  //       expect(200);
  //       expect(res.body).toHaveProperty('_id');
  //       expect(res.body).toHaveProperty('name', requestBody.name);
  //       expect(res.body).toHaveProperty('age', requestBody.age);
  //       expect(res.body).toHaveProperty('description', requestBody.description);
  //       expect(res.body).toHaveProperty('active', requestBody.active);
  //     });
  // });

  it('[GET] /api/v1/users', () => {
    return request(app.getHttpServer())
      .get('/api/v1/users')
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });

});