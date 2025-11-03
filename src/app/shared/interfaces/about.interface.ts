export interface AboutContent {
  heading: string;
  subHeading: string;
  introduction: string[];
  skillsHeading: string;
  tabHeading1: string;
  tabHeading2: string;
}

export interface StaticSkillIcon {
  id: string;
  caption: string;
  iconPath: string;
  category: string;
}

export interface StaticAboutInfos {
  staticSkillIcons: StaticSkillIcon[];
}
