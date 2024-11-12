"use client";

import { IregisterUserToDb } from "@/lib/interfaces";
import { useRouter } from "next/navigation";

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
      router.refresh();
    }
  };

  return (
    <div className=" w-full h-60 flex flex-col items-center justify-center gap-5 ">
      <p>Is this your name: {display_name}</p>
      <button onClick={handleRegisterUserToDb}>Yes, save it to the DB!</button>
    </div>
  );
};

export default RegisterUserToDb;
