import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PageContentService } from '../../../shared/services/page-content.service.js';
import { MergedContent } from '../../../shared/interfaces/merged-content.interface.js';
import { Observable } from 'rxjs';

@Component({
  selector: 'port-cv',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './cv.html',
  styleUrl: './cv.scss',
})
export class Cv implements OnInit {
  mergedContent$!: Observable<MergedContent | null>;

  constructor(public pageContentService: PageContentService) {}

  ngOnInit(): void {
    this.pageContentService.loadVariableContent('de');
    this.pageContentService.loadStaticContent();

    this.mergedContent$ = this.pageContentService.mergedContent$;
  }
}
