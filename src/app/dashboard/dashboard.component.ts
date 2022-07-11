import { Component, HostListener, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { DocumentService } from '../shared/document.service';
import { DATA } from '../shared/data';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  addDocument = false;

  documentCount: number;  // keeps count of the documents.lenght for the paginator.

  currentDocuments = []  //array of 10 documents that are displayed

  createdDocument;

  currentPage: number;

  
// was trying to make it switch to the correct page when the back button is pressed in the browser, work in progress.
  // @HostListener('window:popstate', ['$event'])
  // onPopState(event) {
  //   this.currentPage = this.route.snapshot.params['pageNumber'];
  //   this.showCurrentDocuments();
  //   console.log(this.currentPage);
  // }

  constructor(private documentService: DocumentService, private router: Router, private route: ActivatedRoute) {}



  ngOnInit(): void {
    //getting the list of documents from the DocumentService and storing them in this component.
    this.documentCount = this.documentService.documents.length;
    this.documentService.currentPage = this.route.snapshot.params['pageNumber'];
    this.currentPage = this.documentService.currentPage;
    this.showCurrentDocuments();
  }

  //changes currently displayed documents to 1-10 document in page 1, 11-20 in page 2 etc.
  //also changes the URL to /dashboard/page/current page.
  onChangePage(page: number) {
    this.router.navigate(['/dashboard/page', page]);
    this.documentService.currentPage = page;
    this.currentPage = this.documentService.currentPage;

    let pages = page * 10;
    this.currentDocuments = [];
    for (let i = 10; i > 0; i--) {
      if(this.documentService.documents[pages-i] != undefined) {
        this.currentDocuments.push(this.documentService.documents[pages-i]);
      }
    }
  }
  
  onAddDocument() {   //shows the form for adding a document when clicking the add document button
    // if(this.addDocument == false) {
    //   this.addDocument = true;
    // }
    // else {
    //   this.addDocument = false;
    // }
    this.addDocument = !this.addDocument
  }

  onAddDocuments() {  //adds 10 documents to the document array
    for (let i = 0; i < 10; i++) {
      let document;
      document = {
        number: DATA.documents[i % 2].number,
        createdDate: DATA.documents[i % 2].createdDate,
        decisionAction: DATA.documents[i % 2].decisionAction,
        uploadType: DATA.documents[i % 2].uploadType,
        uploadedBy: DATA.documents[i % 2].uploadedBy,
        caseNumber: DATA.documents[i % 2].values.find(v => v.fieldName == 'caseNumber')?.value,
        contractNumber: DATA.documents[i % 2].values.find(v => v.fieldName == 'contractNumber')?.value,
        name: DATA.documents[i % 2].values.find(v => v.fieldName == 'name')?.value,
        debtAmount: DATA.documents[i % 2].values.find(v => v.fieldName == 'debtAmount')?.value,
        status: DATA.documents[i % 2].status,
        personalCode: DATA.documents[i % 2].values.find(v => v.fieldName == 'personalCode')?.value,
        location: DATA.documents[i % 2].values.find(v => v.fieldName == 'location')?.value,
        date: DATA.documents[i % 2].values.find(v => v.fieldName == 'date')?.value,
        contractDate: DATA.documents[i % 2].values.find(v => v.fieldName == 'contractDate')?.value,
        debtCurrency: DATA.documents[i % 2].values.find(v => v.fieldName == 'debtCurrency')?.value,
        court: DATA.documents[i % 2].values.find(v => v.fieldName == 'court')?.value,
        decision: DATA.documents[i % 2].values.find(v => v.fieldName == 'decision')?.value,
        files: DATA.documents[i % 2].files

      }

      this.documentService.documents.push(document);
      
      
    }
    this.showCurrentDocuments();
    this.documentCount = this.documentService.documents.length;
  }


  onSubmit(form: NgForm) {   // creates a new document and adds it to the document array after submitting the form
    console.log(form);
    this.createdDocument = {
     number: form.value.number,
     createdDate: form.value.createdDate,
     decisionAction: form.value.decisionAction,
     uploadType: form.value.uploadType,
     uploadedBy: form.value.uploadedBy,
     caseNumber: form.value.caseNumber,
     contractNumber: form.value.contractNumber,
     name: form.value.name,
     debtAmount: form.value.debtAmount,
     status: form.value.status,
     personalCode: form.value.personalCode,
     location: form.value.location,
     date: form.value.date,
     contractDate: form.value.contractDate,
     debtCurrency: form.value.debtCurrency,
     court: form.value.court,
     decision: form.value.decision
    }
    
    
    this.documentService.documents.push(this.createdDocument);
    this.documentCount = this.documentService.documents.length;
    this.showCurrentDocuments();
    

  }

  // if there are less than 10 documents, adds all of the documents to the currentDocument array,
  // if there are more than 10 documents, adds 10 documents depending on which page youre on.
  showCurrentDocuments() {
    this.currentDocuments = [];
    if (this.documentService.documents.length < 10)
    this.currentDocuments = this.documentService.documents;
    else
    this.currentDocuments = this.documentService.documents.slice(
      this.documentService.currentPage * 10 - 10, this.documentService.currentPage * 10);
  }

  // listens to when the logo on the header is pressed and once its pressed, displays first page of currentDocuments.
  logoClicked() {
    this.documentService.currentPage = 1;
    this.currentPage = 1;
    this.showCurrentDocuments();
  }

  onRefresh() {
    this.router.navigate(['/dashboard/page', this.currentPage]);
    console.log(this.currentPage);
  }
  
  // displays documents are are searched for in the search input.
  searching(searchInput: string) {
    if(searchInput != '') {
      this.currentDocuments = [];
      for(let i = 0; i < this.documentService.documents.length; i++) {
        if(searchInput == this.documentService.documents[i].number) {
          this.currentDocuments.push(this.documentService.documents[i]);
        }
        else if(searchInput == this.documentService.documents[i].caseNumber) {
          this.currentDocuments.push(this.documentService.documents[i]);
        }
      }
    }
    else {
      this.showCurrentDocuments();
    }
  }
}
