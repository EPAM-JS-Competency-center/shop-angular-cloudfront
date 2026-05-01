import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { BasicStrategy, JwtStrategy, LocalStrategy } from './strategies';

import { JWT_CONFIG } from '../constants';
import { UsersModule } from '../users/users.module';

const { secret, expiresIn } = JWT_CONFIG;

@Module({
  imports: [
    UsersModule,
    PassportModule, //.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({ secret, signOptions: { expiresIn } }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy, BasicStrategy],
  exports: [AuthService],
})
export class AuthModule {}
