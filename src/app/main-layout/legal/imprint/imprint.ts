import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreakpointObserver } from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { RouterModule } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MergedContent } from '../../../shared/interfaces/merged-content.interface';
import { PageContentService } from '../../../shared/services/page-content.service';
import { MOBILE_QUERY } from '../../../shared/data/general-data';


@Component({
  selector: 'port-imprint',
  imports: [CommonModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './imprint.html',
  styleUrl: './imprint.scss',
})
export class Imprint implements OnInit {
  mergedContent$!: Observable<MergedContent | null>;
  private pageContentService = inject(PageContentService);
  private breakpointObserver = inject(BreakpointObserver);

  isMobile$ = this.breakpointObserver.observe([MOBILE_QUERY]).pipe(map((result) => result.matches));

  ngOnInit(): void {
    this.pageContentService.loadVariableContent('de');
    this.pageContentService.loadStaticContent();

    this.mergedContent$ = this.pageContentService.mergedContent$;
  }
}
