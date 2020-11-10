import ISignProvider from '../../providers/SignProvider/ISignProvider';
import { PDFSignerProvider } from '../../providers/SignProvider/PDFSignerProvider';

interface Request {
  signer: string;
  path_document: string;
  path_certificate: string;
  password_certificate: string;
}

export class SignDocumentService {
  private signProvider: ISignProvider;

  constructor(signProvider: PDFSignerProvider) {
    this.signProvider = signProvider;
  }

  public async execute({
    signer,
    path_document,
    path_certificate,
    password_certificate,
  }: Request): Promise<void> {
    await this.signProvider.sign({
      signer,
      path_document,
      path_certificate,
      password_certificate,
    });
  }
}
