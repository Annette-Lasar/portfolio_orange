import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PageContentService } from '../../../shared/services/page-content.service.js';
import { SectionVisibilityService } from '../../../shared/services/section-visibility.service.js';
import { Menu } from '../../../shared/components/menu/menu.js';
import { MergedContent } from '../../../shared/interfaces/merged-content.interface.js';
import { Observable, take, filter } from 'rxjs';
import { LanguageDropdown } from '../../../shared/components/language-dropdown/language-dropdown.js';

@Component({
  selector: 'port-hero',
  imports: [CommonModule, MatButtonModule, Menu, LanguageDropdown],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero implements OnInit, AfterViewInit {
  mergedContent$!: Observable<MergedContent | null>;

  @ViewChild('heroSection', { static: true })
  heroElement!: ElementRef<HTMLElement>;

  constructor(
    public pageContentService: PageContentService,
    private sectionVisibilityService: SectionVisibilityService
  ) {}

  ngOnInit(): void {
    this.pageContentService.loadVariableContent('de');
    this.initializeMergedContent();
    this.showMergedContent();
  }

  ngAfterViewInit(): void {
    this.sectionVisibilityService.registerHeroElement(this.heroElement.nativeElement);
  }

  initializeMergedContent(): void {
    this.mergedContent$ = this.pageContentService.mergedContent$;
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
