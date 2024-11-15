import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const HeroDynamic = () => {
  const userId = useUser().user?.id;

  if (userId) {
    return (
      <Link
        className=" w-full border-[1px] hover:bg-cyan-500 transition duration-300 ease-in hover:border-transparent border-black xl:w-1/2 py-5 flex justify-center items-center text-xl bg-black text-white rounded-lg"
        href="/communityfeed"
      >
        Browse
      </Link>
    );
  }

  return (
    <Link
      className=" w-full border-[1px] hover:bg-cyan-500 transition duration-300 ease-in hover:border-transparent border-black xl:w-1/2 py-5 flex justify-center items-center text-xl bg-black text-white rounded-lg"
      href="/signin"
    >
      Get Started
    </Link>
  );
};

export default HeroDynamic;
