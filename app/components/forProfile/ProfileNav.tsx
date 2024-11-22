"use client";

import { profileNavTabOptions } from "@/lib/enums";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { ImGithub } from "react-icons/im";
import Image from "next/image";

const ProfileNav = () => {
  const [isTabSelected, setIsTabSelected] = useState<string>(
    profileNavTabOptions.PR
  );

  return (
    <section className=" w-full flex flex-col items-start justify-center ">
      {/* profile */}
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

      {/* advanced features */}
      <Dialog>
        <DialogTrigger
          className={` w-full my-5 h-12 bg-slate-950/30 text-white rounded-md flex items-center justify-center text-[14px] `}
        >
          <button>Advanced Features</button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* about */}
      <Dialog>
        <DialogTrigger
          className={` w-full h-12 bg-slate-950/30 text-white rounded-md flex items-center justify-center text-[14px] `}
        >
          <button onClick={() => setIsTabSelected(profileNavTabOptions.AB)}>
            About
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>About this app</DialogTitle>
            <DialogDescription>
              View the source code for this platform on Github, or visit the
              developer's portfolio & learn more about them, their previous
              work, and their future plans
            </DialogDescription>
          </DialogHeader>
          <section className=" w-full flex items-center justify-normal gap-5 ">
            <Link
              className=" w-full hover:scale-105 transition-all duration-300 ease-in-out h-44 rounded-lg bg-slate-950 text-white flex flex-col gap-3 justify-center items-center"
              href={"#"}
            >
              <ImGithub size={60} className=" text-white" />
              <p className=" text-[12px] text-white font-light">
                View source code
              </p>
            </Link>
            <Link
              className=" w-full hover:scale-105 transition-all duration-300 ease-in-out h-44 rounded-lg flex-col gap-3 bg-slate-950 text-white flex justify-center items-center"
              href={"#"}
            >
              <Image
                alt="codeRume logo"
                src="/assets/crlogo.png"
                width={60}
                height={60}
                className=" rounded-full bg-white"
              />
              <p className=" text-[12px] text-white font-light">
                About the developer
              </p>
            </Link>
          </section>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProfileNav;
