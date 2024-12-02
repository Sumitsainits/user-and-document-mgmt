import { Module } from '@nestjs/common';
import { IngestionController } from './ingestion.controller';
import { IngestionService } from './ingestion.service';
import { DocumentModule } from '../document/document.module';
import { RoleGuard } from '../shared/guards/role.guard';
import { Reflector } from '@nestjs/core';

@Module({
  imports: [DocumentModule],
  controllers: [IngestionController],
  providers: [IngestionService, RoleGuard, Reflector],
  exports: [IngestionService],
})
export class IngestionModule {}
