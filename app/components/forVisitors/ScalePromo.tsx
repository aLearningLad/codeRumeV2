import { ScalePromoInfo } from "@/miscdata/scalepromo";
import Link from "next/link";

const ScalePromo = () => {
  return (
    <div className="w-full h-[70vh] hidden xl:flex flex-col">
      <h1 className=" text-3xl xl:text-5xl">Learn. Share. Teach</h1>
      <section className="w-full h-[80%] xl:p-8 ">
        <div className="h-full w-full bg-cyan-600 text-white rounded-xl flex p-9 relative">
          {/* LEFT SIDE  */}
          <div className="h-full w-5/12 flex flex-col items-start">
            <h3 className=" text-[26px]">Community-based learning</h3>
            <p>
              Grow as a developer. Take notes from more experienced software
              professionals, learn novel tips and tricks, contribute to existing
              and open-source projects, and build a network of friends egged on
              by the same passion as you.
            </p>

            <Link
              href="/signin"
              className=" w-fit hover:bg-white hover:text-cyan-600 duration-300 transition ease-in px-3 h-fit py-2 border-[1px] border-white text-white rounded-lg text-2xl absolute bottom-6"
            >
              Get started
            </Link>
          </div>

          {/* RIGHT SIDE  */}
          <div className="h-full w-7/12 flex justify-between items-center gap-2">
            {ScalePromoInfo.map((btn) => (
              <Link
                className="w-full relative mx-4 h-[80%] flex justify-center items-center text-black group hover:bg-white transition duration-300 ease-in-out bg-white/70 rounded-xl"
                key={btn.id}
                href="/signin"
              >
                {btn.icon}

                <span className=" items-end gap-2 group-hover:text-black w-full h-fit absolute flex justify-center text-transparent bottom-3 transition duration-300 ease-in">
                  <p className=" text-[10px]">via</p>
                  <p className=" text-xl">{btn.provName}</p>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScalePromo;
