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
