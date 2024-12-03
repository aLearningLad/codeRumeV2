"use client";

import { Ideletenumberbtn } from "@/lib/interfaces";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";

const DeleteNumberBtn: React.FC<Ideletenumberbtn> = ({ userId }) => {
  const router = useRouter();
  const handleNumberDelete = async () => {
    try {
      await fetch("/api/deletePhoneNumber", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      toast.success("Phone number removed");
      router.refresh();
    } catch (error) {
      console.log("Error deleting phone number: ", error);
    }
  };

  return (
    <button
      onClick={handleNumberDelete}
      className=" bg-white h-full px-2 rounded-md "
    >
      <FaTrashAlt size={24} className=" text-red-500" />
    </button>
  );
};

export default DeleteNumberBtn;
