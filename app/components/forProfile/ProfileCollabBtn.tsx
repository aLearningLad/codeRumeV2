"use client";

import sql from "@/lib/db";
import { Iprofilecollabbtn } from "@/lib/interfaces";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";

const ProfileCollabBtn: React.FC<Iprofilecollabbtn> = ({ userId, email }) => {
  const [clicked, setClicked] = useState<boolean>(false);
  const [unique_id, set_unique_id] = useState<string>();

  const router = useRouter();

  useEffect(() => {
    const uniqueValue = nanoid();

    set_unique_id(uniqueValue);
  }, [clicked]);

  const handleAddCollab = async () => {
    try {
      await fetch("/api/saveCollaborator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ unique_id, userId, email }),
      });
      toast.success("Collaborator saved!");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong. Please try again");
      console.log("Error while uploading collaborator: ", error);
    } finally {
      setClicked((prev) => !prev);
    }
  };

  return (
    <button
      onClick={handleAddCollab}
      className=" w-fit h-fit p-3 bg-white rounded-sm text-black"
    >
      <FaPlus size={14} />
    </button>
  );
};

export default ProfileCollabBtn;
