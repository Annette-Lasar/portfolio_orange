export interface StaticGeneralInfos {
  candidateFirstName: string;
  candidateLastName: string;
  candidateAddress: string;
  candidateTownWithZIP: string;
  candidateEmail: string;
  year: string;
  candidatePhoneNumberNormal: string;
  candidatePhoneNumberNarrow: string;
  candidateImg01: string;
  candidateImg02: string;
  closeX: string;
  arrowLeft: string;
  arrowRight: string;
  arrowHorizontal: string;
}

export interface GeneralInfos extends StaticGeneralInfos {
  candidateImgAlt: string;
  mainNavigationLabel: string;
  currentLanguage: string;
  backToHomepage: string;
  candidateCountry: string;
  emailLabel: string;
  phoneLabel: string;
}
