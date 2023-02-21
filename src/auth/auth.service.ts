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
    try {
      if (!req.user) {
        return 'No user from google';
      }
      let participant = await this.participantService.findOneByEmail(
        req.user.email,
      );
      if (!participant) {
        if (
          (await this.cacheManager.get<number>('status')) != 0 &&
          !this.configService.get<string[]>('admins').includes(req.user.email)
        ) {
          throw new BadRequestException("User_doesn't_exist");
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
    } catch (error) {
      const url =
        this.configService.get<string>('redirectUrl') +
        '?error=' +
        error.message;
      return { url };
    }
  }
}
