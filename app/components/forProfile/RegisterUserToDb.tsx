"use client";

import { IregisterUserToDb } from "@/lib/interfaces";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { TiTick } from "react-icons/ti";

const RegisterUserToDb: React.FC<IregisterUserToDb> = ({
  display_name,
  email,
  user_id,
  isNameEdit,
  setIsNameEdit,
  setFetchAgain,
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
      router.push("/");

      if (setFetchAgain) {
        setFetchAgain(true);
      }
    }
  };

  return (
    <div
      className={` w-full ${
        isNameEdit ? "h-fit my-3" : "h-60"
      } flex flex-col items-center justify-center `}
    >
      <span
        className={`text-[16px] ${
          isNameEdit ? "hidden" : "flex justify-center"
        } `}
      >
        Is your name <b className=" text-2xl mr-2 ml-2">{display_name}</b>?
      </span>
      <button
        onClick={handleRegisterUserToDb}
        className=" w-full mt-5 py-1 text-center flex justify-center items-center hover:scale-95 transition-all duration-300 ease-in-out border-2 border-white hover:bg-transparent hover:text-white sm:w-10/12 md:w-8/12 lg:w-[17%] lg:px-6 h-14 rounded-lg bg-white text-black text-lg"
      >
        <TiTick size={30} className=" text-green-400" />
        <p>Proceed</p>
      </button>
    </div>
  );
};

export default RegisterUserToDb;
