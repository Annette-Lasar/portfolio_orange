import { VariableGeneralInfos } from './general-infos.interface.js';
import { VariableAboutInfos } from './about.interface.js';
import { HeroContent } from './hero.interface.js';
import { ProjectInfos } from './project.interface.js';
import { VariableFeedbackInfos } from './feedback.interface.js';
import { VariableCvContent } from './cv.interface.js';
import { VariableContactContent } from './contact.interface.js';
import { MenuContent } from './menu.interface.js';
import { LegalContent } from './legal.interface.js';
import { VariableFooterInfos } from './footer.interface.js';

export interface VariableContent {
  generalInfos: VariableGeneralInfos;
  hero: HeroContent;
  about: VariableAboutInfos;
  projectInfos: ProjectInfos;
  feedback: VariableFeedbackInfos;
  cv: VariableCvContent;
  contact: VariableContactContent;
  menu: MenuContent;
  legal: LegalContent;
  footer: VariableFooterInfos;
}
