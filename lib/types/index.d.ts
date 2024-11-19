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
