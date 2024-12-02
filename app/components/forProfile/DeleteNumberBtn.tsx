"use client";

import { Ideletenumberbtn } from "@/lib/interfaces";
import { FaTrashAlt } from "react-icons/fa";

const DeleteNumberBtn: React.FC<Ideletenumberbtn> = ({ userId }) => {
  const handleNumberDelete = async () => {};

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
