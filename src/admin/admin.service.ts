import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import Cache from 'cache-manager';
import * as fs from 'fs';

@Injectable()
export class AdminService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async updateStatus(status: number) {
    await this.cacheManager.set('status', status);
    fs.writeFileSync(
      './config/status.txt',
      String(status),
    );
    return 'Status updated successfully';
  }
}
