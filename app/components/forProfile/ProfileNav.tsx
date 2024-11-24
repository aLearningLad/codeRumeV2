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
import { upcoming } from "@/miscdata/upcoming";

const ProfileNav = () => {
  const [isTabSelected, setIsTabSelected] = useState<string>(
    profileNavTabOptions.PR
  );

  return (
    <section className=" w-full flex flex-col items-start justify-center ">
      {/* profile */}
      <button
        onClick={() => setIsTabSelected(profileNavTabOptions.PR)}
        className={` w-full h-12 bg-black text-white hover:text-white hover:scale-95 transition-all duration-300 ease-in-out  rounded-md flex items-center justify-center text-[14px] `}
      >
        Profile
      </button>

      <Link
        href={"/"}
        className={` w-full my-3 h-12 text-slate-950 bg-white hover:bg-yellow-400 hover:text-white hover:scale-95 transition-all duration-300 ease-in-out rounded-md flex items-center justify-center text-[14px] `}
      >
        Home
      </Link>

      {/* advanced features */}
      <Dialog>
        <DialogTrigger
          className={` w-full my-5 h-12 text-slate-950 bg-white hover:bg-green-500 hover:text-white hover:scale-95 transition-all duration-300 ease-in-out rounded-md flex items-center justify-center text-[14px] `}
        >
          Advanced Features
        </DialogTrigger>
        <DialogContent className=" h-[80vh] flex flex-col justify-center ">
          <DialogHeader>
            <DialogTitle className=" text-center text-3xl md:text-2xl lg:text-lg  ">
              Upcoming Feature Notice
            </DialogTitle>
            <DialogDescription className=" text-center text-black lg:text-[14px] text-lg ">
              Below is a list of features that are either being developed, or
              are shortlisted for implementation into later versions of
              codeRume&copy;.
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-2xl bg-slate-500/10 p-5">
            <section className=" w-full h-[40vh] mt-6  overflow-auto flex flex-col items-center gap-5 p-3 ">
              {upcoming.map(
                ({
                  featureDesc,
                  featureId,
                  featureLikelihood,
                  featureTitle,
                }) => (
                  <div className=" w-full flex flex-col lg:min-h-26 max-h-fit text-center mb-10 lg:mb-16">
                    <h1 className=" text-2xl lg:text-lg font-semibold">
                      {featureTitle}
                    </h1>
                    <p className="text-[14px] mb-2">{featureDesc}</p>
                    <p className=" text-[12px] ">
                      Feature likelihood: {featureLikelihood}/5
                    </p>
                  </div>
                )
              )}
            </section>
          </div>
        </DialogContent>
      </Dialog>

      {/* about */}
      <Dialog>
        <DialogTrigger
          className={` w-full h-12 text-slate-950 bg-white hover:bg-orange-500 hover:text-white hover:scale-95 transition-all duration-300 ease-in-out rounded-md flex items-center justify-center text-[14px] `}
        >
          <button onClick={() => setIsTabSelected(profileNavTabOptions.AB)}>
            About
          </button>
        </DialogTrigger>
        <DialogContent className=" h-[60vh] flex flex-col justify-center">
          <DialogHeader>
            <DialogTitle className=" text-center">
              About this app & {"it's"} developer
            </DialogTitle>
            <DialogDescription className=" text-center text-black">
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
