import Link from "next/link";
import HeroDynamic from "./HeroDynamic";

const Hero = () => {
  return (
    <div className="h-[90vh] lg:h-[85vh] xl:h-[60vh] px-2 md:px-4 flex flex-col items-center justify-center w-full">
      <h1 className=" text-[52px] lg:text-[66px] text-center leading-[80px]">
        A better <br className=" flex xl:hidden" /> way to learn
      </h1>
      <span className="mt-3 text-center text-[18px] xl:text-[19px] w-full lg:w-8/12 xl:w-6/12">
        With codeRume, you can easily learn from fellow developers. Share your
        code, ask questions, and help others by engaging with a new community of
        dreamers and builders.
      </span>
      <p className=" mt-5 mb-2 text-lg">Join the codeRume revolution.</p>
      <section className="flex xl:flex-row w-full lg:w-8/12 xl:w-4/12 flex-col items-center gap-2 mt-3 md:mt-5">
        <HeroDynamic />
        <Link
          className="w-full xl:w-1/2 hover:bg-cyan-500 transition duration-300 ease-in hover:border-transparent py-5 flex justify-center items-center text-xl border-[1px] border-black text-black rounded-lg"
          href="/signin"
        >
          See how it works
        </Link>
      </section>
    </div>
  );
};

export default Hero;
