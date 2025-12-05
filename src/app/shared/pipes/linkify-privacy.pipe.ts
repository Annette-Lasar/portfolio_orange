import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'linkifyPrivacy',
  standalone: true,
})
export class LinkifyPrivacyPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(text: string): SafeHtml {
    if (!text) return '';

    const replaced = text.replace(
      /Datenschutzbestimmungen/gi,
      `<a class="privacy-link" data-routerlink="/privacy">Datenschutzbestimmungen</a>`
    );

    return this.sanitizer.bypassSecurityTrustHtml(replaced);
  }
}
