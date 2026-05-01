import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/services/users.service';
import { User } from '../users/models';
// import { contentSecurityPolicy } from 'helmet';
type TokenResponse = {
  token_type: string;
  access_token: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  register(payload: User) {
    const user = this.usersService.findOne(payload.name);

    if (user) {
      throw new BadRequestException('User with such name already exists');
    }

    const { id: userId } = this.usersService.createOne(payload);
    return { userId };
  }

  validateUser(name: string, password: string): User {
    const user = this.usersService.findOne(name);

    if (user) {
      return user;
    }

    return this.usersService.createOne({ name, password });
  }

  login(user: User, type: 'jwt' | 'basic' | 'default'): TokenResponse {
    const LOGIN_MAP = {
      jwt: this.loginJWT,
      basic: this.loginBasic,
      default: this.loginJWT,
    };
    const login = LOGIN_MAP[type];

    return login ? login(user) : LOGIN_MAP.default(user);
  }

  loginJWT(user: User) {
    const payload = { username: user.name, sub: user.id };

    return {
      token_type: 'Bearer',
      access_token: this.jwtService.sign(payload),
    };
  }

  loginBasic(user: User) {
    // const payload = { username: user.name, sub: user.id };
    console.log(user);

    function encodeUserToken(user: User) {
      const { name, password } = user;
      const buf = Buffer.from([name, password].join(':'), 'utf8');

      return buf.toString('base64');
    }

    return {
      token_type: 'Basic',
      access_token: encodeUserToken(user),
    };
  }
}
