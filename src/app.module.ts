import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../config/typeOrm.config';
import { TeamsModule } from './teams/teams.module';
import { ParticipantsModule } from './participants/participants.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    TeamsModule,
    ParticipantsModule,
    ConfigModule.forRoot({
      load:[configuration],
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
