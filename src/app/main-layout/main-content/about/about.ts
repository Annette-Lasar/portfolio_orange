import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { PageContentService } from '../../../shared/services/page-content.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MergedContent } from '../../../shared/interfaces/merged-content.interface';
import { Observable, map } from 'rxjs';
import { StaticSkill } from '../../../shared/interfaces/about.interface';

@Component({
  selector: 'port-about',
  standalone: true,
  imports: [CommonModule, MatTabsModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements OnInit {
  mergedContent$!: Observable<MergedContent | null>;
  frontendIcons$!: Observable<StaticSkill[]>;
  backendIcons$!: Observable<StaticSkill[]>;
  skillIconPathPrefix: string = 'img/icons/skills/';
  private pageContentService = inject(PageContentService);

  ngOnInit(): void {
    this.mergedContent$ = this.pageContentService.mergedContent$;
    this.frontendIcons$ = this.filterFrontendIconsFromMergedContent();
    this.backendIcons$ = this.filterBackendIconsFromMergedContent();
  }

  filterFrontendIconsFromMergedContent(): Observable<StaticSkill[]> {
    return this.pageContentService.mergedContent$.pipe(
      map((content) => content?.about.skills.filter((s) => s.category === 'frontend') ?? []),
    );
  }

  filterBackendIconsFromMergedContent(): Observable<StaticSkill[]> {
    return this.pageContentService.mergedContent$.pipe(
      map((content) => content?.about.skills.filter((s) => s.category === 'backend') ?? []),
    );
  }
}
