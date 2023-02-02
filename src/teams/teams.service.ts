import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './teams.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { Participant } from 'src/participants/participants.entity';
import { generateCode } from './tools/generateCode';
import { rename } from 'fs';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,

    @InjectRepository(Participant)
    private participantRepository: Repository<Participant>,
  ) {}

  async createTeam(id: number, createTeamDto: CreateTeamDto) {
    const participant = await this.participantRepository.findOne({
      where: { id },
      relations: {
        team: true,
      },
    });
    if (participant.team) {
      throw new BadRequestException('Participant Already in a team');
    }

    const checkTeam = await this.teamRepository.findOneBy(createTeamDto);
    if (checkTeam) {
      throw new BadRequestException('Team Name Taken');
    }
    while (true) {
      const teamcode = generateCode();
      let team = await this.teamRepository.findOneBy({ teamcode });
      if (!team) {
        const newTeam = await this.teamRepository.create(createTeamDto);
        newTeam.teamcode = teamcode;
        await this.teamRepository.save(newTeam);

        team = await this.teamRepository.findOneBy({ teamcode });

        participant.teamLeader = true;
        participant.team = team;
        await this.participantRepository.save(participant);
        return { name: newTeam.name, teamcode };
      }
    }
  }
}
