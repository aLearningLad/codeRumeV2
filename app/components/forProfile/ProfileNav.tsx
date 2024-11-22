"use client";

import { profileNavTabOptions } from "@/lib/enums";
import { useState } from "react";

const ProfileNav = () => {
  const [isTabSelected, setIsTabSelected] = useState<string>(
    profileNavTabOptions.PR
  );

  return (
    <section className=" w-full flex flex-col items-start justify-center ">
      <button
        onClick={() => setIsTabSelected(profileNavTabOptions.PR)}
        className={` w-full h-12 ${
          isTabSelected === profileNavTabOptions.PR
            ? " bg-neutral-100/10 text-white"
            : "bg-slate-950/30 text-white"
        }  rounded-md flex items-center justify-center text-[14px] `}
      >
        Profile
      </button>
      <button
        className={` w-full my-5 h-12 bg-slate-950/30 text-white rounded-md flex items-center justify-center text-[14px] `}
      >
        Advanced Features
      </button>
      <button
        onClick={() => setIsTabSelected(profileNavTabOptions.AB)}
        className={` w-full h-12 ${
          isTabSelected === profileNavTabOptions.AB
            ? " bg-neutral-100/10 text-white"
            : "bg-slate-950/30 text-white"
        } rounded-md flex items-center justify-center text-[14px] `}
      >
        About
      </button>
    </section>
  );
};

export default ProfileNav;
