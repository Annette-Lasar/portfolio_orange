import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private heroVisibleSubject = new BehaviorSubject<boolean>(false);
  heroVisible$: Observable<boolean> = this.heroVisibleSubject.asObservable();
  private observer?: IntersectionObserver;

  constructor() {}

  registerHeroElement(element: HTMLElement): void {
    this.observer?.disconnect();

    this.observer = new IntersectionObserver(
      ([entry]) => {
        this.heroVisibleSubject.next(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.3,
      }
    );

    this.observer.observe(element);
  }
}
