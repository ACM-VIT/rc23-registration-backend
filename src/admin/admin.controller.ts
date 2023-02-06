import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { AdminGuard } from 'src/auth/guards/admin.auth.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateStatusDto } from './dto/update-status.dto';
import * as fs from 'fs';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post('status')
  async updateStatus(@Body() updateStatusDto: UpdateStatusDto) {
    try {
      return await this.adminService.updateStatus(updateStatusDto.status);
    } catch (error) {
      return error;
    }
  }
}
