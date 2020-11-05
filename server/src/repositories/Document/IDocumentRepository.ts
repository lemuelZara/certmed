import ICreateDocumentDTO from '../../dto/ICreateDocumentDTO';
import { Document } from '../../entities/Document';

export default interface IDocumentRepository {
  create(data: ICreateDocumentDTO): Promise<Document>;
}
