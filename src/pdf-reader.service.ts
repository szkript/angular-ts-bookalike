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
