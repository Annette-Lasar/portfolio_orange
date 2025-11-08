import { GeneralInfos } from './general-infos.interface.js';
import { AboutContent } from './about.interface.js';
import { HeroContent } from './hero.interface.js';
import { ProjectInfos } from './project.interface.js';
import { FeedbackContent } from './feedback.interface.js';
import { CvContent } from './cv.interface.js';
import { ContactContent } from './contact.interface.js';
import { MenuContent } from './menu.interface.js';
import { LegalContent } from './legal.interface.js';

export interface VariableContent {
  generalInfos: GeneralInfos;
  hero: HeroContent;
  about: AboutContent;
  projectInfos: ProjectInfos;
  feedback: FeedbackContent;
  cv: CvContent;
  contact: ContactContent;
  menu: MenuContent;
  legal: LegalContent;
}
