import { Component, Input } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'port-language-dropdown',
  imports: [MatMenuModule, MatButtonModule],
  templateUrl: './language-dropdown.html',
  styleUrl: './language-dropdown.scss',
})
export class LanguageDropdown {
  @Input({ required: true }) variant!: 'overlay' | 'icon' | 'aside';

  setLang(lang: string, labelAbbr: string) {
    // Code hier
  }
}
