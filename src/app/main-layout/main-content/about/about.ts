// import { CommonModule } from '@angular/common';
// import { Component, OnInit, effect } from '@angular/core';
// import { PageContentService } from '../../../shared/services/page-content.service.js';
// import { MatTabsModule } from '@angular/material/tabs';
// import { StaticSkillIcon } from '../../../shared/interfaces/about.interface.js';

// @Component({
//   selector: 'port-about',
//   imports: [CommonModule, MatTabsModule],
//   templateUrl: './about.html',
//   styleUrl: './about.scss',
// })
// export class About implements OnInit {
//   frontendIcons: StaticSkillIcon[] = [];
//   backendIcons: StaticSkillIcon[] = [];

//   constructor(public pageContentService: PageContentService) {
//     effect(() => {
//       const data = this.pageContentService.mergedContent();
//       if (data) {
//         this.frontendIcons = data.about.skills.filter((icon) => icon.category === 'frontend');
//         this.backendIcons = data.about.skills.filter((icon) => icon.category === 'backend');
//       }
//     });
//   }

//   ngOnInit(): void {
//     this.pageContentService.loadVariableContent('de');
//     this.pageContentService.loadStaticContent();
//   }
// }

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageContentService } from '../../../shared/services/page-content.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MergedContent } from '../../../shared/interfaces/merged-content.interface';

@Component({
  selector: 'port-about',
  standalone: true,
  imports: [CommonModule, MatTabsModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements OnInit {
  mergedContent$: any;
  frontendIcons$: any;
  backendIcons$: any;

  constructor(public pageContentService: PageContentService) {}

  ngOnInit(): void {
    
    this.mergedContent$ = this.pageContentService.mergedContent$;

    this.pageContentService.loadVariableContent('de');
    this.pageContentService.loadStaticContent();
  }
}
