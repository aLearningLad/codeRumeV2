"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// register user to db
export const handleRegisterUserToDb = async (
  display_name: string,
  email: string,
  user_id: string
) => {
  const router = useRouter();
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
