import { StaticFeedbackInfo } from './feedback.interface.js';
import { StaticGeneralInfos } from './general-infos.interface.js';
import { StaticAboutInfos } from './about.interface.js';
import { StaticProjectInfos } from './project.interface.js';
import { StaticFooterInfos } from './footer.interface.js';

export interface StaticContent {
  staticGeneralInfos: StaticGeneralInfos;
  staticAboutInfos: StaticAboutInfos;
  staticProjectInfos: StaticProjectInfos;
  staticFeedbackInfos: StaticFeedbackInfo[];
  staticFooterInfos: StaticFooterInfos;
}
