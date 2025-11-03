import { Component, OnInit, effect } from '@angular/core';
import { PageContentService } from '../../../../shared/services/page-content.service.js';
import { StaticProject } from '../../../../shared/interfaces/project.interface.js';

@Component({
  selector: 'port-backend-projects',
  imports: [],
  templateUrl: './backend-projects.html',
  styleUrl: './backend-projects.scss'
})
export class BackendProjects implements OnInit{
  backendProjects: StaticProject[] = [];
    constructor(public pageContentService: PageContentService) {
    effect(() => {
      const data = this.pageContentService.staticContent();
      if (data) {
        this.backendProjects = data.staticProjectInfos.staticProjects.filter(
          (project) => project.category === 'backend'
        );
      }
    });
  }


  ngOnInit(): void {
    this.pageContentService.loadVariableContent('de');
    this.pageContentService.loadStaticContent();
  }
}
