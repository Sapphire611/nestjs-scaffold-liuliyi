# Nestjs-scaffold-liuliyi

> Author : [liuliyi](http://172.16.40.16:7777/liuliyi)


## Tips:

1. 在 Terminal 处 键入以下命令，会快速创建[name]的CRUD模版

```shell
npx nest generate resource [name].
```

2. 通用引入头 **"@/*"**,baseUrl从src开始计算

> 在单个模块的功能开发中，**如果是模块内部的文件**，直接引入即可

```ts
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserModule } from './user.module';
import { UserService } from './user.service';
```

> 如果是**跨模块的引入**，使用通用的引入头
```ts
// 引用config文件夹下的配置文件 local.config.ts
import config from '@/config/local.config';
```