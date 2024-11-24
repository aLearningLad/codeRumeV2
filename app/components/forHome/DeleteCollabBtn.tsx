"use client";

import { IDeleteCollabBtn } from "@/lib/interfaces";
import { useRouter } from "next/navigation";
import { FaTrashAlt } from "react-icons/fa";

const DeleteCollabBtn: React.FC<IDeleteCollabBtn> = ({ unique_id }) => {
  const router = useRouter();

  // delete a collaborator
  const handleDelete = async () => {
    try {
      const collabSaveResults = await fetch("/api/deleteCollaborator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          unique_id,
        }),
      });
      router.refresh();
    } catch (error) {
      console.log("Error while saving collaborator to db: ", error);
    }
  };

  return (
    <button onClick={handleDelete}>
      <FaTrashAlt size={20} className=" text-red-600" />
    </button>
  );
};

export default DeleteCollabBtn;
