import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ActiveSectionService {
  private activeSectionSubject = new BehaviorSubject<string | null>(null);

  activeSection$: Observable<string | null> = this.activeSectionSubject.asObservable();

  setActiveSection(id: string) {
    this.activeSectionSubject.next(id);
  }
}
