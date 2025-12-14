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
export class ContactForm implements OnInit {
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
  }



/*   createPrivacyLink() {
    const link: HTMLElement | null = this.el.nativeElement.querySelector('.privacy-link');
    if (link) {
      link.addEventListener('click', (event) => {
        event.stopPropagation();
        event.preventDefault();
        this.router.navigate(['/privacy']);
      });
    }
  } */
}
