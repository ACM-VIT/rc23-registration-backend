import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { AdminGuard } from 'src/auth/guards/admin.auth.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateStatusDto } from './dto/update-status.dto';
import { AdminService } from './admin.service';

UseGuards(JwtAuthGuard, AdminGuard);
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('status')
  async updateStatus(@Body() updateStatusDto: UpdateStatusDto) {
    try {
      return await this.adminService.updateStatus(updateStatusDto.status);
    } catch (error) {
      return error;
    }
  }

  @Post('generateTeam')
  async generateTeam() {
    try {
      return await this.adminService.teamGeneration();
    } catch (error) {
      return error;
    }
  }
}
