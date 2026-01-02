import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PageContentService } from '../../../shared/services/page-content.service.js';
import { Menu } from '../../../shared/components/menu/menu.js';
import { MergedContent } from '../../../shared/interfaces/merged-content.interface.js';
import { Observable } from 'rxjs';
import { take, filter } from 'rxjs';

@Component({
  selector: 'port-hero',
  imports: [CommonModule, MatButtonModule, Menu],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero implements OnInit {
  mergedContent$!: Observable<MergedContent | null>;
  
  constructor(public pageContentService: PageContentService) {}

  ngOnInit(): void {
    this.pageContentService.loadVariableContent('de');
    this.initializeMergedContent();
    this.mergedContent$
  .pipe(filter(value => value !== null), take(1))
  .subscribe(console.log);

  }

  initializeMergedContent():void {
    this.mergedContent$ = this.pageContentService.mergedContent$;
  }
}
