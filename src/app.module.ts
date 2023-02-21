import { Module, CacheModule, HttpException } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamsModule } from './teams/teams.module';
import { ParticipantsModule } from './participants/participants.module';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import configuration from '../config/configuration';
import { redisConfig, typeOrmConfig, sentry_dsn } from 'config/db.config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { SentryModule, SentryInterceptor } from '@ntegral/nestjs-sentry';

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
    // SentryModule.forRoot({
    //   dsn: sentry_dsn,
    //   debug: true,
    //   environment: 'production',
    //   logLevels: ['debug'],
    // }),
    AdminModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useFactory: () =>
    //     new SentryInterceptor({
    //       filters: [
    //         {
    //           type: HttpException,
    //           //filter: (exception: HttpException) => 500 > exception.getStatus(), // Only report 500 errors
    //         },
    //       ],
    //     }),
    // },
  ],
})
export class AppModule {}
