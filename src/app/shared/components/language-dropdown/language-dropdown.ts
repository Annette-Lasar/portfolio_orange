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
