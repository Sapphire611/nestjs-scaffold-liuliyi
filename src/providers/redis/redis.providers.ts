import config from '@/config/local.config';
import { Provider } from '@nestjs/common';

const redisUrl = process.env.NODE_ENV === 'test' ? config.redisTestUrl : config.redisUrl;
export const redisProviders: Provider[] = [
  {
    provide: 'REDIS_CLIENT', // 提供者的标识符
    useFactory: () => ({
      config: {
        url: redisUrl,
      },
    }),
  },
];
