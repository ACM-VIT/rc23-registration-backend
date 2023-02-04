import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './teams.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { Participant } from 'src/participants/participants.entity';
import { generateCode } from './tools/generateCode';
import { ConfirmTeamDto } from './dto/confirm-team.dto';
import { removeParticipant } from './tools/removeParticipant';

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

  async confirmTeam(id: number, confirmTeamDto: ConfirmTeamDto) {
    const participant = await this.participantRepository.findOne({
      where: { id },
      relations: { team: true },
    });
    if (participant.team) {
      throw new BadRequestException('Participant Already in team.');
    }

    const team = await this.teamRepository.findOne({
      where: confirmTeamDto,
      relations: { participants: true },
    });
    if (!team) {
      throw new BadRequestException('No team with this code exists');
    }
    if (team.participants.length == 2) {
      throw new BadRequestException('Team already full');
    }

    return { name: team.name, teamcode: team.teamcode };
  }

  async joinTeam(id: number, joinTeamDto: ConfirmTeamDto) {
    const participant = await this.participantRepository.findOne({
      where: { id },
      relations: { team: true },
    });
    if (participant.team) {
      throw new BadRequestException('Participant Already in team.');
    }

    const team = await this.teamRepository.findOne({
      where: joinTeamDto,
      relations: { participants: true },
    });
    if (!team) {
      throw new BadRequestException('No team with this code exists');
    }
    if (team.participants.length == 2) {
      throw new BadRequestException('Team already full');
    }

    participant.team = team;
    await this.participantRepository.save(participant);

    return { message: 'Successfully joined.' };
  }

  async leaveTeam(id: number) {
    const participant = await this.participantRepository.findOne({
      where: { id },
      relations: { team: true },
    });
    const team = await this.teamRepository.findOne({
      where: { id: participant.team.id },
      relations: { participants: true },
    });
    participant.team = null;
    participant.teamLeader = false;
    await this.participantRepository.save(participant);
    team.participants = removeParticipant(team.participants, participant.id);
    if (!team.participants.length) {
      await this.teamRepository.remove(team);
    } else {
      const participant = await this.participantRepository.findOneBy({
        id: team.participants[0].id,
      });
      participant.teamLeader = true;
      await this.participantRepository.save(participant);
      await this.teamRepository.save(team);
    }

    return { message: 'Successfully left' };
  }
}
