import { CustomRequest } from "@/common/interfaces/express.interface";
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class UniqueIdMiddleware implements NestMiddleware {
    use(req: CustomRequest, res: Response, next: NextFunction) {
        req.uniqueId = uuidV4(); // 为每个请求生成唯一标识符
        next();
    }
}