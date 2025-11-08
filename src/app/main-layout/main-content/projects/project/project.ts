import { Component } from '@angular/core';
import { PageContentService } from '../../../../shared/services/page-content.service.js';

@Component({
  selector: 'port-project',
  imports: [],
  templateUrl: './project.html',
  styleUrl: './project.scss',
})
export class Project {
  constructor(public pageContentService: PageContentService) {}

  ngOnInit(): void {
    this.pageContentService.loadVariableContent('de');
    this.pageContentService.loadStaticContent();
  }
}
