export interface AboutContent {
  heading: string;
  subHeading: string;
  introduction: string[];
}

export interface StaticSkillIcon {
  id: string;
  caption: string;
  iconPath: string;
}

export interface StaticAboutInfos {
  tabHeading1: string;
  tabHeading2: string;
  staticFrontendIcons: StaticSkillIcon[];
  staticBackendIcons: StaticSkillIcon[];
}
