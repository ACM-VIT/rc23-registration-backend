import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { ParticipantsModule } from 'src/participants/participants.module';
import { TeamsModule } from 'src/teams/teams.module';

@Module({
  imports: [ParticipantsModule, TeamsModule],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
