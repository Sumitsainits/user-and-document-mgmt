import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ADMIN_TOKEN_KEY } from '../../../shared/utils';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    return (
      request.headers[ADMIN_TOKEN_KEY] == this.configService.get('ADMIN_TOKEN')
    );
  }
}
