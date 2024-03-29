import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParticipantsModule } from 'src/participants/participants.module';
import { TeamsController } from './teams.controller';
import { Team } from './teams.entity';
import { TeamsService } from './teams.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Team]),
    // ParticipantsModule,
    forwardRef(() => ParticipantsModule),
  ],
  controllers: [TeamsController],
  providers: [TeamsService],
  exports: [TeamsService, TypeOrmModule],
})
export class TeamsModule {}
