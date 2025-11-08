import { StaticContent } from './static-content.interface.js';
import { VariableContent } from './variable-content.interface.js';
import { Project, ProjectInfos, StaticProject, MergedProject } from './project.interface.js';
import { AboutContent } from './about.interface.js';
import { StaticSkillIcon } from './about.interface.js';

export interface MergedAboutContent extends AboutContent {
  skills: StaticSkillIcon[];
}

export interface MergedProjectContent extends ProjectInfos {
  projects: MergedProject[];
}

export interface MergedContent extends VariableContent, StaticContent {
  about: MergedAboutContent;
  projectInfos: MergedProjectContent; 
  feedback: VariableContent['feedback'];
}
