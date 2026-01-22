import {
  Component,
  ElementRef,
  ViewChildren,
  QueryList,
  AfterViewInit,
  inject,
} from '@angular/core';
import { Hero } from './hero/hero.js';
import { About } from './about/about.js';
import { Projects } from './projects/projects.js';
import { Feedback } from './feedback/feedback.js';
import { Cv } from './cv/cv.js';
import { Contact } from './contact/contact.js';
import { Menu } from '../../shared/components/menu/menu.js';
import { ActiveSectionService } from '../../shared/services/active-section.service.js';

@Component({
  selector: 'port-main-content',
  imports: [Hero, About, Projects, Feedback, Cv, Contact, Menu],
  templateUrl: './main-content.html',
  styleUrl: './main-content.scss',
})
export class MainContent implements AfterViewInit {
  private activeSectionService = inject(ActiveSectionService);

  @ViewChildren('contentSection', { read: ElementRef })
  contentSections!: QueryList<ElementRef<HTMLElement>>;

  private observer!: IntersectionObserver;

  ngAfterViewInit(): void {
    this.setupObserver();
    console.log('Sections found:', this.contentSections.length);
  }

  setupObserver() {
    this.observer = new IntersectionObserver((entries) => this.handleIntersections(entries), {
      root: null,
      threshold: [0.3, 0.6],
    });

    this.contentSections.forEach((section) => this.observer.observe(section.nativeElement));
  }

  private handleIntersections(entries: IntersectionObserverEntry[]): void {
    const visibleEntries = entries.filter((entry) => entry.isIntersecting);

    if (visibleEntries.length === 0) return;

    const mostVisible = visibleEntries[0];
    const sectionId = mostVisible.target.id;

    this.activeSectionService.setActiveSection(sectionId);
  }
}
