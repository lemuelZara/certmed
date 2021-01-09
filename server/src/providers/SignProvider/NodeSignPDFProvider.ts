import fs from 'fs';
import path from 'path';
import signpdf from 'node-signpdf';
import htmlpdf from 'html-pdf';
import { plainAddPlaceholder } from 'node-signpdf/dist/helpers';
import pdfmerge from 'easy-pdf-merge';

import ISignDocumentDTO from '../../dto/ISignDocumentDTO';
import ISignProvider from './ISignProvider';

export class NodeSignPDFProvider implements ISignProvider {
  public async sign({
    signer,
    path_document,
    path_certificate,
    password_certificate,
  }: ISignDocumentDTO): Promise<void> {
    const template = path.join(
      __dirname,
      'HtmlPdfTemplate',
      'assets',
      'pdf.html',
    );
    let templateHTML = fs.readFileSync(template, 'utf-8');

    const image = path.join(
      'file://',
      __dirname,
      'HtmlPdfTemplate',
      'assets',
      'secure.svg',
    );
    const stethoscope = path.join(
      'file://',
      __dirname,
      'HtmlPdfTemplate',
      'assets',
      'stethoscope.svg',
    );
    const calendar = path.join(
      'file://',
      __dirname,
      'HtmlPdfTemplate',
      'assets',
      'calendar.svg',
    );

    templateHTML = templateHTML.replace(/{{image}}/g, image);
    templateHTML = templateHTML.replace(/{{doctor}}/g, stethoscope);
    templateHTML = templateHTML.replace(/{{doctor_name}}/g, signer);
    templateHTML = templateHTML.replace(
      /{{sign_date}}/g,
      new Date().toString(),
    );
    templateHTML = templateHTML.replace(/{{date}}/g, calendar);

    htmlpdf
      .create(templateHTML, {
        format: 'A4',
        quality: '75',
      })
      .toFile(
        path.join(__dirname, 'HtmlPdfTemplate', 'signature.pdf'),
        (err, res) => {
          if (err) {
            console.error(err);
          }

          pdfmerge(
            [path_document, res.filename],
            path_document,
            async (errMerge: Error): Promise<void> => {
              if (errMerge) {
                console.log(errMerge);
              }
              let pdfBuffer = fs.readFileSync(path_document);
              const p12Buffer = fs.readFileSync(path_certificate);

              pdfBuffer = plainAddPlaceholder({
                pdfBuffer,
              });

              const signedPDF = await signpdf.sign(pdfBuffer, p12Buffer, {
                passphrase: password_certificate,
              });

              fs.writeFileSync(path_document, signedPDF);
            },
          );
        },
      );
  }
}
