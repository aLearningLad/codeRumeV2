"use client";

import { useClerk } from "@clerk/nextjs";
import { FaSignOutAlt } from "react-icons/fa";

const SignOutBtn = () => {
  const { signOut } = useClerk();

  return (
    <button
      onClick={() => signOut({ redirectUrl: "/" })}
      className=" w-10/12 hover:bg-white hover:text-pink-500 gap-2 hover:scale-105 transition-all duration-300 ease-in-out flex justify-center items-center h-16 rounded-sm sm:rounded-md md:rounded-lg bg-pink-500 text-white mt-12 "
    >
      <FaSignOutAlt size={26} />
      Sign me out
    </button>
  );
};

export default SignOutBtn;
