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

    const participant = await this.participantService.create(req.user);
    const payload = { id: participant.id };
    const token = this.jwtService.sign(payload);
    return {
      name: participant.name,
      token,
    };
  }
}
