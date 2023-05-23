import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let controller: AuthController;
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  it('1+1=2', () => {
    expect(1 + 1).toBe(2);
  });

  afterAll(async () => {
    await app.close();
  });
});
