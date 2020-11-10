import { sign } from 'pdf-signer';
import fs from 'fs';

import ISignDocumentDTO from '../../dto/ISignDocumentDTO';
import ISignProvider from './ISignProvider';

export class PDFSignerProvider implements ISignProvider {
  public async sign({
    signer,
    path_document,
    path_certificate,
    password_certificate,
  }: ISignDocumentDTO): Promise<void> {
    const document = fs.readFileSync(path_document);
    const certificate = fs.readFileSync(path_certificate);

    const signPdfStream = fs.createWriteStream(path_document);

    const signedPdf = await sign(document, certificate, password_certificate, {
      reason: '2',
      email: '',
      location: '',
      signerName: signer,
      annotationOnPages: [2],
      annotationAppearanceOptions: {
        signatureCoordinates: { left: -10, bottom: 20, right: 310, top: 120 },
        signatureDetails: [
          {
            value: `Assinado por: ${signer}`,
            fontSize: 6,
            transformOptions: {
              rotate: 0,
              space: 1,
              tilt: 0.5,
              xPos: 10,
              yPos: 20,
            },
          },
          {
            value: `Data: ${new Date()}`,
            fontSize: 6,
            transformOptions: {
              rotate: 0,
              space: 1,
              tilt: 0.5,
              xPos: 10,
              yPos: 10,
            },
          },
        ],
      },
    });

    signPdfStream.write(signedPdf);
  }
}
