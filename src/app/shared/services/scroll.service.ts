import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  private heroVisibleSubject = new BehaviorSubject<boolean>(true);
  heroVisible$: Observable<boolean> = this.heroVisibleSubject.asObservable();

  constructor() {}

  // Diese Methode wird die HeroSection später registrieren
  registerHeroElement(element: HTMLElement) {
    // Wird morgen implementiert
  }
}
