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

  ngOnInit(): void {
    this.currentPage = this.documentService.currentPage;
  }

}
