import { Module } from '@nestjs/common';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentEntity } from '../../entities/document';
import { RoleGuard } from '../shared/guards/role.guard';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '../shared/guards/auth.guard';
import { TokenService } from '../token/token.service';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentEntity])],
  controllers: [DocumentController],
  providers: [DocumentService, TokenService, AuthGuard, RoleGuard, Reflector],
  exports: [DocumentService],
})
export class DocumentModule {}
