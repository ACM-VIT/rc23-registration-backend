import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateTeamDto } from './dto/create-team.dto';
import { TeamsService } from './teams.service';

@Controller('teams')
export class TeamsController {
  constructor(private teamService: TeamsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createTeam(@Req() req, @Body() createTeamDto: CreateTeamDto) {
    try {
      return await this.teamService.createTeam(req.user.id, createTeamDto);
    } catch (error) {
      return error;
    }
  }

}
