import { AppController } from '@/app.controller';
import { AuthModule } from '@/common/auth/auth.module';
import { UserModule } from '@/modules/user/user.module';
import { MongoModule } from '@/providers/mongo/mongo.module';
import { RedisModule } from '@/providers/redis/redis.module';
// import { RedisModule } from '@nestjs-modules/ioredis';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    UserModule,
    AuthModule,
    MongoModule,
    // RedisModule.forRootAsync({
    //   useFactory: () => ({
    //     config: {
    //       url: 'redis://localhost:6379',
    //     },
    //   }),
    // }),
    RedisModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
