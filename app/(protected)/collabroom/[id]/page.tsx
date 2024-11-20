"use client";

import { Editor } from "@/app/components/forEditor/Editor";
import { Room } from "@/app/components/forCollabRoom/Room";
import Pusher from "pusher-js";
import { ChangeEvent, useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { nanoid } from "nanoid";
import sql from "@/lib/db";
import { chatProps, Message } from "@/lib/interfaces";
import RoomNav from "@/app/components/forCollabRoom/RoomNav";

const CollabRoom: React.FC<chatProps> = ({ params }) => {
  const user = useUser().user;
  const userId = useAuth().userId;
  const userEmail = useUser().user?.emailAddresses[0].emailAddress;
  const { roomId, username } = params;

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [newCollaboratorEmail, setNewCollaboratorEmail] = useState<string>("");
  const [hostEmail, setHostEmail] = useState<string>(userEmail!);
  const [friend_id, set_friend_id] = useState<string>("");
  const [email, set_email] = useState<string>(""); // this is for the collaborator being invited
  const [unique_id, set_unique_id] = useState<string | null>();
  const [clickCount, setClickCount] = useState<boolean>(false);
  const [collaboratorList, setCollaboratorList] = useState<
    Tcollaborator[] | any[]
  >([]); // come back & fix this

  // states for invite
  const [emailText, setEmailText] = useState<string | null>(
    "Ay! You've been invited to a coding session!"
  );
  const [subjectLine, setSubjectLine] = useState<string>(
    "Java fintech app coding session"
  );
  const [sessionHost, setSessionHost] = useState(user?.fullName);
  const [potentialCollaborators, setPotentialCollaborators] = useState<
    string[]
  >(["mocmanca@gmail.com", "leapingbulls@gmail.com"]);
  const [startsAt, setStartsAt] = useState<string | null>("21h30");
  const [primaryLang, setPrimaryLang] = useState<string | null>("Java");
  const [framework, setFramework] = useState<string | null>("Springboot");
  const [sessionLength, setSessionLength] = useState<string | null>(
    "Around an hour"
  );
  const [expMemberCount, setExpMemberCount] = useState<number>(4);

  // initialize pusher for chat
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

  // fetch this user's collaborators & set session host
  useEffect(() => {
    const fetchCollaborators = async () => {
      try {
        const collabsData = await sql(
          `SELECT * FROM all_collaborators WHERE friend_id = $1`,
          [userId]
        );

        if (collabsData && collabsData.length > 0) {
          setCollaboratorList(collabsData);
        }
      } catch (error) {
        console.log("Error fetching collaborators: ", error);
      }
    };

    fetchCollaborators();
  }, []);

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

  // refresh the unique_id value everytime the page loads, and everytime saveCollaborator() is called
  useEffect(() => {
    const uniqueValue = nanoid();
    set_unique_id(uniqueValue);
  }, [clickCount]);

  // save a collaborator to DB
  const saveCollaborator = async () => {
    setClickCount((prev) => !prev);

    try {
      const collabSaveResults = await fetch("/api/saveCollaborator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          unique_id,
          userId,
          email,
        }),
      });
    } catch (error) {
      console.log("Error while saving collaborator to db: ", error);
    }
  };

  // invite collaborators to a session
  const handleInvite = async () => {
    try {
      await fetch("/api/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailText,
          subjectLine,
          sessionHost,
          potentialCollaborators,
          startsAt,
          primaryLang,
          framework,
          sessionLength,
          expMemberCount,
        }),
      });
    } catch (error) {
      console.log("Error sending invite info from clientside: ", error);
    }
  };

  return (
    <Room>
      <div className=" w-full min-h-screen flex flex-col bg-slate-900 p-1 sm:p-2 md:p-5 ">
        <section className=" w-full h-[calc(100vh-7rem)] border-4 border-yellow-400 ">
          Contents here
        </section>
        <RoomNav />

        {/* <header className=" text-white">Invite collaborator test</header> */}
        {/* <section className=" flex flex-col items-center justify-center h-full"> */}
        {/* <input
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
          </button> */}

        {/* <button
            onClick={handleInvite}
            className=" bg-white text-black rounded-md w-fit px-5 py-2"
          >
            Send Invite
          </button> */}
        {/* </section> */}
      </div>
    </Room>
  );
};

export default CollabRoom;
