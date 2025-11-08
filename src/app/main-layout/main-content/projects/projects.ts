import { Component, OnInit, effect } from '@angular/core';
import { Project } from './project/project.js';
import { PageContentService } from '../../../shared/services/page-content.service.js';
import { MergedProject } from '../../../shared/interfaces/project.interface.js';

@Component({
  selector: 'port-projects',
  imports: [Project],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects implements OnInit {
  frontendProjects: MergedProject[] = [];
  backendProjects: MergedProject[] = [];
  constructor(public pageContentService: PageContentService) {
    effect(() => {
      const data = this.pageContentService.mergedContent();
      if (data) {
        this.frontendProjects = data.projectInfos.projects.filter((p) => p.category === 'frontend');
        this.backendProjects = data.projectInfos.projects.filter((p) => p.category === 'backend');
      }
    });
  }

  ngOnInit(): void {
    this.pageContentService.loadVariableContent('de');
    this.pageContentService.loadStaticContent();
  }
}
