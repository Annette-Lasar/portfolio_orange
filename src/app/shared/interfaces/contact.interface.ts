/* Note: There is no static information for the contact section. 
All content needs to be translated. */

/* Basic structure of content for contact section */
export interface VariableContactContent {
  heading: string;
  subHeading: string;
  introduction: string;
  acceptPrivacyPolicy: string;
  acceptDataProcessing: string;
  form: ContactForm;
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

export interface ContactFormErrors {
  errorMissingName: string;
  errorMissingEmail: string;
  errorMissingMessage: string;
  errorPrivacyPolicyUnchecked: string;
}

