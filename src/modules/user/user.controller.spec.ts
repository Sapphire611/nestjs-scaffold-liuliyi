import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import * as crypto from 'crypto-js';
import * as request from 'supertest';
import { AppModule } from '../../app.module';

import { ResponseUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

describe('UserController', () => {
  let app: INestApplication;
  let user: ResponseUserDto; // 用于存储测试用例中创建的用户
  let jwtService: JwtService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const userModel = module.get(getModelToken(User.name));

    app = module.createNestApplication();
    await app.init();

    // 测试数据库中清除所有User数据
    userModel.deleteMany({});
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
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NmIzZDRjYmU4ZjM0NjFhYmQ2ZTdiZCIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2ODQ4MTIyOTksImV4cCI6MTY4NDg5ODY5OX0.YRrQEmUtBIn-nk2tqAhkx08pLGTcZFHJjUY-UXgkkf4'
      ) // Set the Bearer token in the request header
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
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NmIzZDRjYmU4ZjM0NjFhYmQ2ZTdiZCIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2ODQ4MTIyOTksImV4cCI6MTY4NDg5ODY5OX0.YRrQEmUtBIn-nk2tqAhkx08pLGTcZFHJjUY-UXgkkf4'
      ) // Set the Bearer token in the request header
      .expect(res => {
        expect(200);
        expect(res.body.data.filter((item: User) => item.name === user.name).length).toBe(1);
      });
  });

  it('[GET] /api/v1/users/:id', () => {
    return request(app.getHttpServer())
      .get(`/api/v1/users/${user._id}`)
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NmIzZDRjYmU4ZjM0NjFhYmQ2ZTdiZCIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2ODQ4MTIyOTksImV4cCI6MTY4NDg5ODY5OX0.YRrQEmUtBIn-nk2tqAhkx08pLGTcZFHJjUY-UXgkkf4'
      ) // Set the Bearer token in the request header
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
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NmIzZDRjYmU4ZjM0NjFhYmQ2ZTdiZCIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2ODQ4MTIyOTksImV4cCI6MTY4NDg5ODY5OX0.YRrQEmUtBIn-nk2tqAhkx08pLGTcZFHJjUY-UXgkkf4'
      ) // Set the Bearer token in the request header
      .expect(res => {
        expect(200);
        expect(res.body.acknowledged).toEqual(true);
        expect(res.body.modifiedCount).toEqual(1);
      });
  });

  it('[DELETE] /api/v1/users/:id', () => {
    return request(app.getHttpServer())
      .delete(`/api/v1/users/${user._id}`)
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NmIzZDRjYmU4ZjM0NjFhYmQ2ZTdiZCIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2ODQ4MTIyOTksImV4cCI6MTY4NDg5ODY5OX0.YRrQEmUtBIn-nk2tqAhkx08pLGTcZFHJjUY-UXgkkf4'
      ) // Set the Bearer token in the request header
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
