import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { UserEntity } from './entities/user';
import { DocumentEntity } from './entities/document';

config();
const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: configService.get('DB_CONNECTION_URL'),
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: [UserEntity, DocumentEntity],
};

export default new DataSource({
  ...dataSourceOptions,
  migrations: ['src/migrations/**/*{.ts,.js}'],
});
