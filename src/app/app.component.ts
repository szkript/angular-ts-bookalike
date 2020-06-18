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
    let loadingTask = pdfjsLib.getDocument('./assets/pdf/turnjs4-api-docs.pdf');
    const flipbook = document.getElementById('flipbook');
    for (let x = 1;x < 27;x++){
      flipbook.appendChild(createCanvas());
    }

    function createCanvas() {
      let canvas = document.createElement('canvas') as HTMLCanvasElement;
      canvas.setAttribute('id', `canvas`);
      // canvas.setAttribute('width', `400`);
      // canvas.setAttribute('height', `600`);
      return canvas
    }
    let canvass = document.querySelectorAll('canvas');
    loadingTask.promise.then(function (pdf) {
      for (let i = 1; i < pdf.numPages; i++) {
        pdf.getPage(i).then(function (page) {
          let scale = 1;
          let viewport = page.getViewport({scale: scale});

          let canvas = canvass[i-1];
          let context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          let renderContext = {
            canvasContext: context,
            viewport: viewport
          };
          page.render(renderContext);
        })
      }
    })
  }
}

