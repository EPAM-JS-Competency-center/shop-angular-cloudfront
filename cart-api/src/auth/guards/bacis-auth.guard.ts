import { ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class BasicAuthGuard extends AuthGuard('basic') {
  constructor(private configService: ConfigService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // If AUTH_DISABLED=true, skip auth entirely
    if (this.configService.get('AUTH_DISABLED') === 'true') {
      return true;
    }

    return super.canActivate(context);
  }
}
