import { Component, Input } from '@angular/core';
import { PageContentService } from '../../../../shared/services/page-content.service.js';
import { MergedProject } from '../../../../shared/interfaces/project.interface.js';

@Component({
  selector: 'port-project',
  imports: [],
  templateUrl: './project.html',
  styleUrl: './project.scss',
})
export class Project {
  @Input() project!: MergedProject;

  constructor(public pageContentService: PageContentService) {}
}
