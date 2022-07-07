
enum DecisionActionEnum {
  FORCE_EXECUTION = 'FORCE_EXECUTION',
  NOTIFICATION_TO_APPLICANT = 'NOTIFICATION_TO_APPLICANT',
  NOTIFICATION_TO_COURT = 'NOTIFICATION_TO_COURT',
  REFUSE_TO_ACCEPT = 'REFUSE_TO_ACCEPT',
  STOP_ENFORCEMENT_PROCEEDINGS = "STOP_ENFORCEMENT_PROCEEDINGS",
  TERMINATE_THE_PROCEEDINGS = 'TERMINATE_THE_PROCEEDINGS',
  WITHOUT_CONSIDERATION = 'WITHOUT_CONSIDERATION',
}

enum DecisionActionTranslations {
  FORCE_EXECUTION = 'Nodot piespiedu izpildīšanai',
  NOTIFICATION_TO_APPLICANT = 'Paziņojums pieteicējam',
  NOTIFICATION_TO_COURT = 'Paziņojums tiesai',
  REFUSE_TO_ACCEPT = 'Atteikt pieņemt',
  STOP_ENFORCEMENT_PROCEEDINGS = "Apturēt izpildu lietvedību",
  TERMINATE_THE_PROCEEDINGS = 'Izbeigt tiesvedību',
  WITHOUT_CONSIDERATION = 'Atstāt Bez izskatīšanas',
}
// DecisionActionTranslations['FORCE_EXECUTION']

enum FieldNameEnum {
  COURT = 'court',
  NAME = 'name',
  PERSONAL_CODE = 'personalCode',
  CASE_NUMBER = 'caseNumber',
  LOCATION = 'location',
  DATE = 'date',
  CONTRACT_NUMBER = 'contractNumber',
  CONTRACT_DATE = 'contractDate',
  DEBT_AMOUNT = 'debtAmount',
  DEBT_CURRENCY = 'debtCurrency',
  DECISION = 'decision',
}

function getCCBNote(decisionAction: DecisionActionEnum, documentValues: any[] = []): string {

  // shorthand function for getting document value based on name
  const getValue = function (fieldName: FieldNameEnum): string {
    return documentValues.find(dv => dv.fieldName === fieldName)?.value ?? '';
  }

  let ccbNote = ``;

  // return empty string if we didn't receive decision action
  if (!decisionAction) return '';

  // start the note with "Saņemts"
  ccbNote = `Saņemts`;

  if (decisionAction === DecisionActionEnum.STOP_ENFORCEMENT_PROCEEDINGS) {
    // if decision action is STOP_ENFORCEMENT_PROCEEDINGS, then we add "ZTI" and contractor name
    ccbNote += ` ZTI ${getValue(FieldNameEnum.NAME)}`;
  } else {
    // otherwise we add court and "tiesas"
    ccbNote += ` ${getValue(FieldNameEnum.COURT)} tiesas`;
  }

  // add the documents date
  ccbNote += ` ${getValue(FieldNameEnum.DATE)}`;

  // if action is not one of NOTIFICATION_TO_APPLICANT or NOTIFICATION_TO_COURT, then add "Nr. " case number and "Lēmums -"
  if (![DecisionActionEnum.NOTIFICATION_TO_APPLICANT, DecisionActionEnum.NOTIFICATION_TO_COURT].includes(decisionAction)) {
    ccbNote += ` Nr. ${getValue(FieldNameEnum.CASE_NUMBER)} Lēmums -`;
  }

  // add the decision "ACC" and the contract number
  ccbNote += ` ${getValue(FieldNameEnum.DECISION)} ACC ${getValue(FieldNameEnum.CONTRACT_NUMBER)}`;

  return ccbNote;
}