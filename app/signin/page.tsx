"use client";

import { isNewOptions } from "@/lib/enums";
import { useState } from "react";
import { SignUp, useSignIn, useSignUp } from "@clerk/nextjs";
import { OAuthStrategy } from "@clerk/types";

const AltSignInPage = () => {
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

  //    This is the visitor landing page
  {
    (isNew === isNewOptions.N && (
      <div className="w-full h-full flex justify-center items-center flex-col gap-5">
        <button
          className=" w-3/12 h-16 bg-black text-white flex justify-center items-center"
          onClick={() => signInWith("oauth_google")}
        >
          Sign in with Google
        </button>
        <button
          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            setIsNew(isNewOptions.Y)
          }
        >
          I'm new here!
        </button>
      </div>
    )) ||
      (isNew === isNewOptions.Y && (
        <div className=" w-full h-full flex flex-col items-center justify-center gap-5">
          Let's get you signed up!
          <button
            onClick={() => signUpWith("oauth_google")}
            className=" h-16 w-3/12 bg-slate-950 text-white flex justify-center items-center text-center"
          >
            Yup, sign me up!
          </button>
          <button
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              setIsNew(isNewOptions.N)
            }
          >
            Nah, I know these parts. Let me sign in!
          </button>
        </div>
      ));
  }
};

export default AltSignInPage;
