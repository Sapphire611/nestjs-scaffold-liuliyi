# Nestjs-scaffold-liuliyi

> Author : [liuliyi](http://172.16.40.16:7777/liuliyi)


## Tips:

## 1. 在 Terminal 处 键入以下命令，会快速创建[name]的CRUD模版

```shell
npx nest generate resource [name].
```


## 2. 通用引入头 **"@/*"**

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


## 3. Project Structure

```shell
|-- src
|   |-- common                      // 通用功能
|   |-- config                      // 配置文件
|   |-- providers                   // [Injectable] 基础服务
|   |-- modules/*                   // 功能模块
|   |   |-- dto                     // 数据传输对象 (Data Transfer Object)
|   |   |-- schemas                 // 数据库模型 (Model)
|   |   |-- xxx.controller.ts       // 控制器
|   |   |-- xxx.controller.spec.ts  // 控制器の测试文件 (e2e)
|   |   |-- xxx.module.ts           // 模块
|   |   |-- xxx.service.ts          // 服务
|   |   |-- xxx.provicer.ts         // [Injectable] 注入对象配置
|   |   |-- index.ts                // 模块的入口文件
|   |-- app.controller.ts           // 一个简单的controller
|   |-- app.module.ts               // 根模块
|   |-- main.ts                     // 入口文件
```