import path from 'path';
import fs from 'fs';
import htmlpdf from 'html-pdf';

export class HtmlPdfTemplate {
  public async createSignature(signer: string): Promise<string> {
    let filename = '';
    const template = path.join(__dirname, 'assets', 'pdf.html');
    let templateHTML = fs.readFileSync(template, 'utf-8');

    const image = path.join('file://', __dirname, 'assets', 'secure.svg');
    const stethoscope = path.join(
      'file://',
      __dirname,
      'assets',
      'stethoscope.svg',
    );
    const calendar = path.join('file://', __dirname, 'assets', 'calendar.svg');

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
      .toFile(path.join(__dirname, 'signature.pdf'), (err, res) => {
        if (err) {
          console.error(err);
        }

        filename = res.filename;
      });

    return filename;
  }
}
