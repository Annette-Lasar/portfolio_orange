import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  inject,
  EnvironmentInjector,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule, MatFormField } from '@angular/material/form-field';
import { PageContentService } from '../../../../shared/services/page-content.service.js';
import { LinkifyPrivacyPipe } from '../../../../shared/pipes/linkify-privacy.pipe.js';
import { MergedContent } from '../../../../shared/interfaces/merged-content.interface.js';
import { Observable } from 'rxjs';

@Component({
  selector: 'port-contact-form',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
    LinkifyPrivacyPipe,
  ],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
})
export class ContactForm implements OnInit {
  mergedContent$!: Observable<MergedContent | null>;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  private injector = inject(EnvironmentInjector);
  @ViewChildren(MatFormField) fields!: QueryList<MatFormField>;

  constructor(
    public pageContentService: PageContentService,
    private el: ElementRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pageContentService.loadVariableContent('de');
    this.pageContentService.loadStaticContent();

    this.mergedContent$ = this.pageContentService.mergedContent$;
  }
}
