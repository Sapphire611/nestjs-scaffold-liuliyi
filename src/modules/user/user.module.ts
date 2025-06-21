import { MongoModule } from '@/providers';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { userProviders } from './user.providers';
import { UserService } from './user.service';

@Module({
  imports: [MongoModule],
  controllers: [UserController],
  providers: [UserService, ...userProviders],
  exports: [UserService],
})

// @Module({
//   providers: [
//     {
//       provide: APP_GUARD, // 全局注册守卫
//       useClass: RolesGuard, // 你的守卫类
//     },
//   ],
// })

export class UserModule {}
