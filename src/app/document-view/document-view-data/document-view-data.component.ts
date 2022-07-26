import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentService } from 'src/app/shared/document.service';
import { getCCBNote } from 'src/app/shared/RequiredData';

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
  decisionActions = ['nodot piespiedu izpildīšanai', 'paziņojums pieteicējam',
  'paziņojums tiesai', 'atteikt pieņemt', 'apturēt izpildu lietvedību',
  'izbeigt tiesvedību', 'atstāt bez izskatīšanas'];

  decisionAction: string;
  decisionActionCaps: string;
  decisionActionMessage: string;


  
  constructor(private route: ActivatedRoute, private documentService: DocumentService,) { }
  
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'] - 1;  //gets the id of the document from the url
    this.documents = this.documentService.documents;
    this.decisionAction = this.documentService.translateDecisionActionToLatvian(this.documents[this.id].decisionAction); // translates the decisionAction
    this.decisionActionCaps = this.documentService.documents[this.id].decisionAction;
    this.decisionActionMessage = getCCBNote(this.decisionActionCaps, this.documentService.documents[this.id].values, this.decisionAction)
    console.log(this.decisionActionMessage);
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

  // conditions to disable the 'Sūtīt uz CCB' button.
  disableButton() {
    if(this.documents[this.id].personalCode == '' 
    || this.documents[this.id].name == ''
    || this.documents[this.id].caseNumber== ''
    || this.documents[this.id].location == ''
    || this.documents[this.id].contractNumber == ''
    || this.documents[this.id].debtAmount == null
    || this.documents[this.id].court == ''
    || this.documents[this.id].decision == ''
    || this.statusMessage == 'Nosūtīts uz CCB'
    || this.buttonEnabled == false){
      return true;
    }

  }


}

