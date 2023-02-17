import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participant } from './participants.entity';
import { ParticipantsController } from './participants.controller';
import { ParticipantsService } from './participants.service';
import { TeamsModule } from 'src/teams/teams.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Participant]),
    forwardRef(() => TeamsModule),
  ],
  controllers: [ParticipantsController],
  providers: [ParticipantsService],
  exports: [ParticipantsService, TypeOrmModule],
})
export class ParticipantsModule {}
