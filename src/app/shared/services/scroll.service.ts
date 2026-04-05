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
        setTimeout(() => this.scrollNow(sectionId), 0);
      });

    this.router.navigate(['/']);
  }

  // private scrollNow(sectionId: string): void {
  //   const el = document.getElementById(sectionId);
  //   if (!el) return;

  //   this.zone.onStable.pipe(first()).subscribe(() => {
  //     requestAnimationFrame(() => {
  //       requestAnimationFrame(() => {
  //         const y = el.getBoundingClientRect().top + window.pageYOffset;

  //         window.scrollTo({
  //           top: y,
  //           behavior: 'smooth',
  //         });
  //       });
  //     });
  //   });
  // }

  private scrollNow(sectionId: string): void {
    const tryScroll = () => {
      const el = document.getElementById(sectionId);
      if (!el) return false;

      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return true;
    };

    let attempts = 0;

    const interval = setInterval(() => {
      const success = tryScroll();
      attempts++;

      if (success || attempts > 10) {
        clearInterval(interval);
      }
    }, 50);
  }
}
