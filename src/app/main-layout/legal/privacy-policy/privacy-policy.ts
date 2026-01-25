import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { MergedContent } from '../../../shared/interfaces/merged-content.interface';

import { PageContentService } from '../../../shared/services/page-content.service';
import { BreakpointObserver } from '@angular/cdk/layout';


@Component({
  selector: 'port-privacy-policy',
  imports: [CommonModule],
  templateUrl: './privacy-policy.html',
  styleUrl: './privacy-policy.scss',
})
export class PrivacyPolicy implements OnInit{
  mergedContent$!: Observable<MergedContent | null>;
  private pageContentService = inject(PageContentService);
  // private breakpointObserver = inject(BreakpointObserver);

  ngOnInit(): void {
    this.pageContentService.loadVariableContent('de');
    this.pageContentService.loadStaticContent();

    this.mergedContent$ = this.pageContentService.mergedContent$;
  }
}
