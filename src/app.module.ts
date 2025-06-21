import { AppController } from '@/app.controller';
import { AuthModule, FileModule, PhotoModule, UserModule } from '@/modules';
import { MongoModule, MqttModule, RedisModule, TypeOrmCustomModule } from '@/providers';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UniqueIdMiddleware } from '@/common/middleware/UniqueIdMiddleware';
@Module({
  imports: [UserModule, AuthModule, RedisModule, PhotoModule, TypeOrmCustomModule, MongoModule, FileModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  // 配置中间件
  // 在这里可以配置全局中间件
  // 注意：在 NestJS 中，MiddlewareConsumer 只在模块中使用
  // 通过 apply() 方法来应用中间件
  // forRoutes() 方法指定中间件应用的路由
  // 例如，apply(UniqueIdMiddleware).forRoutes('*') 表示将 UniqueIdMiddleware 应用于所有路由
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UniqueIdMiddleware) // 应用 UniqueIdMiddleware 中间件
      .forRoutes('*'); // 应用到所有路由
    
    // 如果需要应用到特定路由，可以使用类似下面的方式
    // consumer
    // .apply(UniqueIdMiddleware)
    // .forRoutes({ path: 'users', method: RequestMethod.GET }); // 只应用于 GET /users 路由
  }
}
