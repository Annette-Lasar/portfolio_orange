import { Injectable, NgZone } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { filter, first } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  constructor(
    private zone: NgZone,
    private router: Router,
    private viewportScroller: ViewportScroller,
  ) {}

  scrollTo(sectionId: string): void {
    const isOnMainPage = this.router.url === '/' || this.router.url === '';

    if (isOnMainPage) {
      this.scrollNow(sectionId);
      return;
    }

    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        first(),
      )
      .subscribe(() => {
        // WICHTIG: kleiner Delay, damit Outlet final ist
        setTimeout(() => this.scrollNow(sectionId), 0);
      });

    this.router.navigate(['/']);
  }

  // private scrollNow(sectionId: string): void {
  //   const el = document.getElementById(sectionId);
  //   if (!el) return;

  //   const y = el.getBoundingClientRect().top;

  //   this.viewportScroller.scrollToPosition([0, y + this.viewportScroller.getScrollPosition()[1]]);
  // }

  private scrollNow(sectionId: string): void {
    const el = document.getElementById(sectionId);
    if (!el) return;

    // 1️⃣ warten bis Angular stabil
    this.zone.onStable.pipe(first()).subscribe(() => {
      // 2️⃣ einen Frame warten, bis Layout-Umschaltungen durch sind
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const y = el.getBoundingClientRect().top + window.pageYOffset;

          window.scrollTo({
            top: y,
            behavior: 'smooth',
          });
        });
      });
    });
  }
}
