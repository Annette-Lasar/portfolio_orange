import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';

import { VariableContent } from '../interfaces/variable-content.interface';
import { StaticContent } from '../interfaces/static-content.interface';
import { MergedAboutContent, MergedContent } from '../interfaces/merged-content.interface';
import { FeedbackContent } from '../interfaces/feedback.interface';
import { GeneralInfos } from '../interfaces/general-infos.interface';
import { VariableFooterInfos } from '../interfaces/footer.interface';
import { StaticFooterInfos } from '../interfaces/footer.interface';
import { LanguageService } from './languageService';

@Injectable({
  providedIn: 'root',
})
export class PageContentService {
  private variableContentSubject = new BehaviorSubject<VariableContent | null>(null);
  private staticContentSubject = new BehaviorSubject<StaticContent | null>(null);
  private initialized = false;

  variableContent$: Observable<VariableContent | null> = this.variableContentSubject.asObservable();
  staticContent$: Observable<StaticContent | null> = this.staticContentSubject.asObservable();

  mergedContent$ = combineLatest([this.variableContent$, this.staticContent$]).pipe(
    map(([variable, statics]) => {
      if (!variable || !statics) return null;

      const merged: MergedContent = {
        ...variable,
        ...statics,
        about: this.addAboutToMerged(variable, statics),
        feedback: this.addFeedbackToMerged(variable, statics),
        projectInfos: this.addProjectsToMerged(variable, statics),
        generalInfos: this.addGeneralInfosToMerged(variable, statics),
        footer: this.addFooterToMerged(variable, statics),
      };

      this.deleteRedundantJsonParts(merged);
      return merged;
    }),
  );

  constructor(
    private http: HttpClient,
    private languageService: LanguageService,
  ) {
    this.init();
    this.getCurrentLanguageContent();
  }

  getCurrentLanguageContent() {
    this.languageService.language$.subscribe((lang) => {
      this.loadVariableContent(lang.code);
    });
  }

  // ----------- LOADERS ---------------------------------------

  loadVariableContent(lang: string = 'de') {
    this.http
      .get<VariableContent>(`i18n/${lang}.json`)
      .subscribe((data) => this.variableContentSubject.next(data));
  }

  loadStaticContent() {
    this.http
      .get<StaticContent>('i18n/static.json')
      .subscribe((data) => this.staticContentSubject.next(data));
  }

  // ----------- MERGE HELPERS ---------------------------------

  private addAboutToMerged(variable: VariableContent, statics: StaticContent): MergedAboutContent {
    return {
      ...variable.about,
      skills: statics.staticAboutInfos.staticSkillIcons,
    };
  }

  private addProjectsToMerged(variable: VariableContent, statics: StaticContent) {
    return {
      ...variable.projectInfos,
      projects: variable.projectInfos.projects.map((info) => {
        const match = statics.staticProjectInfos.staticProjects.find((s) => s.id === info.id);
        return { ...match, ...info };
      }),
    };
  }

  private addFeedbackToMerged(variable: VariableContent, statics: StaticContent): FeedbackContent {
    return {
      ...variable.feedback,
      feedbackInfos: variable.feedback.feedbackInfos.map((info) => {
        const match = statics.staticFeedbackInfos.find((s) => s.id === info.id);
        return { ...info, cardImage: match?.cardImage ?? info.cardImage };
      }),
    };
  }

  private addGeneralInfosToMerged(variable: VariableContent, statics: StaticContent): GeneralInfos {
    return {
      ...variable.generalInfos,
      ...statics.staticGeneralInfos,
    };
  }

  private addFooterToMerged(
    variable: VariableContent,
    statics: StaticContent,
  ): VariableFooterInfos & StaticFooterInfos {
    return {
      ...variable.footer,
      ...statics.staticFooterInfos,
    };
  }

  private deleteRedundantJsonParts(merged: MergedContent) {
    delete (merged as any).staticAboutInfos;
    delete (merged as any).staticProjectInfos;
    delete (merged as any).staticFeedbackInfos;
    delete (merged as any).staticGeneralInfos;
  }

  private init(lang: string = 'de') {
    if (this.initialized) return;
    this.initialized = true;

    this.loadVariableContent(lang);
    this.loadStaticContent();
  }
}
