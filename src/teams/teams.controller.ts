import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { EventStartGuard } from 'src/auth/guards/disableRoutes.auth.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ConfirmTeamDto } from './dto/confirm-team.dto';
import { CreateTeamDto } from './dto/create-team.dto';
import { TeamsService } from './teams.service';

@UseGuards(JwtAuthGuard)
@UseGuards(EventStartGuard)
@Controller('teams')
export class TeamsController {
  constructor(private teamService: TeamsService) {}

  //@UseGuards(JwtAuthGuard)
  @Post('create')
  async createTeam(@Req() req, @Body() createTeamDto: CreateTeamDto) {
    try {
      return await this.teamService.createTeam(req.user.id, createTeamDto);
    } catch (error) {
      return error.response;
    }
  }

  //@UseGuards(JwtAuthGuard)
  @Get('confirm')
  async confirmTeam(@Req() req, @Body() confirmTeamDto: ConfirmTeamDto) {
    try {
      return await this.teamService.confirmTeam(req.user.id, confirmTeamDto);
    } catch (error) {
      return error.response;
    }
  }

  // @UseGuards(JwtAuthGuard)
  @Post('join')
  async joinTeam(@Req() req, @Body() joinTeamDto: ConfirmTeamDto) {
    try {
      return await this.teamService.joinTeam(req.user.id, joinTeamDto);
    } catch (error) {
      return error.response;
    }
  }

  //@UseGuards(JwtAuthGuard)
  @Post('leave')
  async leaveTeam(@Req() req) {
    try {
      return await this.teamService.leaveTeam(req.user.id);
    } catch (error) {
      return error.response;
    }
  }
}
