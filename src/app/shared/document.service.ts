import { Injectable } from "@angular/core";
import { DATA } from "./data";

@Injectable({providedIn: 'root'})
export class DocumentService {

    constructor() {
        // console.log(DATA.documents[0].values.find(value => value.fieldName == 'personalCode')?.value) 
        this.addDocuments(); // the constructor acts as ngOnInIt for a service.
    }

    // stores the current page from the dashboard for navigation purposes.
    public currentPage: number;

    public documents = [];

    
    // this was the old approach. i deleted the DocumentModel because i didnt have use for it anymore.

    // public documents: Document[] = [    // must use values from the data.ts file.
    //     new Document(DATA.documents[0].number,
    //     DATA.documents[0].createdDate,
    //     this.translateDecisionAction(0),
    //     DATA.documents[0].uploadType,
    //     DATA.documents[0].uploadedBy,
    //     DATA.documents[0].values.find(v => v.fieldName == 'caseNumber')?.value,
    //     DATA.documents[0].values.find(v => v.fieldName == 'contractNumber')?.value,
    //     DATA.documents[0].values.find(v => v.fieldName == 'name')?.value,
    //     DATA.documents[0].values.find(v => v.fieldName == 'debtAmount')?.value,
    //     DATA.documents[0].status,
    //     DATA.documents[0].values.find(v => v.fieldName == 'personalCode')?.value,
    //     DATA.documents[0].values.find(v => v.fieldName == 'location')?.value,
    //     DATA.documents[0].values.find(v => v.fieldName == 'date')?.valueAsDate,
    //     DATA.documents[0].values.find(v => v.fieldName == 'contractDate')?.valueAsDate,
    //     DATA.documents[0].values.find(v => v.fieldName == 'debtCurrency')?.value,
    //     DATA.documents[0].values.find(v => v.fieldName == 'court')?.value,
    //     DATA.documents[0].values.find(v => v.fieldName == 'decision')?.value),

    //     new Document(DATA.documents[1].number,
    //     DATA.documents[1].createdDate,
    //     this.translateDecisionAction(1),
    //     DATA.documents[1].uploadType,
    //     DATA.documents[1].uploadedBy,
    //     DATA.documents[1].values.find(v => v.fieldName == 'caseNumber')?.value,
    //     DATA.documents[1].values.find(v => v.fieldName == 'contractNumber')?.value,
    //     DATA.documents[1].values.find(v => v.fieldName == 'name')?.value,
    //     DATA.documents[1].values.find(v => v.fieldName == 'debtAmount')?.value,
    //     DATA.documents[1].status,
    //     DATA.documents[1].values.find(v => v.fieldName == 'personalCode')?.value,
    //     DATA.documents[1].values.find(v => v.fieldName == 'location')?.value,
    //     DATA.documents[1].values.find(v => v.fieldName == 'date')?.valueAsDate,
    //     DATA.documents[1].values.find(v => v.fieldName == 'contractDate')?.valueAsDate,
    //     DATA.documents[1].values.find(v => v.fieldName == 'debtCurrency')?.value,
    //     DATA.documents[1].values.find(v => v.fieldName == 'court')?.value,
    //     DATA.documents[1].values.find(v => v.fieldName == 'decision')?.value),
    // ]

    // adds all the documents from DATA.ts into a document array in this service.
    addDocuments() {
        for(let i = 0; i < DATA.documents.length; i++) {
            let document = {};
            document = {
                number: DATA.documents[i].number,
                createdDate: DATA.documents[i].createdDate,
                decisionAction: DATA.documents[i].decisionAction,
                uploadType: DATA.documents[i].uploadType,
                uploadedBy: DATA.documents[i].uploadedBy,
                caseNumber: DATA.documents[i].values.find(v => v.fieldName == 'caseNumber')?.value,
                contractNumber: DATA.documents[i].values.find(v => v.fieldName == 'contractNumber')?.value,
                name: DATA.documents[i].values.find(v => v.fieldName == 'name')?.value,
                debtAmount: DATA.documents[i].values.find(v => v.fieldName == 'debtAmount')?.value,
                status: DATA.documents[i].status,
                personalCode: DATA.documents[i].values.find(v => v.fieldName == 'personalCode')?.value,
                location: DATA.documents[i].values.find(v => v.fieldName == 'location')?.value,
                date: DATA.documents[i].values.find(v => v.fieldName == 'date')?.valueAsDate,
                contractDate: DATA.documents[i].values.find(v => v.fieldName == 'contractDate')?.valueAsDate,
                debtCurrency: DATA.documents[i].values.find(v => v.fieldName == 'debtCurrency')?.value,
                court: DATA.documents[i].values.find(v => v.fieldName == 'court')?.value,
                decision: DATA.documents[i].values.find(v => v.fieldName == 'decision')?.value,
                files: DATA.documents[i].files,
                values: DATA.documents[i].values
            }
            this.documents.push(document)
        }
    }


    // translates decisionAction to latvian.
    translateDecisionActionToLatvian(decisionAction) {
        if (decisionAction == 'FORCE_EXECUTION')
            return 'nodot piespiedu izpildīšanai';
        else if (decisionAction == 'NOTIFICATION_TO_APPLICANT')
            return 'paziņojums pieteicējam';
        else if (decisionAction == 'NOTIFICATION_TO_COURT')
            return 'paziņojums tiesai';
        else if (decisionAction == 'REFUSE_TO_ACCEPT')
            return 'atteikt pieņemt';
        else if (decisionAction == 'STOP_ENFORCEMENT_PROCEEDINGS')
            return 'apturēt izpildu lietvedību';
        else if (decisionAction == 'TERMINATE_THE_PROCEEDINGS')
            return 'izbeigt tiesvedību';
        else if (decisionAction == 'WITHOUT_CONSIDERATION')
            return 'atstāt bez izskatīšanas';
        else
            return '';
    }

    // translates decisionAction to english from latvian in the document-view-data component.
    translateDecisionActionToEnglish(decisionAction) {
        if (decisionAction == 'nodot piespiedu izpildīšanai')
            return 'FORCE_EXECUTION';
        else if (decisionAction == 'paziņojums pieteicējam')
            return 'NOTIFICATION_TO_APPLICANT';
        else if (decisionAction == 'paziņojums tiesai')
            return 'NOTIFICATION_TO_COURT';
        else if (decisionAction == 'atteikt pieņemt')
            return 'REFUSE_TO_ACCEPT';
        else if (decisionAction == 'apturēt izpildu lietvedību')
            return 'STOP_ENFORCEMENT_PROCEEDINGS';
        else if (decisionAction == 'izbeigt tiesvedību')
            return 'TERMINATE_THE_PROCEEDINGS';
        else if (decisionAction == 'atstāt bez izskatīšanas')
            return 'WITHOUT_CONSIDERATION';
        else
            return '';
    }

}

