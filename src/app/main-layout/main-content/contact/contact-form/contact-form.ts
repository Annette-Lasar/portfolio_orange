import { Component, Input, ViewChildren, QueryList, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  FormGroup,
  FormControl,
  AbstractControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule, MatFormField } from '@angular/material/form-field';
import { MergedContent } from '../../../../shared/interfaces/merged-content.interface.js';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'port-contact-form',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
})
export class ContactForm {
  private http = inject(HttpClient);

  contactForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),

    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),

    message: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(500)],
    }),

    acceptPrivacy: new FormControl(false, {
      nonNullable: true,
      validators: [Validators.requiredTrue],
    }),
  });

  get name(): AbstractControl {
    return this.contactForm.get('name')!;
  }

  get message(): AbstractControl {
    return this.contactForm.get('message')!;
  }

  get email(): AbstractControl {
    return this.contactForm.get('email')!;
  }

  @Input({ required: true }) allContent!: MergedContent;
  @ViewChildren(MatFormField) fields!: QueryList<MatFormField>;

  submit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    console.log(this.contactForm.value);
    // this.http
    //   .post('https://annette-lasar.de/contact.php', this.contactForm.value, {
    //     headers: { 'Content-Type': 'application/json' },
    //   })
    //   .subscribe(() => {
    //     console.log('Daten gesendet');
    //   });
  }
}
