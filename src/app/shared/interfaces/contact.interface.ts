export interface ContactForm {
  name: string;
  email: string;
  message: string;
  submit: string;
}

export interface ContactContent {
  heading: string;
  form: ContactForm;
}