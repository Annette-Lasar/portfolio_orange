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
import { PageContentService } from '../../shared/services/page-content.service.js';
import { take } from 'rxjs';

@Component({
  selector: 'port-main-content',
  imports: [Hero, About, Projects, Feedback, Cv, Contact, Menu],
  templateUrl: './main-content.html',
  styleUrl: './main-content.scss',
})
export class MainContent implements AfterViewInit {
  private activeSectionService = inject(ActiveSectionService);
  private pageContentService = inject(PageContentService);

  @ViewChildren('contentSection', { read: ElementRef })
  contentSections!: QueryList<ElementRef<HTMLElement>>;

  private observer!: IntersectionObserver;
  private visibilityMap = new Map<string, IntersectionObserverEntry>();
  private resizeObserver!: ResizeObserver;

  ngAfterViewInit(): void {
    this.pageContentService.mergedContent$.pipe(take(1)).subscribe(() => {
      this.setupObserver();
    });
  }

  ngOnDestroy() {
    this.observer?.disconnect();
    this.resizeObserver?.disconnect();
  }

  setupObserver() {
    this.observer = new IntersectionObserver((entries) => this.handleIntersections(entries), {
      threshold: [0.3, 0.6],
    });
    this.initResizeObserver();

    this.contentSections.forEach((section) => this.observer.observe(section.nativeElement));
  }

  private initResizeObserver(): void {
    this.resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const el = entry.target as HTMLElement;

        if (el.offsetHeight > 0) {
          this.observer.observe(el);
          this.resizeObserver.unobserve(el); // optional, aber sauber
        }
      });
    });
  }

  private handleIntersections(entries: IntersectionObserverEntry[]): void {
    entries.forEach((entry) => {
      const id = entry.target.id;

      if (entry.isIntersecting) {
        this.visibilityMap.set(id, entry);
      } else {
        this.visibilityMap.delete(id);
      }
    });

    if (this.visibilityMap.size === 0) return;

    const mostVisible = Array.from(this.visibilityMap.values()).reduce((prev, curr) =>
      curr.intersectionRatio > prev.intersectionRatio ? curr : prev,
    );

    this.activeSectionService.setActiveSection(mostVisible.target.id);
  }
}
