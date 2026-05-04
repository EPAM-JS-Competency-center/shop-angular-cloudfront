import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { User } from '../../users';

interface CognitoClaims {
  sub: string;
  email?: string;
  'cognito:username'?: string;
}

// Mirrors the infra's USE_COGNITO switch (see infra/lib/shared/auth-stack.ts):
//   - USE_COGNITO=true  → APIGW Cognito authorizer; expect "Bearer <jwt>"
//   - otherwise         → APIGW Basic Lambda authorizer; expect "Basic <b64>"
// APIGW has already authorized the request, so the guard only parses the
// forwarded Authorization header to populate req.user.
@Injectable()
export class CartAuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const header = request.headers.authorization;

    if (!header) {
      throw new UnauthorizedException('Missing Authorization header');
    }

    const useCognito = this.configService.get('USE_COGNITO') === 'true';
    const user = useCognito ? parseBearer(header) : parseBasic(header);

    if (!user) {
      throw new UnauthorizedException(
        useCognito ? 'Expected Bearer token' : 'Expected Basic credentials',
      );
    }

    (request as Request & { user?: User }).user = user;
    return true;
  }
}

function parseBearer(header: string): User | null {
  if (!header.startsWith('Bearer ')) {
    return null;
  }

  const claims = decodeJwtPayload(header.slice('Bearer '.length));

  if (!claims?.sub) {
    return null;
  }

  return {
    id: claims.sub,
    name: claims['cognito:username'] ?? claims.email ?? claims.sub,
  } as User;
}

function parseBasic(header: string): User | null {
  if (!header.startsWith('Basic ')) {
    return null;
  }

  try {
    const decoded = Buffer.from(
      header.slice('Basic '.length),
      'base64',
    ).toString('utf8');

    const idx = decoded.indexOf(':');
    const username = idx < 0 ? decoded : decoded.slice(0, idx);

    if (!username) {
      return null;
    }

    return { id: username, name: username } as User;
  } catch {
    return null;
  }
}

function decodeJwtPayload(token: string): CognitoClaims | null {
  const parts = token.split('.');

  if (parts.length !== 3) {
    return null;
  }

  try {
    const json = Buffer.from(parts[1], 'base64url').toString('utf8');

    return JSON.parse(json) as CognitoClaims;
  } catch {
    return null;
  }
}
