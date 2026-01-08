// import { Component, Input } from '@angular/core';
// import { MatMenuModule } from '@angular/material/menu';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { LANGUAGES } from '../../data/language-data';
// import { LanguageOption } from '../../interfaces/language-option.interface';
// import { LanguageService } from '../../services/languageService';

// @Component({
//   selector: 'port-language-dropdown',
//   imports: [MatMenuModule, MatButtonModule, MatIconModule],
//   templateUrl: './language-dropdown.html',
//   styleUrl: './language-dropdown.scss',
// })
// export class LanguageDropdown {
//   expanded = false;
//   languages = LANGUAGES;
//   // activeLanguage: LanguageOption = LANGUAGES[0];
//   // @Input() currentLanguage: string | undefined;
//   @Input({ required: true }) variant!: 'overlay' | 'icon' | 'aside';

//   constructor(private languageService: LanguageService) {}

//   toggle() {
//     this.expanded = !this.expanded;
//   }

//   select(lang: LanguageOption) {
//     this.languageService.setLanguage(lang);
//     // this.activeLanguage = lang;
//     this.toggle();
//     // console.log(this.activeLanguage);
//   }
// }

import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LANGUAGES } from '../../data/language-data';
import { LanguageOption } from '../../interfaces/language-option.interface';
import { LanguageService } from '../../services/languageService';
import { Observable } from 'rxjs';

@Component({
  selector: 'port-language-dropdown',
  imports: [CommonModule, MatMenuModule, MatButtonModule, MatIconModule],
  templateUrl: './language-dropdown.html',
  styleUrl: './language-dropdown.scss',
})
export class LanguageDropdown {
  expanded = false;
  languages = LANGUAGES;
  readonly language$: Observable<LanguageOption>;

  @Input({ required: true }) variant!: 'overlay' | 'icon' | 'aside';
  @Input() currentLanguage!: string | undefined;

  constructor(private readonly languageService: LanguageService) {
    this.language$ = this.languageService.language$;
  }

  toggle() {
    this.expanded = !this.expanded;
  }

  select(lang: LanguageOption) {
    // noch ohne Übersetzung → völlig okay
    this.languageService.setLanguage(lang);
    this.toggle();
  }
}
