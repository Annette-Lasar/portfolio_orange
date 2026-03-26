/* Basic structure for all variable project infos - infos are to be translated */
export interface ProjectInfos {
  heading: string;
  subHeading1: string;
  subHeading2: string;
  ariaLabelGitHub: string;
  ariaLabelOpenProject: string;
  ariaLabelCloseProject: string;
  ariaLabelPreviousProject: string;
  ariaLabelNextProject: string;
  subHeadingDetailView1: string;
  subHeadingDetailView2: string;
  appliedTechnologies: string;
  tryButton: string;
  projects: VariableProject[];
}

/* Variable infos about one project - to be translated */
export interface VariableProject {
  id: string;
  description: string[];
  workflow: string[];
}

/* Basic structure for all static project infos - no translation needed */
export interface StaticProjectInfos {
  githubButton: string;
  staticProjects: StaticProject[];
}

/* Static infos about one project - no translation needed */
export interface StaticProject {
  id: string;
  title: string;
  technologies: Technology[];
  imagePath: string;
  links: StaticProjectLink;
  category: string;
  readyToTry: boolean;
}

export interface StaticProjectLink {
  githubFrontend: string;
  githubBackend: string;
  demo: string;
}

export interface Technology {
  technology: string;
  iconPath: string;
}

export type MergedProject = VariableProject & StaticProject;

export interface MergedProjectContent extends Omit<ProjectInfos, 'projects'> {
  projects: MergedProject[];
}
