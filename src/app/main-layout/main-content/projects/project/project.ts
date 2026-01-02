import { Component, Input, OnChanges } from '@angular/core';
import { PageContentService } from '../../../../shared/services/page-content.service.js';
import { MergedProject } from '../../../../shared/interfaces/project.interface.js';

@Component({
  selector: 'port-project',
  imports: [],
  templateUrl: './project.html',
  styleUrl: './project.scss',
})
export class Project implements OnChanges {
  technologies: string[] = [];
  @Input() project!: MergedProject;

  constructor(public pageContentService: PageContentService) {}

  ngOnChanges() {
    this.technologies = this.project.technologies ?? [];
  }
}
