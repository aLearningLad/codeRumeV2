"use client";

// import Link from "next/link";
// import {
//   ChangeEvent,
//   HTMLInputTypeAttribute,
//   useEffect,
//   useState,
// } from "react";
// import { io, Socket } from "socket.io-client";

// let socket: any;

// export default function Home() {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState<any>([]);
//   const [socket, setSocket] = useState<Socket | null>(null);

//   useEffect(() => {
//     const socketIo = io({
//       path: "/api/socket",
//     });

//     // save socket to state
//     setSocket(socketIo);

//     // listen for messages from server
//     socketIo.on("message", (msg: any) => {
//       setMessages((prev: any) => [...prev, msg]);
//     });

//     return () => {
//       socketIo.disconnect();
//     };
//   }, []);

//   const sendMessage = () => {
//     if (socket) {
//       socket.emit("message", message); // send message to server
//       setMessages((prev: any) => [...prev, message]); //add a message to chat
//       setMessage(""); //will clear the input field
//     } else {
//       console.error("Socket is not connected");
//     }
//   };

//   const randomId = "dnwjdn66252";
//   return (
//     <main className=" min-h-screen w-full bg-slate-900 text-white flex justify-center items-center ">
//       {/* <Link
//         className=" bg-white text-black h-16 w-3/12 rounded-md flex justify-center items-center"
//         href={`/collabroom/${randomId}`}
//       >
//         Create & enter random codeRume
//       </Link> */}

//       <section className=" w-full h-5/6 bg-white text-black rounded-lg flex justify-center items-center flex-col gap-5">
//         {messages.map((text: string) => (
//           <p key={text}>{text}</p>
//         ))}
//       </section>
//       <input
//         type="text"
//         value={message}
//         onChange={(e: ChangeEvent<HTMLInputElement>) =>
//           setMessage(e.target.value)
//         }
//         className=" text-black"
//         placeholder="Type a message..."
//       />
//       <button onClick={sendMessage}>Send</button>
//     </main>
//   );
// }

import { useClerk } from "@clerk/nextjs";
import { useState } from "react";

export default function Home() {
  const [emailBody, setEmailBody] = useState<string>(
    "Hi there! If you recieve this, it means your email sender service is working!"
  );
  const [subjectLine, setSubjectLine] = useState<string>(
    "This is just a test subject line"
  );
  const [sessionHost, setSessionHost] = useState<string>(
    "Thato, also known as HIM!"
  );
  const [potentialCollaborators, setPotentialCollaborators] = useState<
    string[]
  >(["mocmanca@gmail.com", "leapingbulls@gmail.com"]);

  const { signOut } = useClerk();

  // send invite to codeRume session
  const handleSend = async () => {
    try {
      const response = await fetch("/api/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailBody,
          subjectLine,
          sessionHost,
          potentialCollaborators,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Email to workers sent successfully", data);
      } else {
        console.error("Failed to send invites: ", data.message);
        alert("Error sending email to admin");
      }
    } catch (error) {
      console.log("Error while sending email: ", error);
    }
  };

  return (
    <main className="min-h-screen w-full flex-col bg-slate-900 text-white flex justify-center items-center">
      Welcome!
      <button onClick={() => signOut({ redirectUrl: "/" })}>Sign Out</button>
      <button onClick={handleSend}>Send Invite</button>
    </main>
  );
}
