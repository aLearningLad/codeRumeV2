"use client";

import sql from "@/lib/db";
import { useAuth } from "@clerk/nextjs";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

const RegisterCollabBtn = () => {
  const [email, setEmail] = useState<string>();
  const [unique_id, set_unique_id] = useState<string | null>();
  const [clickCount, setClickCount] = useState<boolean>(false);

  const userId = useAuth().userId;
  const router = useRouter();

  // refresh the unique_id value everytime the page loads, and everytime saveCollaborator() is called
  useEffect(() => {
    const uniqueValue = nanoid();
    set_unique_id(uniqueValue);
  }, [clickCount]);

  // save new collaborator to DB
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
      router.refresh();
    } catch (error) {
      console.log("Error while saving collaborator to db: ", error);
    }
  };

  return (
    <div className=" w-full flex flex-col ">
      <input
        type="text"
        placeholder="Eg. thatcoder@gmail.com"
        className=" w-full h-16 rounded-lg bg-slate-950 px-3 py-1 mb-3 text-neutral-300 placeholder:text-[14px] text-[14px] "
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
      />
      <button
        onClick={saveCollaborator}
        className=" hover:bg-slate-950 hover:scale-95 transition-all duration-300 ease-in-out w-full text-lg bg-green-500 text-white h-16 rounded-lg "
      >
        Register
      </button>
    </div>
  );
};

export default RegisterCollabBtn;
