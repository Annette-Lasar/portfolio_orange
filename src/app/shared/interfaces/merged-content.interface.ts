import { StaticContent } from './static-content.interface.js';
import { VariableContent } from './variable-content.interface.js';
import { Project } from './project.interface.js';
import { AboutContent } from './about.interface.js';
import { StaticSkillIcon } from './about.interface.js';

export interface MergedAboutContent extends AboutContent {
  skills: StaticSkillIcon[];
}

export interface MergedContent extends VariableContent, StaticContent {
  about: MergedAboutContent;
  projectInfos: VariableContent['projectInfos'] & { projects: Project[] };
  feedback: VariableContent['feedback'];
}
