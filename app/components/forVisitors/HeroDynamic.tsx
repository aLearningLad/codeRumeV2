"use client";

import { useSignIn, useSignUp, useUser } from "@clerk/nextjs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { isNewOptions } from "@/lib/enums";
import { useState } from "react";
import { OAuthStrategy } from "@clerk/types";
import { FcGoogle } from "react-icons/fc";
import {
  IoArrowBackSharp,
  IoArrowForwardSharp,
  IoFolderOpen,
} from "react-icons/io5";

const HeroDynamic = () => {
  const userId = useUser().user?.id;
  const [isNew, setIsNew] = useState<string>(isNewOptions.N);

  const { signIn } = useSignIn();
  const { signUp } = useSignUp();

  if (!signIn) return null;

  // this is for new users
  const signUpWith = (strategy: OAuthStrategy) => {
    return signUp?.authenticateWithRedirect({
      strategy,
      redirectUrl: "https://cuddly-parakeet-97.accounts.dev/sign-up",
      redirectUrlComplete: "/profile",
    });
  };

  // this is for users with an exisitng account
  const signInWith = (strategy: OAuthStrategy) => {
    return signIn.authenticateWithRedirect({
      strategy,
      redirectUrl: "https://cuddly-parakeet-97.accounts.dev/sign-in",
      //   https://cuddly-parakeet-97.accounts.dev/sign-in
      redirectUrlComplete: "/profile",
    });
  };

  if (userId) {
    return (
      <Link
        className=" w-full border-[1px] hover:bg-cyan-500 transition duration-300 ease-in hover:border-transparent border-black xl:w-1/2 py-5 flex justify-center items-center text-xl bg-black text-white rounded-lg"
        href="/communityfeed"
      >
        Browse
      </Link>
    );
  }

  return (
    <Dialog>
      <DialogTrigger className=" w-full border-[1px] hover:bg-cyan-500 transition duration-300 ease-in hover:border-transparent border-black xl:w-1/2 py-5 flex justify-center items-center text-xl bg-black text-white rounded-lg">
        Get Started
      </DialogTrigger>
      <DialogContent className=" p-5 lg:p-12 h-[60vh] flex flex-col justify-center ">
        <DialogHeader>
          <DialogTitle className=" w-full flex justify-center items-center text-2xl ">
            {isNew === isNewOptions.Y ? "Register" : "Sign in"}
          </DialogTitle>
          <DialogDescription className=" w-full flex justify-center items-center text-center text-black text-xl">
            Join codeRume and begin collaborating with friends
          </DialogDescription>
        </DialogHeader>

        {(isNew === isNewOptions.N && (
          <div className="w-full h-full flex justify-center items-center flex-col gap-5">
            <button
              className=" w-full h-20 bg-neutral-300/20 hover:scale-95 transition-all duration-500 ease-in-out group text-black hover:bg-black hover:border-black rounded-xl border-4 border-neutral-200/60 flex justify-center items-center flex-col "
              onClick={() => signInWith("oauth_google")}
            >
              <FcGoogle size={26} />
              <p className=" text-[14px] text-black group-hover:text-white ">
                Sign in with Google
              </p>
            </button>
            <button
              onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                setIsNew(isNewOptions.Y)
              }
              className=" flex gap-1  group flex-row items-center hover:scale-105 transition-all duration-300 ease-in-out justify-center rounded-xl px-4 h-8 border-[1px] hover:bg-neutral-200 border-neutral-300 "
            >
              {"I'm"} new here, let me register{" "}
              <IoFolderOpen
                size={16}
                className=" text-cyan-600 group-hover:text-black"
              />
            </button>
          </div>
        )) ||
          (isNew === isNewOptions.Y && (
            <div className=" w-full h-full flex flex-col items-center justify-center gap-5">
              <button
                onClick={() => signUpWith("oauth_google")}
                className=" flex gap-1  group flex-row items-center hover:scale-105 transition-all duration-300 ease-in-out justify-center rounded-xl px-4 h-8 border-[1px] hover:bg-neutral-200 border-neutral-300 "
              >
                Register my account <IoArrowForwardSharp size={24} />
              </button>
              <button
                onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                  setIsNew(isNewOptions.N)
                }
                className=" flex gap-1  group flex-row items-center hover:scale-105 transition-all duration-300 ease-in-out justify-center rounded-xl px-4 h-8 border-[1px] hover:bg-neutral-200 border-neutral-300 "
              >
                <IoArrowBackSharp size={24} />I have an account! Let me sign in!
              </button>
            </div>
          ))}
      </DialogContent>
    </Dialog>
  );
};

export default HeroDynamic;
