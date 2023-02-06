import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ParticipantsService } from 'src/participants/participants.service';
import { participantInfo } from './auth.interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly participantService: ParticipantsService,
    private readonly jwtService: JwtService,
  ) {}

  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    let participant = await this.participantService.findOneByEmail(
      req.user.email,
    );
    if (!participant) {
      participant = await this.participantService.create(req.user);
    }
    const token = this.jwtService.sign({
      id: participant.id,
      email: participant.email,
    });
    let nextPage: string;
    const participantInfo: participantInfo = {
      name: participant.name,
    };
    if (!participant.phone) {
      nextPage = 'info';
    } else if (!participant.team) {
      nextPage = 'team';
    } else {
      nextPage = 'final';
      participantInfo.teamName = participant.team.name;
      participantInfo.teamCode = participant.team.teamcode;
      participantInfo.teamMembers = participant.team.participants.map(
        (participant) => {
          return participant.name;
        },
      );
    }
    return {
      participantInfo,
      token,
      nextPage,
    };
  }
}
