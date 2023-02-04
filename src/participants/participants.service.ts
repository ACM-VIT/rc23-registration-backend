import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateInfoDto } from './dto/update-info.dto';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { Participant } from './participants.entity';

@Injectable()
export class ParticipantsService {
  constructor(
    @InjectRepository(Participant)
    private participantRepository: Repository<Participant>,
  ) {}

  async findOneByEmail(email: string) {
    return await this.participantRepository.findOne({
      where: { email },
      relations: { team: true },
    });
  }

  async create(createParticipantDto: CreateParticipantDto) {
    let participant = await this.participantRepository.create(
      createParticipantDto,
    );
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
}
