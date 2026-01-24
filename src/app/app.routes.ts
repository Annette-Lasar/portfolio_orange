import { Routes } from '@angular/router';
import { MainLayout } from './main-layout/main-layout.js';
import { MainContent } from './main-layout/main-content/main-content.js';
import { Legal } from './main-layout/legal/legal.js';
import { Imprint } from './main-layout/legal/imprint/imprint.js';
import { PrivacyPolicy } from './main-layout/legal/privacy-policy/privacy-policy.js';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', component: MainContent },

      {
        path: 'legal',
        component: Legal,
        children: [
          { path: 'imprint', component: Imprint },
          { path: 'privacy', component: PrivacyPolicy },
        ],
      },
    ],
  },
];
