"use client";

import { ChangeEvent, useState } from "react";

const RegisterCollabBtn = () => {
  const [email, setEmail] = useState<string>();

  // save new collaborator to DB
  const handleRegisterCollab = async () => {
    try {
    } catch (error) {
      console.log("Error while registering new collaborator: ", error);
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
      <button className=" hover:bg-slate-950 hover:scale-95 transition-all duration-300 ease-in-out w-full text-lg bg-green-500 text-white h-16 rounded-lg ">
        Register
      </button>
    </div>
  );
};

export default RegisterCollabBtn;
