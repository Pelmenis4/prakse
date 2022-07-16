import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentService } from 'src/app/shared/document.service';

@Component({
  selector: 'app-dashboard-document',
  templateUrl: './dashboard-document.component.html',
  styleUrls: ['./dashboard-document.component.css']
})
export class DashboardDocumentComponent implements OnInit {

  @Input() document
  @Input() index: number;
  @Input() currentPage: number;
  @Input() currentDocumentsLength: number;

  //not using this but leaving it for reference.
  // @ViewChild('border') divElementRef: ElementRef;
  // borderElement: HTMLElement;

  constructor(private router: Router, private documentService: DocumentService) { }

  decisionAction: string

  ngOnInit() {
    // translates the decisionAction.
    this.decisionAction = this.documentService.translateDecisionActionToLatvian(this.document.decisionAction);
  }


  
  // navigates to /documents/id route. The id is the index of the document that was selected.
  onDocument() {
    this.router.navigate(['/document', this.currentPage - 9 + this.index]);
  }

  // very bad for now, will improve later.
  // using ngClass for this now in the html.

  // bottomBorder() {
  //   if(this.documentService.documents.length > 10 && this.index < 8) {
  //     this.borderElement = this.divElementRef.nativeElement;
  //     this.borderElement.classList.add('border-bottom');
  //   }
  //   else if(this.index < this.documentService.documents.length - 1) {
  //     this.borderElement = this.divElementRef.nativeElement;
  //     this.borderElement.classList.add('border-bottom');
  //   }
  // }

}
