import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { PageContentService } from '../../../shared/services/page-content.service.js';
import { MergedContent } from '../../../shared/interfaces/merged-content.interface.js';
import { Observable } from 'rxjs';


@Component({
  selector: 'port-feedback',
  imports: [CommonModule, MatCardModule],
  templateUrl: './feedback.html',
  styleUrl: './feedback.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Feedback implements OnInit {
  mergedContent$!: Observable<MergedContent | null>;

  constructor(public pageContentService: PageContentService) {}

  ngOnInit(): void {
    this.pageContentService.loadVariableContent('de');
    this.pageContentService.loadStaticContent();

    this.mergedContent$ = this.pageContentService.mergedContent$;
  }
}
