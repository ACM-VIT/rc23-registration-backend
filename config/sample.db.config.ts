import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'dbname',
  entities: [__dirname + '/../**/*.entity.js'],
  synchronize: false,
};


export const redisConfig = {
  ttl: 0,
  host: 'localhost',
  port: 6379,
};
