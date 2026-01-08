import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { LanguageOption } from '../interfaces/language-option.interface';
import { LANGUAGES } from '../data/language-data';
import { STORAGE_LANG_KEY } from '../data/general-data';


@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly defaultLanguage = LANGUAGES[0];

  private languageSubject = new BehaviorSubject<LanguageOption>(
    this.loadFromStorage()
  );

  readonly language$ = this.languageSubject.asObservable();

  constructor(@Inject(DOCUMENT) private readonly document: Document) {
    this.updateHTMLLang(this.languageSubject.value.code);
  }

  setLanguage(lang: LanguageOption) {
    this.languageSubject.next(lang);
    localStorage.setItem(STORAGE_LANG_KEY, lang.code);

    this.updateHTMLLang(lang.code);
  }

  get currentLanguage(): LanguageOption {
    return this.languageSubject.value;
  }

  private loadFromStorage(): LanguageOption {
    const code = localStorage.getItem(STORAGE_LANG_KEY);
    return LANGUAGES.find(l => l.code === code) ?? this.defaultLanguage;
  }

  private updateHTMLLang(code: string) {
    this.document.documentElement.lang = code;
  }
}
