"use client";

import { ChangeEvent, useState } from "react";
import { FaPlus } from "react-icons/fa";

const ProfileNewPhoneNumber = () => {
  const [isInputShown, setIsInputShown] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>();

  return (
    <div className=" w-full flex flex-col gap-2 items-start">
      {isInputShown ? (
        <div className=" flex flex-col items-center gap-2 text-center ">
          <label htmlFor="">Enter your phone number</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPhoneNumber(e.target.value)
            }
          />
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
