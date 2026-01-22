import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { Observable, combineLatest } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { PageContentService } from '../../services/page-content.service';
import { SectionVisibilityService } from '../../services/section-visibility.service';
import { ActiveSectionService } from '../../services/active-section.service';

import { MenuContext } from '../../type-aliases/type-aliases';
import { MenuViewModel } from '../../interfaces/menu.interface';

import { LanguageDropdown } from '../language-dropdown/language-dropdown';

@Component({
  selector: 'port-menu',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatToolbarModule, LanguageDropdown],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu implements OnInit {
  private activeSectionService = inject(ActiveSectionService);

  isDesktop$!: Observable<boolean>;
  isMobile$!: Observable<boolean>;
  heroVisible$!: Observable<boolean>;
  showFloatingMenu$!: Observable<boolean>;
  showAsideMenu$!: Observable<boolean>;
  vm$!: Observable<MenuViewModel>;
  activeSection$ = this.activeSectionService.activeSection$;

  @Input({ required: true }) context!: MenuContext;

  constructor(
    private pageContentService: PageContentService,
    private breakpointObserver: BreakpointObserver,
    private sectionVisibilityService: SectionVisibilityService,
  ) {}

  ngOnInit(): void {
    this.isDesktop$ = this.defineDesktopSize();
    this.isMobile$ = this.defineMobileSize();
    this.heroVisible$ = this.sectionVisibilityService.heroVisible$;
    this.showFloatingMenu$ = this.defineIfFloatingMenuShallBeRendered();
    this.showAsideMenu$ = this.defineIfAsideMenuShallBeRendered();

    this.vm$ = this.createViewModel();
    // console.log('ViewModel: ', this.vm$);

    // this.heroVisible$.subscribe((v) => console.log('heroVisible$', v));
    // this.isMobile$.subscribe((v) => console.log('isMobile$', v));
    // this.showAsideMenu$.subscribe((v) => console.log('showAside$', v));
  }

  defineDesktopSize(): Observable<boolean> {
    return this.breakpointObserver.observe(['(min-width: 48em)']).pipe(
      map((result) => result.matches),
      shareReplay(1),
    );
  }

  defineMobileSize(): Observable<boolean> {
    return this.isDesktop$.pipe(map((isDesktop) => !isDesktop));
  }

  defineIfFloatingMenuShallBeRendered(): Observable<boolean> {
    return combineLatest([this.isMobile$, this.heroVisible$]).pipe(
      map(([isMobile, heroVisible]) => isMobile || heroVisible),
    );
  }

  defineIfAsideMenuShallBeRendered(): Observable<boolean> {
    return combineLatest([this.isMobile$, this.heroVisible$]).pipe(
      map(([isMobile, heroVisible]) => !isMobile && !heroVisible),
    );
  }

  createViewModel(): Observable<MenuViewModel> {
    return combineLatest([
      this.pageContentService.mergedContent$,
      this.showFloatingMenu$,
      this.showAsideMenu$,
    ]).pipe(
      map(([content, showFloating, showAside]) => ({
        content,
        showFloating,
        showAside,
      })),
    );
  }
}
