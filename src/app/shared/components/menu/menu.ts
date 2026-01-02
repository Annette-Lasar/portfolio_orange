import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PageContentService } from '../../services/page-content.service.js';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs';
import { Observable } from 'rxjs';
import { ScrollService } from '../../services/scroll.service.js';

@Component({
  selector: 'port-menu',
  imports: [CommonModule, MatIconModule, MatButtonModule, MatToolbarModule],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu implements OnInit {
  isDesktop$!: Observable<boolean>;
  isMobile$!: Observable<boolean>;

  constructor(
    public pageContentService: PageContentService,
    private breakpointObserver: BreakpointObserver,
    private scrollService: ScrollService
  ) {}

  ngOnInit(): void {
    this.isDesktop$ = this.defineDesktopSize();
    this.isMobile$ = this.defineMobileSize();
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

  get mergedContent$() {
    return this.pageContentService.mergedContent$;
  }
}
