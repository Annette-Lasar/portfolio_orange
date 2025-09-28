import { Routes } from '@angular/router';
import { MainContent } from './main-content/main-content.js';
import { PrivacyPolicy } from './legal/privacy-policy/privacy-policy.js';
import { Imprint } from './legal/imprint/imprint.js';

export const routes: Routes = [
  { path: '', component: MainContent },
  { path: 'privacy-policy', component: PrivacyPolicy },
  { path: 'imprint', component: Imprint },
];
