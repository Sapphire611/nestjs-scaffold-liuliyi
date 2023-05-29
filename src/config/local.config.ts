const mongodbName = 'nestjs-scaffold';
const ip = '127.0.0.1';

export default {
  port: 19061,
  jwtSecret: 'QWZZuUjA',
  swaggerSuffix: 'api/swagger',
  mongodbUrl: `mongodb://${ip}:27018/${mongodbName}`,
  mongodbTestUrl: `mongodb://${ip}:27018/${mongodbName}-test`,
  redisUrl: `redis://${ip}:6379/6`,
  redisTestUrl: `redis://${ip}:6379/10`,
};
