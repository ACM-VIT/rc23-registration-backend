import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateInfoDto } from './dto/update-info.dto';
import { Participant } from './participants.entity';
import { ParticipantsService } from './participants.service';

@Controller('participants')
export class ParticipantsController {
  constructor(private participantService: ParticipantsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('info')
  async updateInfo(@Req() req, @Body() updateInfoDto: UpdateInfoDto) {
    return await this.participantService.updateInfo(req.user.id, updateInfoDto);
  }
}
