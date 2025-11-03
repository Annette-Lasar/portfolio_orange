import { CommonModule } from '@angular/common';
import { Component, OnInit, effect } from '@angular/core';
import { PageContentService } from '../../../shared/services/page-content.service.js';
import { MatTabsModule } from '@angular/material/tabs';
import { StaticSkillIcon } from '../../../shared/interfaces/about.interface.js';

@Component({
  selector: 'port-about',
  imports: [CommonModule, MatTabsModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements OnInit {
  frontendIcons: StaticSkillIcon[] = [];
  backendIcons: StaticSkillIcon[] = [];

  constructor(public pageContentService: PageContentService) {
    effect(() => {
      const data = this.pageContentService.staticContent();
      if (data) {
        this.frontendIcons = data.staticAboutInfos.staticSkillIcons.filter(
          (icon) => icon.category === 'frontend'
        );
        this.backendIcons = data.staticAboutInfos.staticSkillIcons.filter(
          (icon) => icon.category === 'backend'
        );
      }
    });
  }

  ngOnInit(): void {
    this.pageContentService.loadVariableContent('de');
    this.pageContentService.loadStaticContent();
  }
}
