"use client";

import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { isNewOptions } from "@/lib/enums";
import { SignUp, useSignIn, useSignUp } from "@clerk/nextjs";
import { OAuthStrategy } from "@clerk/types";
import { FcGoogle } from "react-icons/fc";
import { IoFolderOpen } from "react-icons/io5";
import { IoArrowForwardSharp } from "react-icons/io5";
import { IoArrowBackSharp } from "react-icons/io5";

const CTABtn = () => {
  const [isNew, setIsNew] = useState<string>(isNewOptions.N);
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
      // redirectUrl: "https://cuddly-parakeet-97.accounts.dev/sign-in",
      redirectUrl: "https://cuddly-parakeet-97.accounts.dev/sign-in",
      //   https://cuddly-parakeet-97.accounts.dev/sign-in
      redirectUrlComplete: "/profile",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="rounded-lg lg:rounded-xl hover:scale-95 transition-all duration-300 ease-in-out w-fit h-fit py-3 px-5 bg-black text-white">
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
              {"I'm"} new here, let me look around{" "}
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

export default CTABtn;
