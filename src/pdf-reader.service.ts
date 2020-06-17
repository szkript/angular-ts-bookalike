import { Injectable } from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';

@Injectable({
  providedIn: 'root'
})
export class PdfReaderService {
  constructor() {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'assets/pdfjs/pdf.worker.js';
  }

  public async readPdf(pdfUrl: string): Promise<Array<any>> {
    const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
    let pages = [];
    for (let  i = 1; i < pdf.numPages; i++){
      pdf.getPage(i).then(function (page) {
        let scale = 1.5;
        let viewport = page.getViewport({ scale: scale, });
        let canvas = document.getElementById('the-canvas') as HTMLCanvasElement;
        let context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        let renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        // page.render(renderContext);
        pages.push(renderContext)
      })
    }
    return pages;
    // const countPromises = []; // collecting all page promises
    //
    // for (let i = 1; i <= pdf.numPages; i++) {
    //   const page = await pdf.getPage(i);
    //   const textContent = await page.getTextContent();
    //   countPromises.push(textContent.items.map((s) => s.str).join(''));
    // }
    //
    // return await Promise.all(countPromises);
  }

}
function isCanvas(obj: HTMLCanvasElement | HTMLElement): obj is HTMLCanvasElement {
  return obj.tagName === 'CANVAS';
}
