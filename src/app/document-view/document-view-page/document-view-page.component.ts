import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentService } from 'src/app/shared/document.service';

@Component({
  selector: 'app-document-view-page',
  templateUrl: './document-view-page.component.html',
  styleUrls: ['./document-view-page.component.css']
})
export class DocumentViewPageComponent implements OnInit {

  id: number;
  files = [];
  @Output() swapClick = new EventEmitter<any>();

  constructor(private documentService: DocumentService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // gets the document index from the URL
    this.id = this.route.snapshot.params['id'] - 1; 
    // gets the files from the document to know how many pages to display
    this.files = this.documentService.documents[this.id].files; 
  }

  onSwap() {
    this.swapClick.emit();
  }
}
