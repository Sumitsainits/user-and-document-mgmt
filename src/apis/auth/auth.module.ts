import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt-strategy';
import { AuthController } from './auth.controller';
import { TokenModule } from '../token/token.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../shared/guards/auth.guard';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TokenModule, UserModule],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
