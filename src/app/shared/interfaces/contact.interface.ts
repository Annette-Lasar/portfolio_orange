export interface ContactFormErrors {
  errorMissingName: string;
  errorMissingEmail: string;
  errorMissingMessage: string;
  errorPrivacyPolicyUnchecked: string;
}

export interface ContactForm {
  name: string;
  namePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  message: string;
  messagePlaceholder: string;
  messageCharacters: string;
  privacyLinkAccessibility: string;
  submitAccessibility: string;
  submit: string;
  errors: ContactFormErrors;
}

export interface ContactContent {
  heading: string;
  subHeading: string;
  introduction: string;
  acceptPrivacyPolicy: string;
  form: ContactForm;
}

export interface ContactData {
  name: string;
  email: string;
  message: string;
}
