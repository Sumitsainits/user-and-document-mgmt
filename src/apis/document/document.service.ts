import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { DocumentEntity } from '../../entities/document';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(DocumentEntity)
    private readonly documentRepository: Repository<DocumentEntity>,
  ) {}

  async uploadDocument(
    file: Express.Multer.File,
    userId: string,
  ): Promise<DocumentEntity> {
    const MAX_FILE_SIZE = 2 * 1024 * 1024;

    if (file.buffer.length > MAX_FILE_SIZE) {
      throw new Error('File size exceeds the 2 MB limit');
    }

    try {
      const fileEntity = this.documentRepository.create({
        fileName: file.originalname,
        content: file.buffer,
        uploadedBy: userId,
      });

      return this.documentRepository.save(fileEntity);
    } catch (error) {
      throw new HttpException(
        'Failed to upload file.',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<DocumentEntity[]> {
    return this.documentRepository.find();
  }

  async findOne(id: string): Promise<DocumentEntity> {
    const document = await this.documentRepository.findOne({ where: { id } });
    if (!document) {
      throw new HttpException('Document not found', HttpStatus.NOT_FOUND);
    }
    return document;
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.documentRepository.delete(id);
  }
}
