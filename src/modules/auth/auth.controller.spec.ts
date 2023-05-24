import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import * as request from 'supertest';
import { AppModule } from '../../app.module';
import { User, UserDocument } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { createRandomUserDTO } from './dto';

describe('AuthController', () => {
  let module: TestingModule;
  let app: INestApplication;
  let authService: AuthService;
  let userService: UserService;
  let userModel: Model<UserDocument>;

  let user: createRandomUserDTO; // 随机生成的用户，携带token，会用token登陆
  let accessToken: string;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    // 测试数据库中清除所有User数据
    userModel = module.get(getModelToken(User.name));
    await userModel.deleteMany({ source: 'user' });

    userService = module.get<UserService>(UserService);
    authService = module.get<AuthService>(AuthService);
    user = await authService.createRandomUser();
  });

  it('[POST] /api/v1/auth/login', async () => {
    const requestBody = {
      name: user.name,
      password: user.password,
    };

    return request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send(requestBody)
      .expect(res => {
        expect(200);
        expect(res.body.access_token.startsWith('ey')).toBe(true);
        accessToken = res.body.access_token;
      });
  });

  it('[GET] /api/v1/auth/profile', async () => {
    return request(app.getHttpServer())
      .get('/api/v1/auth/profile')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(res => {
        expect(200);
        expect(res.body).toHaveProperty('id', user?._id.toString());
        expect(res.body).toHaveProperty('username', user?.name);
        expect(res.body).toHaveProperty('iat');
        expect(res.body).toHaveProperty('exp');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
