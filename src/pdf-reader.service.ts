import { Injectable } from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';

@Injectable({
  providedIn: 'root'
})
export class PdfReaderService {
  constructor() {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'src/assets/pdfjs/pdf.worker.js';
  }
  public readPdf(pdfUrl: string): any{
    pdfjsLib.getDocument(pdfUrl).promise.then(function (pdf) {
      console.log(pdf.numPages)
      return pdf.getPage(1)
    })
  }
}


// public async readPdf(pdfUrl: string): Promise<string> {
//   const pdf = await pdfjsLib.getDocument(pdfUrl);
//   const countPromises = []; // collecting all page promises
//
//   for (let i = 1; i <= pdf._pdfInfo.numPages; i++) {
//   const page = await pdf.getPage(i);
//   const textContent = await page.getTextContent();
//   countPromises.push(textContent.items.map((s) => s.str).join(''));
// }
//
// const pageContents = await Promise.all(countPromises);
// return pageContents.join('');
// }
