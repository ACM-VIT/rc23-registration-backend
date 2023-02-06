import { Module, CacheModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../config/db.config';
import { TeamsModule } from './teams/teams.module';
import { ParticipantsModule } from './participants/participants.module';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import configuration from '../config/configuration';
import * as redisStore from 'cache-manager-redis-store';
import { redisConfig } from 'config/sample.db.config';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: redisConfig.host,
      port: redisConfig.port,
      ttl: 0,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    TeamsModule,
    ParticipantsModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    AdminModule,
  ],
})
export class AppModule {}
