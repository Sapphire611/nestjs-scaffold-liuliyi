const mongodbName = 'nestjs-scaffold';
const mongodbPort = 27017; // you may need change this port
const ip = '127.0.0.1';

export default {
  port: 19061,
  jwtSecret: 'QWZZuUjA',
  swaggerSuffix: 'api/swagger',
  mongodbUrl: `mongodb://${ip}:${mongodbPort}/${mongodbName}`,
  mongodbTestUrl: `mongodb://${ip}:${mongodbPort}/${mongodbName}-test`,
  redisUrl: `redis://${ip}:6379/6`,
  redisTestUrl: `redis://${ip}:6379/10`,
};
