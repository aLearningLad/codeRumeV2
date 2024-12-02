"use client";

import { ChangeEvent, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoCloudDone } from "react-icons/io5";
import { ImCross } from "react-icons/im";
import { Iprofilenewphonenumber } from "@/lib/interfaces";

const ProfileNewPhoneNumber: React.FC<Iprofilenewphonenumber> = ({
  userId,
}) => {
  const [isInputShown, setIsInputShown] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>();

  const handleSaveNumber = async () => {
    try {
      const result = await fetch("/api/addPhoneNumber", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber, userId }),
      });
    } catch (error) {
      console.log("Error saving new number: ", error);
    }
  };

  return (
    <div className=" w-full flex flex-col gap-2 items-start">
      {isInputShown ? (
        <div className=" flex flex-col items-start gap-2 text-start ">
          <label className="" htmlFor="">
            Enter your phone number
          </label>
          <span className=" flex gap-2 items-center">
            <input
              type="text"
              value={phoneNumber}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPhoneNumber(e.target.value)
              }
              className=" h-12 lg:h-10 rounded-md outline-none focus:scale-95 transition-all duration-300 ease-in text-black placeholder:text-neutral-600 px-2 text-[14px] "
              placeholder="Eg. 012 367 8901"
            />
            <button
              onClick={handleSaveNumber}
              className=" w-fit px-2 h-full bg-white rounded-md"
            >
              <IoCloudDone size={26} className=" text-green-600" />
            </button>

            <button
              onClick={() => setIsInputShown(false)}
              className="w-fit px-2 h-full bg-white rounded-md "
            >
              <ImCross size={22} color="red" />
            </button>
          </span>
        </div>
      ) : (
        <>
          You don't currently have any phone numbers <br /> attached to this
          account
          <button
            onClick={() => setIsInputShown(true)}
            className="flex hover:scale-95 transition-all group duration-300 ease-in-out hover:bg-white hover:text-black gap-2 items-center justify-center mt-5 px-8 h-20 lg:h-10 bg-slate-500/20 rounded-md "
          >
            <FaPlus size={12} className=" text-white group-hover:text-black " />
            <p className=" text-[12px] ">Add a phone number</p>
          </button>
        </>
      )}
    </div>
  );
};

export default ProfileNewPhoneNumber;
