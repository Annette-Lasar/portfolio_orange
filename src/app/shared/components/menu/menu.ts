// import { Component, Input, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { BreakpointObserver } from '@angular/cdk/layout';
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';
// import { MatToolbarModule } from '@angular/material/toolbar';

// import { Observable, combineLatest } from 'rxjs';
// import { map, shareReplay } from 'rxjs/operators';

// import { PageContentService } from '../../services/page-content.service';
// import { ScrollService } from '../../services/scroll.service';
// import { MenuContext } from '../../type-aliases/type-aliases';

// @Component({
//   selector: 'port-menu',
//   standalone: true,
//   imports: [CommonModule, MatIconModule, MatButtonModule, MatToolbarModule],
//   templateUrl: './menu.html',
//   styleUrl: './menu.scss',
// })
// export class Menu implements OnInit {
//   @Input({ required: true }) context!: MenuContext;

//   vm$!: Observable<{
//     content: any;
//     showFloating: boolean;
//     showAside: boolean;
//   }>;

//   constructor(
//     private pageContentService: PageContentService,
//     private breakpointObserver: BreakpointObserver,
//     private scrollService: ScrollService
//   ) {}

// ngOnInit(): void {
//   const isDesktop$ = this.breakpointObserver.observe(['(min-width: 48em)']).pipe(
//     map((result) => result.matches),
//     shareReplay(1)
//   );

//   const isMobile$ = isDesktop$.pipe(map((isDesktop) => !isDesktop));

//   const heroVisible$ = this.scrollService.heroVisible$;

//   const showFloatingMenu$ = combineLatest([isMobile$, heroVisible$]).pipe(
//     map(([isMobile, heroVisible]) => isMobile || heroVisible)
//   );

//   const showAsideMenu$ = combineLatest([isMobile$, heroVisible$]).pipe(
//     map(([isMobile, heroVisible]) => !isMobile && !heroVisible)
//   );

//   this.vm$ = combineLatest([
//     this.pageContentService.mergedContent$,
//     showFloatingMenu$,
//     showAsideMenu$,
//   ]).pipe(
//     map(([content, showFloating, showAside]) => ({
//       content,
//       showFloating,
//       showAside,
//     }))
//   );
// }
// }

import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { Observable, combineLatest } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { PageContentService } from '../../services/page-content.service';
import { ScrollService } from '../../services/scroll.service';
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
  isDesktop$!: Observable<boolean>;
  isMobile$!: Observable<boolean>;
  heroVisible$!: Observable<boolean>;
  showFloatingMenu$!: Observable<boolean>;
  showAsideMenu$!: Observable<boolean>;
  @Input({ required: true }) context!: MenuContext;

  vm$!: Observable<MenuViewModel>;

  constructor(
    private pageContentService: PageContentService,
    private breakpointObserver: BreakpointObserver,
    private scrollService: ScrollService
  ) {}

  ngOnInit(): void {
    this.isDesktop$ = this.defineDesktopSize();
    this.isMobile$ = this.defineMobileSize();
    this.heroVisible$ = this.scrollService.heroVisible$;
    this.showFloatingMenu$ = this.defineIfFloatingMenuShallBeRendered();
    this.showAsideMenu$ = this.defineIfAsideMenuShallBeRendered();

    this.vm$ = this.createViewModel();
    console.log('ViewModel: ', this.vm$);

    this.heroVisible$.subscribe((v) => console.log('heroVisible$', v));
    this.isMobile$.subscribe((v) => console.log('isMobile$', v));
    this.showAsideMenu$.subscribe((v) => console.log('showAside$', v));
  }

  defineDesktopSize(): Observable<boolean> {
    return this.breakpointObserver.observe(['(min-width: 48em)']).pipe(
      map((result) => result.matches),
      shareReplay(1)
    );
  }

  defineMobileSize(): Observable<boolean> {
    return this.isDesktop$.pipe(map((isDesktop) => !isDesktop));
  }

  defineIfFloatingMenuShallBeRendered(): Observable<boolean> {
    return combineLatest([this.isMobile$, this.heroVisible$]).pipe(
      map(([isMobile, heroVisible]) => isMobile || heroVisible)
    );
  }

  defineIfAsideMenuShallBeRendered(): Observable<boolean> {
    return combineLatest([this.isMobile$, this.heroVisible$]).pipe(
      map(([isMobile, heroVisible]) => !isMobile && !heroVisible)
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
      }))
    );
  }
}
