import { Component, OnInit } from '@angular/core';
import { PdfReaderService } from 'src/pdf-reader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'pdf2book';

  constructor(private pdfReader: PdfReaderService) { }

  ngOnInit() {
    this.pdfReader.readPdf('./assets/pdf/turnjs4-api-docs.pdf')
      .then(text => text.forEach(x => console.log(x)), reason => console.error(reason));
  }
}
