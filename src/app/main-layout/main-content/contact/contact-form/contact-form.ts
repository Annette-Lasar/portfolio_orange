import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChildren,
  QueryList,
  effect,
  runInInjectionContext,
  inject,
  EnvironmentInjector,
  ElementRef,
} from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule, MatFormField } from '@angular/material/form-field';
import { PageContentService } from '../../../../shared/services/page-content.service.js';
import { LinkifyPrivacyPipe } from '../../../../shared/pipes/linkify-privacy.pipe.js';

@Component({
  selector: 'port-contact-form',
  imports: [
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
export class ContactForm implements OnInit, AfterViewInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  private injector = inject(EnvironmentInjector);
  @ViewChildren(MatFormField) fields!: QueryList<MatFormField>;

  constructor(
    public pageContentService: PageContentService,
    private el: ElementRef,
    private router: Router
  ) {
    effect(() => {
      const merged = this.pageContentService.mergedContent();
      if (merged) {
        setTimeout(() => {
          this.fields.forEach((field) => {
            (field as any)._foundation?.adapter?.activateFocus?.();
            (field as any)._foundation?.adapter?.deactivateFocus?.();
          });
        });
      }
    });
  }

  ngOnInit(): void {
    this.pageContentService.loadVariableContent('de');
    this.pageContentService.loadStaticContent();
  }

  ngAfterViewInit() {
    runInInjectionContext(this.injector, () => {
      effect(() => {
        const merged = this.pageContentService.mergedContent();
        if (merged) {
          queueMicrotask(() =>
            this.fields.forEach((f) =>
              f._elementRef.nativeElement.classList.add('mat-mdc-form-field')
            )
          );
        }
      });
    });
    this.createPrivacyLink();
  }

  createPrivacyLink() {
    const link: HTMLElement | null = this.el.nativeElement.querySelector('.privacy-link');
    if (link) {
      link.addEventListener('click', (event) => {
        event.stopPropagation();
        event.preventDefault();
        this.router.navigate(['/privacy']);
      });
    }
  }
}

/* import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChildren,
  QueryList,
  effect,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, NgModel } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatFormField } from '@angular/material/form-field';
import { PageContentService } from '../../../../shared/services/page-content.service.js';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ContactData } from '../../../../shared/interfaces/contact.interface.js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'port-contact-form',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCheckboxModule,
  ],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
})
export class ContactForm implements OnInit, AfterViewInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  contactData: ContactData = {
    name: '',
    email: '',
    message: '',
  };

  isActive = {
    name: false,
    email: false,
    message: false,
  };
  checkboxState: boolean = false;
  @ViewChildren(MatFormField) fields!: QueryList<MatFormField>;

  constructor(
    public pageContentService: PageContentService,
    private el: ElementRef,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    effect(() => {
      const merged = this.pageContentService.mergedContent();
      if (merged) {
        setTimeout(() => {
          this.fields.forEach((field) => {
            (field as any)._foundation?.adapter?.activateFocus?.();
            (field as any)._foundation?.adapter?.deactivateFocus?.();
          });
        });
      }
    });
  }

  ngOnInit(): void {
    this.pageContentService.loadVariableContent('de');
    this.pageContentService.loadStaticContent();
  }

  ngAfterViewInit() {
    this.createPrivacyLink();
    // queueMicrotask(() => this.cdr.detectChanges());
  }

  createPrivacyLink() {
    const link: HTMLElement | null = this.el.nativeElement.querySelector('.privacy-link');
    if (link) {
      link.addEventListener('click', (event) => {
        event.stopPropagation();
        event.preventDefault();
        this.router.navigate(['/privacy']);
      });
    }
  }

  setActive(field: 'name' | 'email' | 'message', value: boolean) {
    this.isActive[field] = value;
    setTimeout(() => {
      const holder = document.querySelector(`.field-holder.${field}`);
      if (holder) holder.getBoundingClientRect(); // forced reflow
    });
  }

  changeVisibility(field: NgModel): boolean {
    return !(field.invalid && field.touched);
  }

  onSubmit(form: any) {}
} */

/* import { Component, OnInit, AfterViewInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PageContentService } from '../../../../shared/services/page-content.service.js';

@Component({
  selector: 'port-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
})
export class ContactForm implements OnInit, AfterViewInit {
  contactData = {
    name: '',
    email: '',
    message: '',
  };

  isFocused = {
    name: false,
    email: false,
    message: false,
  };

  constructor(
    public pageContentService: PageContentService,
    private cd: ChangeDetectorRef,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.pageContentService.loadVariableContent('de');
    this.pageContentService.loadStaticContent();
  }

  ngAfterViewInit(): void {
    this.renewLayoutReflow();
  }

  setFocus(field: keyof typeof this.isFocused, state: boolean) {
    this.isFocused[field] = state;
    this.cd.detectChanges();
  }

  renewLayoutReflow() {
    requestAnimationFrame(() => {
      const inputs = this.el.nativeElement.querySelectorAll('input, textarea');
      inputs.forEach((el: HTMLInputElement | HTMLTextAreaElement) => {
        el.value = el.value;
      });
      this.cd.detectChanges();
    });
  }

  changeVisibility(field: NgModel): boolean {
    return !(field.invalid && field.touched);
  }
} */
