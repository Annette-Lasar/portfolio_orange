import { StaticContent } from './static-content.interface.js';
import { VariableContent } from './variable-content.interface.js';
import { ProjectInfos, MergedProject } from './project.interface.js';
import { AboutContent } from './about.interface.js';
import { StaticSkillIcon } from './about.interface.js';
import { VariableFooterInfos, StaticFooterInfos } from './footer.interface.js';

export interface MergedAboutContent extends AboutContent {
  skills: StaticSkillIcon[];
}

export interface MergedProjectContent extends ProjectInfos {
  projects: MergedProject[];
}

export type MergedFooterInfos = VariableFooterInfos & StaticFooterInfos;

export interface MergedContent extends VariableContent, StaticContent {
  about: MergedAboutContent;
  projectInfos: MergedProjectContent;
  feedback: VariableContent['feedback'];
  footer: MergedFooterInfos;
}
