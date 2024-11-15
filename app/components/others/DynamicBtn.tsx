"use client";

import Link from "next/link";
import CTABtn from "./CTABtn";
import { useUser } from "@clerk/nextjs";

const DynamicBtn = () => {
  const user = useUser().user?.id;

  if (user) {
    return (
      <Link
        className="rounded-lg lg:rounded-xl w-fit h-fit py-3 px-5 bg-black text-white"
        href="#"
      >
        Feed
      </Link>
    );
  }

  return <CTABtn />;
};

export default DynamicBtn;
