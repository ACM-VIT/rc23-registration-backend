import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ParticipantsService } from 'src/participants/participants.service';

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
    const token = this.jwtService.sign({ id: participant.id });
    let nextPage: string;
    const participantInfo = {
      name: participant.name,
      teamName: null,
      teamCode: null,
      teamMembers: null,
    };
    if (!participant.phone) {
      nextPage = 'info';
    } else if (!participant.team) {
      nextPage = 'team';
    } else {
      nextPage = 'final';
      participantInfo.teamName = participant.team.name;
      participantInfo.teamCode = participant.team.teamcode;
      participantInfo.teamMembers = participant.team.participants;
    }
    return {
      participantInfo,
      token,
      nextPage,
    };
  }
}
