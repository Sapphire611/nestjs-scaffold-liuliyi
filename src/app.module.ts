import { AppController } from '@/app.controller';
import { AuthModule } from '@/common/auth/auth.module';
import { UserModule } from '@/modules/user/user.module';
import { MongoModule } from '@/providers/mongo/mongo.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [UserModule, AuthModule, MongoModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
