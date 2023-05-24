import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import * as crypto from 'crypto-js';
import * as request from 'supertest';
import { AppModule } from '../../app.module';

import { AuthService } from '../auth/auth.service';
import { createRandomUserDTO } from '../auth/dto';
import { ResponseUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

describe('UserController', () => {
  let module: TestingModule;
  let app: INestApplication;
  let authService: AuthService;
  
  let user: createRandomUserDTO; // 随机生成的用户，携带token，会用token登陆
  let userResult: ResponseUserDto; // 用于存储测试用例中创建的用户
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    // 测试数据库中清除所有User数据
    const userModel = module.get(getModelToken(User.name));
    await userModel.deleteMany({});

    authService = module.get<AuthService>(AuthService);
    user = await authService.createRandomUser();
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
      .set('Authorization', `Bearer ${user.token}`)
      .expect(res => {
        expect(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body).toHaveProperty('name', requestBody.name);
        expect(res.body).toHaveProperty('age', requestBody.age);
        expect(res.body).toHaveProperty('description', requestBody.description);
        expect(res.body).toHaveProperty('active', requestBody.active);
        userResult = res.body;
      });
  });

  it('[GET] /api/v1/users', () => {
    return request(app.getHttpServer())
      .get('/api/v1/users')
      .set('Authorization', `Bearer ${user.token}`)
      .expect(res => {
        expect(200);
        expect(res.body.data.filter((item: User) => item.name === userResult.name).length).toBe(1);
      });
  });

  it('[GET] /api/v1/users/:id', () => {
    return request(app.getHttpServer())
      .get(`/api/v1/users/${userResult._id}`)
      .set('Authorization', `Bearer ${user.token}`)
      .expect(res => {
        expect(200);
        expect(res.body._id).toEqual(userResult._id);
      });
  });

  it('[PATCH] /api/v1/users/:id', () => {
    const requestBody = {
      name: 'test2',
    };
    return request(app.getHttpServer())
      .patch(`/api/v1/users/${userResult._id}`)
      .send(requestBody)
      .set('Authorization', `Bearer ${user.token}`)
      .expect(res => {
        expect(200);
        expect(res.body.acknowledged).toEqual(true);
        expect(res.body.modifiedCount).toEqual(1);
      });
  });

  it('[DELETE] /api/v1/users/:id', () => {
    return request(app.getHttpServer())
      .delete(`/api/v1/users/${userResult._id}`)
      .set('Authorization', `Bearer ${user.token}`)
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
