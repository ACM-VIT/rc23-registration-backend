import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateInfoDto } from './dto/update-info.dto';
import { ParticipantsService } from './participants.service';

@UseGuards(JwtAuthGuard)
@Controller('participants')
export class ParticipantsController {
  constructor(private participantService: ParticipantsService) {}

  @Post('info')
  async updateInfo(@Req() req, @Body() updateInfoDto: UpdateInfoDto) {
    return await this.participantService.updateInfo(req.user.id, updateInfoDto);
  }

  @Get('info')
  async getInfo(@Req() req) {
    return await this.participantService.getInfo(req.user.id);
  }
}
