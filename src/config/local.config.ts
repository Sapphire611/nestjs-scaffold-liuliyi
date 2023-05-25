const mongodbName = 'nestjs-scaffold';
const ip = '172.16.30.120';

export default {
  port: 19061,
  jwtSecret: 'QWZZuUjA',
  swaggerSuffix: 'api/swagger',
  mongodbUrl: `mongodb://${ip}:27017/${mongodbName}`,
  mongodbTestUrl: `mongodb://${ip}:27017/${mongodbName}-test`,
  redisUrl: `redis://${ip}:6379/6`,
  redisTestUrl: `redis://${ip}:6379/10`,
};
