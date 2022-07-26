import { Component, OnInit} from '@angular/core';
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
  document;
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
    this.document = this.documentService.documents[this.id];
    this.decisionAction = this.documentService.translateDecisionActionToLatvian(this.document.decisionAction); // translates the decisionAction
    this.decisionActionCaps = this.documentService.documents[this.id].decisionAction;
    this.decisionActionMessage = getCCBNote(this.decisionActionCaps, this.documentService.documents[this.id].values, this.decisionAction)
    this.changeStatus();
  }


// Translates the values from the document from english to latvian.
  changeStatus() {
    if (this.document.status == "DIGITIZED")
      this.statusMessage = "Digitalizēts"
    else if (this.document.status == "SENT_TO_CCB")
      this.statusMessage = "Nosūtīts uz CCB"
    else
      this.statusMessage = "Not found"
  }

  

  // changes decisionAction based on which radio button is selected.
  onDecision(action: string) {
    this.document.decisionAction = this.documentService.translateDecisionActionToEnglish(action);
  }

  // changes status when the "Sūtīt uz CCB button" is pressed.
  onChangeStatus() {
    this.document.status = "SENT_TO_CCB";
    this.changeStatus();
    this.buttonEnabled = false;
  }

  // conditions to disable the 'Sūtīt uz CCB' button.
  disableButton() {
    if(this.document.personalCode == '' 
    || this.document.name == ''
    || this.document.caseNumber== ''
    || this.document.location == ''
    || this.document.contractNumber == ''
    || this.document.debtAmount == null
    || this.document.court == ''
    || this.document.decision == ''
    || this.statusMessage == 'Nosūtīts uz CCB'
    || this.buttonEnabled == false){
      return true;
    }

  }


}

