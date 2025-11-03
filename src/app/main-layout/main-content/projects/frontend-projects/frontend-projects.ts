import { Component, OnInit, effect } from '@angular/core';
import { PageContentService } from '../../../../shared/services/page-content.service.js';
import { StaticProject } from '../../../../shared/interfaces/project.interface.js';

@Component({
  selector: 'port-frontend-projects',
  imports: [],
  templateUrl: './frontend-projects.html',
  styleUrl: './frontend-projects.scss',
})
export class FrontendProjects implements OnInit {
  frontendProjects: StaticProject[] = [];

  constructor(public pageContentService: PageContentService) {
    effect(() => {
      const data = this.pageContentService.staticContent();
      if (data) {
        this.frontendProjects = data.staticProjectInfos.staticProjects.filter(
          (project) => project.category === 'frontend'
        );
      }
    });
  }

  ngOnInit(): void {
    this.pageContentService.loadVariableContent('de');
    this.pageContentService.loadStaticContent();
  }
}
