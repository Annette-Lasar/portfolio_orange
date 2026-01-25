export interface ImprintContent {
  heading: string;
  subHeading1: string;
  subHeading2: string;
  imprintOriginText: string;
  imprintOriginLink: string;
}

export interface PrivacyResponsible {
  title: string;
  text: string;
}

export interface PrivacyHosting {
  title: string;
  text: string;
  dataTypes: string[];
  legalBasis: string;
  purpose: string;
}

export interface PrivacyContact {
  title: string;
  text: string;
  dataTypes: string[];
  legalBasis: string;
  storageDuration: string;
}

export interface PrivacyDownloads {
  title: string;
  text: string;
}

export interface PrivacyLinks {
  title: string;
  text: string;
}

export interface PrivacyRights {
  title: string;
  items: string[];
}

export interface PrivacySecurity {
  title: string;
  text: string;
}

export interface PrivacyChanges {
  title: string;
  text: string;
}

export interface PrivacyPolicyContent {
  heading: string;
  asOf: string;
  responsible: PrivacyResponsible;
  hosting: PrivacyHosting;
  contactForm: PrivacyContact;
  downloads: PrivacyDownloads;
  externalLinks: PrivacyLinks;
  rights: PrivacyRights;
  security: PrivacySecurity;
  changes: PrivacyChanges;
}

export interface LegalContent {
  imprint: ImprintContent;
  privacy: PrivacyPolicyContent;
}
