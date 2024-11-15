import Image from "next/image";

interface UniqueCardProps {
  heading: string;
  blurb: string;
  btnText: string;
  imgLink: string;
}

const UniqueCard: React.FC<UniqueCardProps> = ({
  blurb,
  btnText,
  heading,
  imgLink,
}) => {
  return (
    <div className="w-full h-fit xl:h-[43%] flex flex-col xl:flex-row items-center justify-center pb-6 lg:p-3 xl:p-5">
      {/* TEXT SECTION  */}
      <section className="flex flex-col text-center items-center xl:text-start xl:items-start w-full h-full xl:w-1/2 xl:pr-5">
        <h2 className=" text-2xl font-[600]">{heading}</h2>
        <h4 className=" text-[16px]">{blurb}</h4>
        <span className=" w-full mt-5 md:mt-8 lg:mt-10 xl:mt-14">
          <button className=" w-full text-[20px] border-[1px] border-black hover:bg-transparent hover:text-black transition duration-500 ease-in-out lg:w-fit lg:px-3 h-fit py-2 lg:py-3 rounded-[6px] bg-black text-white">
            {btnText}
          </button>
        </span>
      </section>

      {/* IMAGE SECTION  */}
      <section className="hidden xl:flex xl:w-1/2 xl:h-full lg:p-5 justify-start items-start relative">
        <Image src={imgLink} alt="uniqueImage" fill className=" rounded-2xl" />
      </section>
    </div>
  );
};

export default UniqueCard;
