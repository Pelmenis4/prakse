import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentService } from 'src/app/shared/document.service';

@Component({
  selector: 'app-document-view-data',
  templateUrl: './document-view-data.component.html',
  styleUrls: ['./document-view-data.component.css']
})
export class DocumentViewDataComponent implements OnInit {

  id: number;
  documents = [];
  statusMessage: string;
  buttonEnabled: boolean = true;

  // for the radio buttons
  decisionActions = ['Nodot piespiedu izpildīšanai', 'Paziņojums pieteicējam',
  'Paziņojums tiesai', 'Atteikt pieņemt', 'Apturēt izpildu lietvedību',
  'Izbeigt tiesvedību', 'Atstāt Bez izskatīšanas'];

  decisionAction: string;


  
  constructor(private route: ActivatedRoute, private documentService: DocumentService) { }
  
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'] - 1;  //gets the id of the document from the url
    this.documents = this.documentService.documents;
    this.decisionAction = this.documentService.translateDecisionActionToLatvian(this.documents[this.id].decisionAction); // translates the decisionAction
    this.changeStatus();
  }


// Translates the values from the document from english to latvian.
  changeStatus() {
    if (this.documents[this.id].status == "DIGITIZED")
      this.statusMessage = "Digitalizēts"
    else if (this.documents[this.id].status == "SENT_TO_CCB")
      this.statusMessage = "Nosūtīts uz CCB"
    else
      this.statusMessage = "Not found"
  }

  // loads all the data from the selected document
  // loadData() {
  //   this.decisionAction = this.documentService.translateDecisionActionToLatvian(this.documents[this.id].decisionAction);
    // this.personalCode = this.documents[this.id].personalCode;
    // this.name = this.documents[this.id].name;
    // this.caseNumber = this.documents[this.id].caseNumber;
    // this.location = this.documents[this.id].location;
    // this.date = this.documents[this.id].date;
    // this.contractNumber = this.documents[this.id].contractNumber;
    // this.contractDate = this.documents[this.id].contractDate;
    // this.debtAmount = this.documents[this.id].debtAmount;
    // this.debtCurrency = this.documents[this.id].debtCurrency;
    // this.court = this.documents[this.id].court;
    // this.decision = this.documents[this.id].decision;
  // }
  

  // changes decisionAction based on which radio button is selected.
  onDecision(action: string) {
    this.documents[this.id].decisionAction = this.documentService.translateDecisionActionToEnglish(action);
  }

  // changes status when the "Sūtīt uz CCB button" is pressed.
  onChangeStatus() {
    this.documents[this.id].status = "SENT_TO_CCB";
    this.changeStatus();
    this.buttonEnabled = false;
  }
}

