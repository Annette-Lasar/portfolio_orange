import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LANGUAGES } from '../../data/language-data';
import { LanguageOption } from '../../interfaces/language-option.interface';
import { LanguageService } from '../../services/languageService';
import { Observable } from 'rxjs';
import { GeneralInfos } from '../../interfaces/general-infos.interface';

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
  imgPathPrefix: string = '/icons/general/';

  @Input({ required: true }) variant!: 'overlay' | 'icon' | 'aside';
  @Input() currentLanguage!: string | undefined;
  @Input() generalInfos!: GeneralInfos | undefined;

  constructor(private readonly languageService: LanguageService) {
    this.language$ = this.languageService.language$;
  }

  toggle() {
    this.expanded = !this.expanded;
  }

  select(lang: LanguageOption) {
    this.languageService.setLanguage(lang);
    this.toggle();
  }
}
