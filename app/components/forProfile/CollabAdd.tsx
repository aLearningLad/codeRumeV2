"use client";

import React, { ChangeEvent, useState } from "react";
import ProfileCollabBtn from "./ProfileCollabBtn";
import { Iprofilecollabbtn } from "@/lib/interfaces";

const CollabAdd: React.FC<Iprofilecollabbtn> = ({ userId }) => {
  const [email, setEmail] = useState<string>("");

  return (
    <div className=" flex gap-1 ">
      <input
        className=" w-full focus:scale-95 transition-all duration-300 ease-in-out text-lg lg:text-[14px] placeholder:text-[12px] sm:w-10/12 md:w-10/12 lg:w-8/12 h-20 lg:h-12 py-1 rounded-sm outline-none px-2 bg-slate-500/20"
        type="text"
        placeholder="Eg. thatCoder@gmail.com"
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
      />
      <ProfileCollabBtn userId={userId} email={email} />
    </div>
  );
};

export default CollabAdd;
