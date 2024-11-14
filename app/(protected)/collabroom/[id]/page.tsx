"use client";

import { Editor } from "@/app/components/forEditor/Editor";
import { Room } from "@/app/components/forCollabRoom/Room";
import Pusher from "pusher-js";
import { ChangeEvent, useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { fetchUserId } from "@/utils/fetchUserId";

interface chatProps {
  params: {
    roomId: string;
    username: string;
  };
}

interface Message {
  username: string;
  message: string;
}

const CollabRoom: React.FC<chatProps> = ({ params }) => {
  const userId = useAuth().userId;
  console.log("This is the userId from clerk: ", userId);
  const userEmail = useUser().user?.emailAddresses[0].emailAddress;
  const { roomId, username } = params;

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [newCollaboratorEmail, setNewCollaboratorEmail] = useState<string>("");
  const [hostEmail, setHostEmail] = useState<string>(userEmail!);
  const [friend_id, set_friend_id] = useState<string>("");
  const [email, set_email] = useState<string>(""); // this is for the collaborator being invited
  const [unique_id, set_unique_id] = useState<string>("");

  // get userId from db, using email. So dep. arr is user email ====> why did I do this, when this id is the userId from clerk?? Aaargh!
  // useEffect(() => {
  //   fetchUserId(userEmail!);
  // }, [hostEmail, userEmail]);

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER!,
    });

    const channel = pusher.subscribe(`chat-${roomId}`);

    channel.bind("new message", (data: Message) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [roomId]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    await fetch("/api/pusher/trigger", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input, username, roomId }),
    });

    setInput("");
  };

  // save a collaborator to DB
  const saveCollaborator = async () => {
    try {
      const collabSaveResults = await fetch("/api/saveCollaborator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          email,
        }),
      });
    } catch (error) {
      console.log("Error while saving collaborator to db: ", error);
    }
  };

  // invite collaborators to a session
  const handleInvite = async () => {};

  return (
    <Room>
      <div className=" w-full min-h-screen flex flex-col bg-slate-900 ">
        <header>Invite collaborator test</header>

        <section className=" flex flex-col items-center justify-center">
          <input
            type="text"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              set_email(e.target.value)
            }
          />
          <button
            onClick={saveCollaborator}
            className=" bg-green-500 text-white w-fit px-4 py-2 rounded-md "
          >
            Save this collaborator
          </button>
        </section>
      </div>
    </Room>
  );
};

export default CollabRoom;
