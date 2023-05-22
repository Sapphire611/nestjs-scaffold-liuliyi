import { INestApplication } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import * as crypto from 'crypto-js';
import { Model } from 'mongoose';
import * as request from 'supertest';
import { AppModule } from '../../app.module';
import config from '../../config/local.config';
import { ResponseUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
describe('UserController', () => {
  let app: INestApplication;
  let user: ResponseUserDto;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, MongooseModule.forRoot(config.mongodbTestUrl)],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    // 测试数据库中清除所有User数据
    module.get<Model<any>>(getModelToken(User.name)).deleteMany({});
  });

  it('[POST] /api/v1/users', () => {
    const requestBody = {
      name: 'test',
      age: 18,
      password: crypto.MD5('123456').toString(),
      description: 'test',
      active: true,
    };

    return request(app.getHttpServer())
      .post('/api/v1/users')
      .send(requestBody)
      .expect(res => {
        expect(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body).toHaveProperty('name', requestBody.name);
        expect(res.body).toHaveProperty('age', requestBody.age);
        expect(res.body).toHaveProperty('description', requestBody.description);
        expect(res.body).toHaveProperty('active', requestBody.active);
        user = res.body;
      });
  });

  it('[GET] /api/v1/users', () => {
    return request(app.getHttpServer())
      .get('/api/v1/users')
      .expect(res => {
        expect(200);
        expect(res.body.data.filter((item: User) => item.name === user.name).length).toBe(1);
      });
  });

  it('[GET] /api/v1/users/:id', () => {
    return request(app.getHttpServer())
      .get(`/api/v1/users/${user._id}`)
      .expect(res => {
        expect(200);
        expect(res.body._id).toEqual(user._id);
      });
  });

  it('[PATCH] /api/v1/users/:id', () => {
    const requestBody = {
      name: 'test2',
    };
    return request(app.getHttpServer())
      .patch(`/api/v1/users/${user._id}`)
      .send(requestBody)
      .expect(res => {
        expect(200);
        expect(res.body.acknowledged).toEqual(true);
        expect(res.body.modifiedCount).toEqual(1);
      });
  });

  it('[DELETE] /api/v1/users/:id', () => {
    return request(app.getHttpServer())
      .delete(`/api/v1/users/${user._id}`)
      .expect(res => {
        expect(200);
        expect(res.body.acknowledged).toEqual(true);
        expect(res.body.deletedCount).toEqual(1);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
