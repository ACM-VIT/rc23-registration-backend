import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  CACHE_MANAGER,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import Cache from 'cache-manager';

@Injectable()
export class EventStartGuard implements CanActivate {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return this.validateStatus();
  }

  async validateStatus() {
    const status = await this.cacheManager.get('status');
    if (status == 0) {
      return true;
    }
    return false;
  }
}
