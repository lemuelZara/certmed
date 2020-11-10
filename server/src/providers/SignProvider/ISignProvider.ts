import ISignDocumentDTO from '../../dto/ISignDocumentDTO';

export default interface ISignProvider {
  sign(data: ISignDocumentDTO): Promise<void>;
}
