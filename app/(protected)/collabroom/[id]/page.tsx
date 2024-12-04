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
import { CiSaveDown2 } from "react-icons/ci";
import { IoIosSend } from "react-icons/io";
import { FaCrown, FaQuestion } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { FaCopy } from "react-icons/fa";

const CollabRoom: React.FC<chatProps | any> = ({ params }) => {
  const user = useUser().user;
  const userId = useAuth().userId;
  const userEmail = useUser().user?.emailAddresses[0].emailAddress;
  const { roomId, username } = params;

  const [messages, setMessages] = useState<Message[]>([]);
  const [sentAt, setSentAt] = useState<string>(new Date().toLocaleTimeString());
  const [input, setInput] = useState<string>("");
  const [newCollaboratorEmail, setNewCollaboratorEmail] = useState<string>("");
  const [hostEmail, setHostEmail] = useState<string>(userEmail!);
  const [friend_id, set_friend_id] = useState<string>("");
  const [email, set_email] = useState<string>(""); // this is for the collaborator being invited --> zustand
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
    setSentAt(new Date().toLocaleTimeString());
    await fetch("/api/pusher/trigger", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: input,
        username: sessionHost,
        roomId,
        sentAt,
        current_user_id: userId,
      }),
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

  // save highlighted code as text file
  const handleSaveDoc = async () => {
    if (typeof window.getEditorContent === "function") {
      const editorContent = window.getEditorContent();

      // create my blob and put editor text inside it
      const blob = new Blob([editorContent], { type: "text/plain" });

      //  give my user a url to download their code
      const url = window.URL.createObjectURL(blob);

      // start the download
      const a = document.createElement("a");
      a.href = url;
      a.download = "coderume-session-code.txt";
      document.body.appendChild(a);
      a.click();

      //clean up
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } else {
      console.error(
        "Editor content retrieval function is not defined. Please contact the developer"
      );
    }
  };

  // copy all typed code to clipboard
  const handleCopyToClipboard = () => {};

  return (
    <Room>
      <div className=" w-full min-h-screen flex flex-col bg-slate-900 p-1 sm:p-2 md:p-5 gap-3">
        <section className=" w-full overflow-auto h-[calc(100vh-10rem)] rounded-3xl flex flex-col lg:flex-row bg-slate-700/60">
          <section className=" w-full sm:w-[95%] md:w-[90%] lg:w-8/12 min-h-[75vh] lg:h-full flex p-2 flex-col gap-2 ">
            {/* IDE */}
            <Editor />
            <div className=" w-full h-20 flex justify-start gap-2 lg:gap-3 ">
              <button
                onClick={handleSaveDoc}
                className=" w-12 h-12 rounded-lg bg-white flex justify-center items-center "
              >
                <CiSaveDown2 size={26} className=" text-slate-600 " />
              </button>

              <button className="w-12 h-12 rounded-lg bg-white flex justify-center items-center">
                <FaQuestion size={26} className="text-slate-600" />
              </button>

              <button
                onClick={handleCopyToClipboard}
                className="w-12 h-12 rounded-lg bg-white flex justify-center items-center"
              >
                <FaCopy size={26} className=" text-black " />
              </button>
            </div>
          </section>

          <section className="w-full sm:w-[95%] md:w-[90%] lg:w-4/12 min-h-[25vh] lg:h-full p-2 gap-2 md:gap-3 lg:gap-5 flex flex-col">
            {/* chat section */}
            <div className=" w-full text-center items-center min-h-[40vh] lg:h-[60vh] flex flex-col bg-slate-500/70 p-3 rounded-2xl gap-8 overflow-auto ">
              <h1 className=" bg-white w-fit px-6 py-2 rounded-lg text-lg text-black">
                codeRume chat
              </h1>
              {/* where messages appear */}
              {messages.length > 0 ? (
                <>
                  {messages.map((eachText: Message) => (
                    <div
                      className={` w-full py-1 px-3 rounded-lg text-white ${
                        eachText.current_user_id === userId
                          ? " w-full min-h-28 max-h-60 text-ellipsis flex flex-col items-start justify-center "
                          : "w-full min-h-24 max-h-60  text-ellipsis flex flex-col items-end justify-center"
                      } `}
                    >
                      <section
                        className={` ${
                          eachText.current_user_id === userId
                            ? " items-start h-full min-w-[60%] max-w-[85%] rounded-lg p-2 lg:p-3 bg-slate-500/60 "
                            : "items-end bg-pink-500/30 min-w-[60%] max-w-[85%] rounded-lg p-2 lg:p-3 "
                        } w-full h-full flex flex-col `}
                      >
                        <p className="h-[75%] overflow-auto ">
                          {eachText.message}
                        </p>
                        <span className=" flex gap-1 items-end min-w-[40%] ">
                          <div className="">
                            {eachText.current_user_id === userId ? (
                              <FaCrown className=" text-yellow-500" size={20} />
                            ) : (
                              <IoPersonSharp
                                className="  text-cyan-400"
                                size={20}
                              />
                            )}
                          </div>
                          <p className=" text-[8px]">by</p>
                          <p>
                            {eachText.current_user_id === userId ? (
                              <p className=" text-[12px]">You</p>
                            ) : (
                              <p className="text-[12px]">{eachText.username}</p>
                            )}
                          </p>
                          <p className="text-[8px]">@</p>
                          <p className="text-[10px]">{eachText.sentAt}</p>
                        </span>
                      </section>
                    </div>
                  ))}
                </>
              ) : (
                <div className=" w-full p-3 h-full flex flex-col justify-center items-center text-white text-center ">
                  <h2 className=" text-2xl ">
                    Hmm . . . the chat is empty right now
                  </h2>

                  <h4 className=" text-[14px] ">
                    Maybe try inviting friends from your collaborator list, or
                    share a thought
                  </h4>
                </div>
              )}
            </div>

            <div className=" w-full min-h-[10vh] bg-slate-500/50 rounded-lg py-2 px-2 lg:px-3 flex items-center justify-center gap-2 ">
              {/* where text inputs are shown */}
              <input
                type="text"
                className=" w-10/12 focus:scale-95 text-[14px] placeholder:text-[14px] transition-all duration-300 ease-in-out outline-none lg:w-11/12 rounded-lg placeholder:text-neutral-500 px-2 overflow-auto h-full  "
                value={input}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setInput(e.target.value)
                }
                placeholder="Share a thought . . ."
              />
              <div className=" w-2/12 lg:w-1/12 h-full ">
                <button
                  onClick={sendMessage}
                  className=" flex h-full w-full justify-center items-center hover:scale-95 transition-all duration-300 ease-in-out "
                >
                  <IoIosSend
                    size={30}
                    className=" text-white hover:text-green-400 "
                  />
                </button>
              </div>
            </div>
          </section>
        </section>
        <RoomNav collaboratorList={collaboratorList} />
      </div>
    </Room>
  );
};

export default CollabRoom;
