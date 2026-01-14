import { Component, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { PageContentService } from '../../../../shared/services/page-content.service.js';
import { Technology } from '../../../../shared/interfaces/project.interface.js';
import { MergedProject } from '../../../../shared/interfaces/project.interface.js';
import { MergedContent } from '../../../../shared/interfaces/merged-content.interface.js';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'port-project',
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './project.html',
  styleUrl: './project.scss',
})
export class Project implements OnChanges {
  technologies: Technology[] = [];

  @Input() project!: MergedProject;
  @Input() content!: MergedContent;

  constructor(public pageContentService: PageContentService) {}

  ngOnChanges() {
    this.technologies = this.project.technologies ?? [];
  }
}
