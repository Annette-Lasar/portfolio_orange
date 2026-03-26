export interface VariableAboutInfos {
  heading: string;
  subHeading: string;
  introduction: string[];
  skillsHeading: string;
  tabExplanationLabel: string;
  tabHeading1: string;
  tabHeading2: string;
}

export interface StaticAboutInfos {
  skills: StaticSkill[];
}

export interface StaticSkill {
  id: string;
  caption: string;
  iconPath: string;
  category: string;
}

export type MergedAbout = VariableAboutInfos & StaticAboutInfos;
