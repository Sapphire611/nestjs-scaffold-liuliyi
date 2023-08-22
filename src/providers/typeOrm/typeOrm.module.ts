import { config } from '@/config';
import { Photo, PhotoModule } from '@/modules/photo';
import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: config.mongodb,
      entities: [Photo],
      synchronize: true,
    }),
    PhotoModule,
  ],
})

export class TypeOrmCustomModule implements OnModuleInit {
  onModuleInit() {
    Logger.log(`typeorm is running on: ${config.mongodb}`);
  }
}
