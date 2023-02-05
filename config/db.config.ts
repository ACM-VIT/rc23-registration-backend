import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: '172.18.0.3',
  port: 5432,
  username: 'username',
  password: 'password',
  database: 'rc23',
  entities: [__dirname + '/../**/*.entity.js'],
  synchronize: false,
};

export const redisConfig = {
  ttl: 0,
  host: 'localhost',
  port: 6379,
};
