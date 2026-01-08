import { Component, Input, OnChanges } from '@angular/core';
import { PageContentService } from '../../../../shared/services/page-content.service.js';
import { Technology } from '../../../../shared/interfaces/project.interface.js';
import { MergedProject } from '../../../../shared/interfaces/project.interface.js';
import { MergedContent } from '../../../../shared/interfaces/merged-content.interface.js';
import { ProjectDetail } from './project-detail/project-detail.js';

@Component({
  selector: 'port-project',
  imports: [ProjectDetail],
  templateUrl: './project.html',
  styleUrl: './project.scss',
})
export class Project implements OnChanges {
  technologies: Technology[] = [];
  showDetail = false;

  @Input() project!: MergedProject;
  @Input() content!: MergedContent;

  constructor(public pageContentService: PageContentService) {}

  ngOnChanges() {
    this.technologies = this.project.technologies ?? [];
  }

  openDetail() {
    this.showDetail = true;
    console.log(this.showDetail);
  }

  closeDetail() {
    this.showDetail = false;
  }
}
