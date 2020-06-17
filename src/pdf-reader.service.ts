import { Injectable } from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';

@Injectable({
  providedIn: 'root'
})
export class PdfReaderService {
  constructor() {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'assets/pdfjs/pdf.worker.js';
  }

  public async readPdf(pdfUrl: string): Promise<Array<string>> {
    const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
    const countPromises = []; // collecting all page promises

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      countPromises.push(textContent.items.map((s) => s.str).join(''));
    }

    return await Promise.all(countPromises);
  }
}
