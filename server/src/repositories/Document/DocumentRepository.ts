import { getRepository, Repository } from 'typeorm';
import ICreateDocumentDTO from '../../dto/ICreateDocumentDTO';

import { Document } from '../../entities/Document';
import IDocumentRepository from './IDocumentRepository';

export class DocumentRepository implements IDocumentRepository {
  public ormRepository: Repository<Document>;

  constructor() {
    this.ormRepository = getRepository(Document);
  }

  public async create({ type, path }: ICreateDocumentDTO): Promise<Document> {
    const document = this.ormRepository.create({ type, path });

    await this.ormRepository.save(document);

    return document;
  }
}
