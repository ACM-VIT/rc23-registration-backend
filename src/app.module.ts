import { Module, CacheModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamsModule } from './teams/teams.module';
import { ParticipantsModule } from './participants/participants.module';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import configuration from '../config/configuration';
import { redisConfig, typeOrmConfig } from 'config/db.config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 15,
    }),
    CacheModule.register(redisConfig),
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
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
