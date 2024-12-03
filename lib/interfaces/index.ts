export interface IregisterUserToDb {
  display_name: string;
  user_id: string;
  email: string;
}

export interface chatProps {
  params: {
    roomId: string;
    username: string;
  };
}

export interface Message {
  username: string;
  message: string;
  sentAt: string;
  current_user_id: string;
}

export interface IDeleteCollabBtn {
  unique_id: string;
}

export interface Istore {
  promoImage: string | null;
  selectedTab: string | null;
  objectShown: number;
  modalOpen: boolean;
  setPromoImage: (promoImage: string | null) => void;
  setSelectedTab: (selectedTab: string | null) => void;
  setObjectShown: (objectShown: number) => void;
  setModalOpen: (modalOpen: boolean) => void;
}

export interface Iroomnav {
  collaboratorList: Tcollaborator[];
}

export interface Iprofilenewphonenumber {
  userId: string;
}

export interface Ideletenumberbtn {
  userId: string;
}

export interface Iprofilecollabbtn {
  userId: string;
  email?: string;
}
