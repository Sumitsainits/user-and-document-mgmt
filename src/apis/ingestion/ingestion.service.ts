import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { DocumentService } from '../document/document.service';
import { DocumentEntity } from '../../entities/document';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class IngestionService {
  axiosClient: AxiosInstance;
  constructor(
    readonly documentService: DocumentService,
    readonly configService: ConfigService,
  ) {
    this.axiosClient = axios.create({
      baseURL: configService.get('INGESTION_API_BASE_URL'),
    });
  }

  async triggerIngestion(documentId: string): Promise<any> {
    const pythonBackendUrl: string = '/ingest';
    const headers: AxiosRequestConfig['headers'] = {};

    try {
      const requiredDocument: DocumentEntity =
        await this.documentService.findOne(documentId);

      const response: AxiosResponse = await this.axiosClient.post(
        pythonBackendUrl,
        {
          source: requiredDocument.content,
        },
        { headers },
      );

      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to trigger ingestion process',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getIngestionStatus(pid: string): Promise<string> {
    const statusUrl: string = `/ingest/status/${pid}`;

    try {
      const response: AxiosResponse = await this.axiosClient.get(statusUrl);
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch ingestion status',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
