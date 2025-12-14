export interface Project {
  id: string;
  description: string[];
  workflow: string[];
}

export interface ProjectInfos {
  heading: string;
  subHeading1: string;
  subHeading2: string;
  subHeadingDetailView1: string;
  subHeadingDetailView2: string;
  appliedTechnologies: string;
  tryButton: string;
  projects: Project[];
}

export interface StaticProjectLink {
  github: string;
  demo: string;
}

export interface StaticProject {
  id: string;
  title: string;
  technologies: string[];
  imagePath: string;
  links: StaticProjectLink;
  category: string;
}

export interface StaticProjectInfos {
  githubButton: string;
  staticProjects: StaticProject[];
}

// export interface MergedProject extends Project, StaticProject {}

export interface MergedProject extends Project {
  title?: string;
  technologies?: string[];
  imagePath?: string;
  links?: StaticProjectLink;
  category?: string;
}