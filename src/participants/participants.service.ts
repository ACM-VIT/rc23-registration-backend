import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateInfoDto } from './dto/update-info.dto';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { Participant } from './participants.entity';
import { ParticipantInfo } from './participant.interfaces';
import { Team } from 'src/teams/teams.entity';

@Injectable()
export class ParticipantsService {
  constructor(
    @InjectRepository(Participant)
    private participantRepository: Repository<Participant>,

    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
  ) {}

  async findOneByEmail(email: string) {
    return await this.participantRepository.findOne({
      where: { email },
      relations: { team: true },
    });
  }

  async findOneWithNoTeam() {
    return await this.participantRepository.find({
      where: {
        team: null,
      },
      relations: { team: true },
    });
  }

  async create(createParticipantDto: CreateParticipantDto) {
    let participant = this.participantRepository.create(createParticipantDto);
    await this.participantRepository.save(participant);
    const email = participant.email;
    participant = await this.participantRepository.findOne({
      where: { email },
      relations: { team: true },
    });
    return participant;
  }

  async updateInfo(id: number, updateInfoDto: UpdateInfoDto) {
    try {
      const participant = await this.participantRepository.findOneBy({ id });
      participant.regNum = updateInfoDto.regNum;
      participant.phone = updateInfoDto.phone;
      participant.uniName = updateInfoDto.uniName;
      participant.fresher = updateInfoDto.fresher;

      await this.participantRepository.save(participant);
      return { message: 'Successfully Added' };
    } catch (error) {
      return { message: error.message };
    }
  }

  async getInfo(id: number) {
    try {
      const participant = await this.participantRepository.findOne({
        where: { id },
        relations: { team: true },
      });

      const participantInfo: ParticipantInfo = {
        name: participant.name,
      };

      let nextPage: string;

      if (!participant.phone) {
        nextPage = 'info';
      } else if (!participant.team) {
        nextPage = 'team';
      } else {
        nextPage = 'final';
        participantInfo.teamName = participant.team.name;
        participantInfo.teamCode = participant.team.teamcode;
        const team = await this.teamRepository.findOne({
          where: {
            id: participant.team.id,
          },
          relations: { participants: true },
        });
        participantInfo.teamMembers = team.participants.map((participant) => {
          return participant.name;
        });
      }

      return {
        participantInfo,
        nextPage,
      };
    } catch (error) {
      return { message: error.message };
    }
  }
}
