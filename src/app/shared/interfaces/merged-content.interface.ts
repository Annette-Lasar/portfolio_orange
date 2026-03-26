import { MergedGeneralInfos } from './general-infos.interface.js';
import { HeroContent } from './hero.interface.js';
import { MergedAbout } from './about.interface.js';
import { MergedFeedbackContent } from './feedback.interface.js';
import { MergedProjectContent } from './project.interface.js';
import { VariableCvContent } from './cv.interface.js';
import { VariableContactContent } from './contact.interface.js';
import { MenuContent } from './menu.interface.js';
import { LegalContent } from './legal.interface.js';
import { MergedFooterInfos } from './footer.interface.js';



export interface MergedContent {
  generalInfos: MergedGeneralInfos;
  hero: HeroContent;
  about: MergedAbout;
  projectInfos: MergedProjectContent;
  feedback: MergedFeedbackContent;
  cv: VariableCvContent;
  contact: VariableContactContent;
  menu: MenuContent;
  legal: LegalContent;
  footer: MergedFooterInfos;
}
