import { Component, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from './project/project.js';
import { PageContentService } from '../../../shared/services/page-content.service.js';
import { MergedProject } from '../../../shared/interfaces/project.interface.js';
import { MergedContent } from '../../../shared/interfaces/merged-content.interface.js';
import { Observable, map, filter, take } from 'rxjs';

@Component({
  selector: 'port-projects',
  imports: [CommonModule, Project],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects implements OnInit {
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
}
