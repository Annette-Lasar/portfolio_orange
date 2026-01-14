import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from './project/project.js';
import { PageContentService } from '../../../shared/services/page-content.service.js';
import { MergedProject } from '../../../shared/interfaces/project.interface.js';
import { MergedContent } from '../../../shared/interfaces/merged-content.interface.js';
import { Observable, filter, take } from 'rxjs';
import { ProjectDetail } from './project-detail/project-detail.js';

@Component({
  selector: 'port-projects',
  imports: [CommonModule, Project, ProjectDetail],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects implements OnInit {
  currentIndex: number | null = null;
  mergedContent$!: Observable<MergedContent | null>;
  frontendProjects$!: Observable<MergedProject | null>;
  backendProjects$!: Observable<MergedProject | null>;
  constructor(public pageContentService: PageContentService) {}

  ngOnInit(): void {
    this.pageContentService.loadVariableContent('de');
    this.pageContentService.loadStaticContent();

    this.mergedContent$ = this.pageContentService.mergedContent$;
    this.showMergedContent();
  }

  showMergedContent() {
    this.mergedContent$
      .pipe(
        filter((value) => value !== null),
        take(1)
      )
      .subscribe(console.log);
  }

  openDetail(index: number) {
    this.currentIndex = index;
  }

  closeDetail() {
    this.currentIndex = null;
  }
}
