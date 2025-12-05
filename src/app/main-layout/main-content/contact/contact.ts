import { Component, OnInit } from '@angular/core';
import { ContactForm } from './contact-form/contact-form.js';
import { PageContentService } from '../../../shared/services/page-content.service.js';

@Component({
  selector: 'port-contact',
  imports: [ContactForm],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact implements OnInit {
  constructor(public pageContentService: PageContentService) {}

  ngOnInit(): void {
    this.pageContentService.loadVariableContent('de');
    this.pageContentService.loadStaticContent();
  }
}
