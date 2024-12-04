"use client";

import { IregisterUserToDb } from "@/lib/interfaces";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const RegisterUserToDb: React.FC<IregisterUserToDb> = ({
  display_name,
  email,
  user_id,
}) => {
  const router = useRouter();

  // register user to db
  const handleRegisterUserToDb = async () => {
    try {
      const result = await fetch("/api/registerUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ display_name, email, user_id }),
      });
    } catch (error) {
      console.log("Error inserting data into db: ", error);
    } finally {
      toast.success("Saved!");
      router.refresh();
    }
  };

  return (
    <div className=" w-full h-60 flex flex-col items-center justify-center gap-5 ">
      <p className=" text -[16px]">
        Is this your name: <b className=" text-xl">{display_name}</b>
      </p>
      <button
        onClick={handleRegisterUserToDb}
        className=" w-full py-1 text-center hover:scale-95 transition-all duration-300 ease-in-out border-2 border-white hover:bg-transparent hover:text-white sm:w-10/12 md:w-8/12 lg:w-fit lg:px-6 h-14 rounded-md bg-white text-black text-lg"
      >
        Yes, attach this to my profile
      </button>
    </div>
  );
};

export default RegisterUserToDb;
