import { MergedContent } from './merged-content.interface';

export interface MenuContent {
  home: string;
  about: string;
  projects: string;
  feedback: string;
  cv: string;
  contact: string;
  languages: string;
}

export interface MenuViewModel {
  content: MergedContent | null;
  showFloating: boolean;
  showAside: boolean;
}
