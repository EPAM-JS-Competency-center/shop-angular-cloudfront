import { Module } from '@nestjs/common';

import { UsersService } from './services';

@Module({
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
