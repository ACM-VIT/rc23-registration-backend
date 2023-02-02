import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { Participant } from './participants.entity';

@Injectable()
export class ParticipantsService {
  constructor(
    @InjectRepository(Participant)
    private participantRepository: Repository<Participant>,
  ) {}

  findOne(id: number): Promise<Participant> {
    return this.participantRepository.findOneBy({ id });
  }

  async create(createParticipantDto: CreateParticipantDto) {
    const participant = await this.participantRepository.findOneBy({
      email: createParticipantDto.email,
    });

    if (!participant) {
      let participant = await this.participantRepository.create(
        createParticipantDto,
      );
      await this.participantRepository.save(participant);
      const email = participant.email;
      console.log(email);
      participant = await this.participantRepository.findOneBy({
        email,
      });
      return participant;
    }

    return participant;
  }
}
