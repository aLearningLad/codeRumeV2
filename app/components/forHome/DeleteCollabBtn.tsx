"use client";

import { IDeleteCollabBtn } from "@/lib/interfaces";
import { FaTrashAlt } from "react-icons/fa";

const DeleteCollabBtn: React.FC<IDeleteCollabBtn> = ({ unique_id }) => {
  // delete a collaborator
  const handleDelete = async () => {
    try {
    } catch (error) {}
  };

  return (
    <button>
      <FaTrashAlt size={20} className=" text-red-600" />
    </button>
  );
};

export default DeleteCollabBtn;
