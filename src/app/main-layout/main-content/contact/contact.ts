import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactForm } from './contact-form/contact-form.js';
import { PageContentService } from '../../../shared/services/page-content.service.js';
import { Observable } from 'rxjs';
import { MergedContent } from '../../../shared/interfaces/merged-content.interface.js';

@Component({
  selector: 'port-contact',
  imports: [CommonModule, ContactForm],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact implements OnInit {
  mergedContent$!: Observable<MergedContent | null>;

  public pageContentService = inject(PageContentService);

  ngOnInit(): void {
    this.mergedContent$ = this.pageContentService.mergedContent$;
  }
}
