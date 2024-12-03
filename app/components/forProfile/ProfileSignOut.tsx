"use client";

import { useClerk } from "@clerk/nextjs";
import toast from "react-hot-toast";

const ProfileSignOut = () => {
  const { signOut } = useClerk();

  // sign out of session and redirect to landing
  const handleSignOut = () => {
    signOut({ redirectUrl: "/" });
    toast.success("Signing out . . .");
  };

  return (
    <button
      onClick={handleSignOut}
      className=" w-[90%] absolute hover:scale-95 transition-all rounded-md bottom-3 ease-in-out flex h-12 text-[14px] justify-center items-center bg-white text-slate-950 "
    >
      Sign Out
    </button>
  );
};

export default ProfileSignOut;
