export interface ImprintContent {
  heading: string;
  subHeading1: string;
  subHeading2: string;
  content: string;
  imprintOriginText: string;
  imprintOriginLink: string;
}

export interface PrivacyPolicyContent {
  heading: string;
  content: string;
}

export interface LegalContent {
  imprint: ImprintContent;
  privacyPolicy: PrivacyPolicyContent;
}
