"use client";

import * as React from "react";
import { OAuthStrategy } from "@clerk/types";
import { useSignIn } from "@clerk/nextjs";
import Link from "next/link";

const VisitorLanding = () => {
  const { signIn } = useSignIn();

  if (!signIn) return null;

  const signInWith = (strategy: OAuthStrategy) => {
    return signIn.authenticateWithRedirect({
      strategy,
      redirectUrl: "https://cuddly-parakeet-97.accounts.dev/sign-in",
      //   https://cuddly-parakeet-97.accounts.dev/sign-in
      redirectUrlComplete: "/profile",
    });
  };

  return (
    <div className=" w-full min-h-screen flex flex-col justify-center items-center ">
      This is the visitor landing page
      <button
        className=" w-3/12 h-16 bg-black text-white flex justify-center items-center"
        onClick={() => signInWith("oauth_google")}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default VisitorLanding;
