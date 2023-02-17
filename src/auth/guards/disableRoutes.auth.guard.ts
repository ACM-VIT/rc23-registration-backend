import { Injectable, CanActivate, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Observable } from 'rxjs';
import Cache from 'cache-manager';

@Injectable()
export class EventStartGuard implements CanActivate {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  canActivate(): boolean | Promise<boolean> | Observable<boolean> {
    return this.validateStatus();
  }

  async validateStatus() {
    return !(await this.cacheManager.get('status'));
    //   console.log(status);
    //   if (status == 0) {
    //     console.log('yes');
    //     return true;
    //   }
    //   return false;
  }
}
