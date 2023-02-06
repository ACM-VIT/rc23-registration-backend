import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import Cache from 'cache-manager';
import * as fs from 'fs';
import { ParticipantsService } from 'src/participants/participants.service';
import { TeamsService } from 'src/teams/teams.service';

@Injectable()
export class AdminService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private participantService: ParticipantsService,
    private teamService: TeamsService,
  ) {}
  async updateStatus(status: number) {
    await this.cacheManager.set('status', status);
    fs.writeFileSync('./config/status.txt', String(status));
    return 'Status updated successfully';
  }

  async teamGeneration() {
    const participants = await this.participantService.findOneWithNoTeam();

    participants.forEach(async (participant) => {
      let i = 0;
      while (true) {
        try {
          const name = participant.name + "_" + String(i);
          await this.teamService.createTeam(participant.id, { name });
          i = 0;
          break;
        } catch (error) {
          if (error.message == 'Team Name Taken') {
            i = i + 1;
          } else {
            return error;
          }
        }
      }
    });

    return 'Successfully generated teams';
  }
}
