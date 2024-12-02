import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/user';
import { UserController } from './user.controller';
import { RoleGuard } from '../shared/guards/role.guard';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '../shared/guards/auth.guard';
import { TokenService } from '../token/token.service';
import { AdminController } from './admin.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [AdminController, UserController],
  providers: [UserService, TokenService, AuthGuard, RoleGuard, Reflector],
  exports: [UserService],
})
export class UserModule {}
