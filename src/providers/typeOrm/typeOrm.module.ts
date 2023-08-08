import { config } from '@/config';
import { Photo, PhotoModule } from '@/modules/photo';
import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

function createTypeOrmOptions(): TypeOrmModuleOptions {
  return {
    type: 'mongodb',
    url: config.mongodb, // MongoDB connection URL
    entities: [Photo],
    synchronize: true,
  };
}

@Module({
  // imports: [
  //   TypeOrmModule.forRootAsync({
  //     imports: [TypeOrmCustomModule], // Import the custom TypeOrm module
  //     useFactory: async () => ({
  //       type: 'mongodb',
  //       url: config.mongodb, // MongoDB connection URL
  //       entities: [Photo],
  //       synchronize: true,
  //     }),
  //   }),
  // ],
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: config.mongodb,
      entities: [Photo],
      synchronize: true,
    }),
    PhotoModule,
  ],
  // providers: [
  //   {
  //     provide: 'TYPEORM_CONNECTION', // 自定义的 provider 标识符
  //     useFactory: createTypeOrmOptions,
  //   },
  // ],
  // exports: ['TYPEORM_CONNECTION'], // 将 Redis provider 导出，以便其他模块可以使用
})
export class TypeOrmCustomModule implements OnModuleInit {
  onModuleInit() {
    Logger.debug(`typeorm is running on: ${config.mongodb}`);
  }
}
