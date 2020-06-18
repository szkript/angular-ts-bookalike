import {Component, OnInit} from '@angular/core';
import {PdfReaderService} from 'src/pdf-reader.service';
import * as pdfjsLib from 'pdfjs-dist';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'pdf2book';

  constructor(private pdfReader: PdfReaderService) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'assets/pdfjs/pdf.worker.js';
  }

  ngOnInit() {
    const canvasContainer = document.getElementById('bookWrapper');
    let loadingTask = pdfjsLib.getDocument('./assets/pdf/turnjs4-api-docs.pdf');

    function createCanvas(i: number) {
      let canvas = document.createElement('canvas') as HTMLCanvasElement;
      canvas.setAttribute('id', `the-canvas-${i}`);
      canvas.setAttribute('width', `400`);
      canvas.setAttribute('height', `600`);
      return canvas
    }

    loadingTask.promise.then(function (pdf) {
      for (let i = 1; i < pdf.numPages; i++) {
        pdf.getPage(i).then(function (page) {
          let scale = 1.5;
          let viewport = page.getViewport({scale: scale});

          let canvas = createCanvas(i);
          let context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          let renderContext = {
            canvasContext: context,
            viewport: viewport
          };
          page.render(renderContext);
          canvasContainer.appendChild(canvas);
        })
      }
    })
  }
}

