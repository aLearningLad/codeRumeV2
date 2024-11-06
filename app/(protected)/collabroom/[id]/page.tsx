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

  return (
    <Room>
      <div className=" w-full min-h-screen flex flex-col bg-slate-900 justify-center">
        <div className=" w-full h-full flex flex-col items-center lg:w-6/12 ">
          {messages.map((msg, index) => (
            <div
              className=" text-white border-4 border-red-500 h-40"
              key={index}
            >
              <strong>{msg.username}</strong>: {msg.message}
            </div>
          ))}
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className=" h-20"
        />
        <button className=" bg-red-600 text-black h-12" onClick={sendMessage}>
          Send
        </button>
      </div>
    </Room>
  );
};

export default CollabRoom;
