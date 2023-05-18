// mongodbUrl 测试环境和正式环境分离

// const mongodbUrl = process.env.NODE_ENV === 'test' ? config.mongodbTestUrl : config.mongodbUrl;
// @Module({
//     imports: [MongooseModule.forRoot(mongodbUrl)],
//     controllers: [],
//     providers: [],
// })

// export class CommonModule {
//     async clearMongoDatabase() {
//         // 清除mongodbTestUrl中测试数据库的所有数据
//         const collections = await mongoose.connection.db.collections();

//         for (const collection of collections) {
//             await collection.deleteMany({});
//         }
//     }
// }
import { INestApplication } from '@nestjs/common';
import { Connection } from 'mongoose';

export const clearMongoDatabase = async (app: INestApplication) => {
    const connection = app.get(Connection);
    const modelNames = Object.keys(connection.models);

    for (const modelName of modelNames) {
        const model = connection.models[modelName];
        await model.deleteMany({});
    }
}