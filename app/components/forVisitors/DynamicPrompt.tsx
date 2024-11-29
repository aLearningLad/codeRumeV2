"use client";

import useStore from "@/app/(store)/store";
import { promotiles } from "@/miscdata/promotiles";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const DynamicPrompt = () => {
  const objectShown = useStore((store: any) => store.objectShown);

  return (
    <div className="w-full h-[40%] flex flex-col justify-start text-center pt-3 items-center">
      <span className=" w-full px-1 md:px-2 xl:px-24 mb-3">
        <h3 className=" text-[20px] flex gap-2 justify-center h-full">
          <div className=" h-full w-fit flex items-start ">
            <FaQuoteLeft className=" text-red-600" />
          </div>
          {promotiles[objectShown].quote}
          <div className="w-fit h-full flex items-end">
            <FaQuoteRight className=" text-cyan-600" />
          </div>
        </h3>
      </span>
      <span className=" w-full flex flex-col items-center justify-center text-center">
        <p className=" text-[16px] text-neutral-600 font-bold flex justify-center items-center gap-[3px]">
          <hr className="h-[2px] w-[20px] bg-black" />{" "}
          {promotiles[objectShown].author}, inventor of{" "}
          {promotiles[objectShown].language}
        </p>
        <p>{promotiles[objectShown].year}</p>
      </span>
    </div>
  );
};

export default DynamicPrompt;
