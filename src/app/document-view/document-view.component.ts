import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../shared/document.service';

@Component({
  selector: 'app-document-view',
  templateUrl: './document-view.component.html',
  styleUrls: ['./document-view.component.css']
})
export class DocumentViewComponent implements OnInit {

  constructor(private documentService: DocumentService) { }

  currentPage: number;
  swap: boolean = false;

  ngOnInit(): void {
    this.currentPage = this.documentService.currentPage;
  }
  

  onSwap() {
    if(this.swap == false) {
      document.getElementById('view-page').classList.remove('view-page');
      document.getElementById('view-data').classList.remove('document-data');
      document.getElementById('view-data').classList.add('document-data2');
      this.swap = true;
    }
    else {
      document.getElementById('view-page').classList.add('view-page');
      document.getElementById('view-data').classList.remove('document-data2');
      document.getElementById('view-data').classList.add('document-data');
      this.swap = false;
    }
  }
}
