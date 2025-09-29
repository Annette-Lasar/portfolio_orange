import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VariableContent } from '../interfaces/variable-content.interface';
import { StaticContent } from '../interfaces/static-content.interface';
import { FeedbackInfo } from '../interfaces/feedback.interface';

@Injectable({
  providedIn: 'root',
})
export class PageContentService {
  variableContent = signal<VariableContent | null>(null);
  staticContent = signal<StaticContent | null>(null);

  mergedFeedbackInfos = signal<FeedbackInfo[]>([]);

  constructor(private http: HttpClient) {}

  loadVariableContent(lang: string = 'de') {
    const jsonUrl = `i18n/${lang}.json`;
    this.http.get<VariableContent>(jsonUrl).subscribe((data) => {
      this.variableContent.set(data);
      this.mergeIfReady();
    });
  }

  loadStaticContent() {
    const jsonUrl = 'i18n/static.json';
    this.http.get<StaticContent>(jsonUrl).subscribe((data) => {
      this.staticContent.set(data);
      this.mergeIfReady();
    });
  }

  private mergeIfReady() {
    const variable = this.variableContent();
    const statics = this.staticContent();

    if (variable?.feedback?.feedbackInfos && statics?.staticFeedbackInfos) {
      const merged = variable.feedback.feedbackInfos.map((info) => {
        const match = statics.staticFeedbackInfos.find((s) => s.id === info.id);
        return {
          ...info,
          cardImage: match?.cardImage ?? info.cardImage,
        };
      });
      this.mergedFeedbackInfos.set(merged);
    }
  }
}
