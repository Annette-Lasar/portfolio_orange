import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from './project/project.js';
import { PageContentService } from '../../../shared/services/page-content.service.js';
import { ProjectModel } from '../../../shared/interfaces/project.interface.js';
import { MergedContent } from '../../../shared/interfaces/merged-content.interface.js';
import { Observable, filter, take, Subscription } from 'rxjs';
import { ProjectDetail } from './project-detail/project-detail.js';

@Component({
  selector: 'port-projects',
  imports: [CommonModule, Project, ProjectDetail],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects implements OnInit, OnDestroy {
  currentIndex: number | null = null;
  mergedContent$!: Observable<MergedContent | null>;
  private subscriptions: Subscription = new Subscription();
  projects: ProjectModel[] = [];

  constructor(public pageContentService: PageContentService) {}

  ngOnInit(): void {
    this.pageContentService.loadVariableContent('de');
    this.pageContentService.loadStaticContent();

    this.mergedContent$ = this.pageContentService.mergedContent$;
    this.showMergedContent();
    this.getProjects();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  showMergedContent() {
    this.mergedContent$
      .pipe(
        filter((value) => value !== null),
        take(1),
      )
      .subscribe(console.log);
  }

  getProjects() {
    const subscription = this.mergedContent$
      .pipe(filter((content): content is MergedContent => content !== null))
      .subscribe((content) => {
        this.projects = content.projectInfos.projects;
      });
    this.subscriptions.add(subscription);
  }

  openDetail(index: number) {
    this.currentIndex = index;
  }

  closeDetail() {
    this.currentIndex = null;
  }

  prevOrNextProject(direction: number) {
    if (this.currentIndex == null) return;
    if (this.projects.length === 0) return;

    this.currentIndex =
      (this.currentIndex + direction * 1 + this.projects.length) % this.projects.length;
  }
}
