import { Component, Input, OnInit } from '@angular/core';
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
}
