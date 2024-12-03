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
      toast.error("Phone number not deleted");
      console.log("Error deleting phone number: ", error);
    }
  };

  return (
    <button
      onClick={handleNumberDelete}
      className=" bg-slate-500/30 group-hover:scale-95 p-2 group-hover:bg-white transition-all duration-300 ease-in-out rounded-md "
    >
      <FaTrashAlt size={20} className=" text-red-500" />
    </button>
  );
};

export default DeleteNumberBtn;
