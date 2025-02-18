"use client";

import Image from "next/image";
import { Synchro, Community, Learning } from "@/public/assets";
import useStore from "@/app/(store)/store";
import { useEffect, useState } from "react";
import { dynamicpromoinfo } from "@/miscdata/dynamicpromoinfo";
import Link from "next/link";
import { Store } from "lucide-react";
import { promoimagesdata } from "@/miscdata/promoImages";

const DynamicPromo = () => {
  const [info, setInfo] = useState<Tdynamicpromoinfo>();
  const selectedTab = useStore((store: any) => store.selectedTab);
  const objectShown = useStore((store: any) => store.objectShown);
  const [imageIndex, setImageIndex] = useState<number>(3);

  const infoBlocks: Tdynamicpromoinfo[] = dynamicpromoinfo;

  // useffect to update image index with setInterval
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % promoimagesdata.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[50%] mb-8 xl:mb-2 xl:h-[80%] w-full flex justify-center items-center text-3xl text-white rounded-xl overflow-clip">
      <section className="w-full h-[40vh] xl:w-5/12 my-2 lg:my-0 lg:p-8 xl:px-2 xl:py-20 flex items-center justify-center xl:justify-end rounded-xl overflow-clip">
        <Image
          src={promoimagesdata[imageIndex]}
          // src={promoimagesdata[imageIndex]}
          alt="promoImage"
          className=" rounded-xl lg:rounded-2xl overflow-clip"
          width={300}
          height={300}
        />
      </section>

      {/* RIGHT SIDE ON DESKTOP, HIDDEN ON ALL SMALLER SCREENS */}
      <section className="hidden xl:flex xl:w-7/12 xl:h-full text-black pl-4 flex-col p-7">
        {/* TOP  */}
        <div className="w-full h-[70%] flex flex-col items-start text-start">
          <h3 className=" text-5xl">{selectedTab}</h3>
          <p className=" text-[14px]">{infoBlocks[objectShown].subheading}</p>
          <p className=" text-[18px]">{infoBlocks[objectShown].blurb}</p>
        </div>

        {/* BOTTOM  */}
        <div className="w-full h-[30%] flex items-end justify-start">
          <Link
            href={infoBlocks[objectShown].infoLink}
            target="_blank"
            className=" w-fit px-5 h-fit py-3 text-xl bg-black text-white rounded-xl"
          >
            {infoBlocks[objectShown].btnText}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default DynamicPromo;
