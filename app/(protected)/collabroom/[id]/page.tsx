"use client";

import { Editor } from "@/app/components/forEditor/Editor";
import { Room } from "@/app/components/forCollabRoom/Room";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";

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
  const { roomId, username } = params;

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

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
  const saveCollaborator = async () => {};

  // invite collaborators to a session
  const handleInvite = async () => {};

  return (
    <Room>
      <div className=" w-full min-h-screen flex flex-col bg-slate-900 ">
        <header></header>
      </div>
    </Room>
  );
};

export default CollabRoom;
