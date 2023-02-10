import {
  BadRequestException,
  Injectable,
  Inject,
  CACHE_MANAGER,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ParticipantsService } from 'src/participants/participants.service';
import Cache from 'cache-manager';

@Injectable()
export class AuthService {
  constructor(
    private readonly participantService: ParticipantsService,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }
    let participant = await this.participantService.findOneByEmail(
      req.user.email,
    );
    if (!participant) {
      if (
        this.cacheManager.get<number>('status') != 0 ||
        !this.configService.get<string[]>('admins').includes(req.user.email)
      ) {
        throw new BadRequestException("User doesn't exist ");
      }
      participant = await this.participantService.create(req.user);
    }
    const token = this.jwtService.sign({
      id: participant.id,
      email: participant.email,
    });

    const url =
      this.configService.get<string>('redirectUrl') + '?token=' + token;

    return { url };
  }
}
