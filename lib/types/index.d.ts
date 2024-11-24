declare type Tcollaborator = {
  friend_id: string;
  unique_id: string;
  email: string;
};

declare type Tnavlinks = {
  id: number;
  title: string;
  uniqueLink: string;
};

declare type Tfooterlinks = {
  id: number;
  social: string;
  icon: React.ReactElement;
};

declare type Tendorsementdata = {
  companyId: number;
  companyName: string;
  companyLogo: string;
};

declare type Tscalepromo = {
  id: number;
  icon: React.ReactElement;
  provName: string;
};

declare type TtechStack = {
  techId: number;
  title: string;
  imgLink: string;
  stackLink: string;
};

declare type Troomnavdata = {
  optionId: string;
  optionTitle: string;
  optionLink?: string;
  optionIcon: React.ReactElement;
  index: number;
};

declare type Tupcoming = {
  featureId: string;
  featureTitle: string;
  featureDesc: string;
  featureLikelihood: string; // out of 5
};

declare type Tsquares = {
  id: number;
  title: string;
  desc: string;
};

declare type Tnewsquares = {
  squareId: string;
  squareTitle: string;
  squareBlurb: string;
  squareHoverPrompt: string;
  squareIcon: React.ReactElement;
};
