import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DocumentModule } from './apis/document/document.module';
import { AuthModule } from './apis/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './dataSource';
import { IngestionModule } from './apis/ingestion/ingestion.module';
import { UserModule } from './apis/user/user.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({ ...dataSourceOptions, autoLoadEntities: true }),
    AuthModule,
    UserModule,
    DocumentModule,
    IngestionModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
