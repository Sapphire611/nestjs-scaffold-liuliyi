import { MongoModule } from '@/providers/mongo/mongo.module';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { userProviders } from './user.providers';
import { UserService } from './user.service';

@Module({
  imports: [
    // MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), // 导入用户模型
    MongoModule,
  ],
  controllers: [UserController],
  providers: [UserService, ...userProviders],
  exports: [UserService],
})
export class UserModule {}
