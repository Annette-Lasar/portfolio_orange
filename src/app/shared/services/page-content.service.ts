import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VariableContent } from '../interfaces/variable-content.interface';
import { StaticContent } from '../interfaces/static-content.interface';
import { MergedContent } from '../interfaces/merged-content.interface.js';
import { FeedbackContent } from '../interfaces/feedback.interface.js';
import { GeneralInfos } from '../interfaces/general-infos.interface.js';

@Injectable({
  providedIn: 'root',
})
export class PageContentService {
  variableContent = signal<VariableContent | null>(null);
  staticContent = signal<StaticContent | null>(null);
  mergedContent = signal<MergedContent | null>(null);

  constructor(private http: HttpClient) {}

  loadVariableContent(lang: string = 'de') {
    const jsonUrl = `i18n/${lang}.json`;
    this.http.get<VariableContent>(jsonUrl).subscribe((data) => {
      this.variableContent.set(data);
      this.mergeContent();
    });
  }

  loadStaticContent() {
    const jsonUrl = 'i18n/static.json';
    this.http.get<StaticContent>(jsonUrl).subscribe((data) => {
      this.staticContent.set(data);
      this.mergeContent();
    });
  }

  private mergeContent() {
    const variable = this.variableContent();
    const statics = this.staticContent();
    if (!variable || !statics) return;

    const merged = { ...variable, ...statics } as MergedContent;
    delete (merged as any).staticAboutInfos;
    delete (merged as any).staticProjectInfos;
    delete (merged as any).staticFeedbackInfos;
    delete (merged as any).staticGeneralInfos;

    merged.about = this.addAboutToMerged(variable, statics);
    merged.feedback = this.addFeedbackToMerged(variable, statics);
    merged.projectInfos = this.addProjectsToMerged(variable, statics);

    merged.generalInfos = this.addGeneralInfosToMerged(variable, statics);

    this.mergedContent.set(merged);
    console.log(merged);
  }

  private addAboutToMerged(variable: VariableContent, statics: StaticContent): any {
    return {
      ...variable.about,
      skills: statics.staticAboutInfos.staticSkillIcons,
    };
  }

  addProjectsToMerged(variable: VariableContent, statics: StaticContent): any {
    return {
      ...variable.projectInfos,
      projects: variable.projectInfos.projects.map((info) => {
        const match = statics.staticProjectInfos.staticProjects.find((s) => s.id === info.id);
        return { ...match, ...info };
      }),
    };
  }

  addFeedbackToMerged(variable: VariableContent, statics: StaticContent): FeedbackContent {
    return {
      ...variable.feedback,
      feedbackInfos: variable.feedback.feedbackInfos.map((info) => {
        const match = statics.staticFeedbackInfos.find((s) => s.id === info.id);
        return { ...info, cardImage: match?.cardImage ?? info.cardImage };
      }),
    };
  }

  addGeneralInfosToMerged(variable: VariableContent, statics: StaticContent): GeneralInfos {
    return {
      ...variable.generalInfos,
      ...statics.staticGeneralInfos,
    };
  }
}
