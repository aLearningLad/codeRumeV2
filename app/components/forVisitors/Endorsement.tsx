import { endorsementdata } from "@/miscdata/endorsements";
import Image from "next/image";

const Endorsements = () => {
  return (
    <div className="gap-5 mt-9 md:mt-12 xl:mt-24 w-full h-[60vh] md:h-[55vh] xl:h-[35vh] flex flex-col text-center items-center  ">
      <h1 className=" text-xl font-[600] text-neutral-600">
        300+ Forbes Global 2000 companies choose code Rume
      </h1>
      <section className="flex w-full p-1 md:p-2 xl:p-5 flex-col items-center justify-around xl:flex-row xl:justify-between">
        {endorsementdata.map((company) => (
          <Image
            src={company.companyLogo}
            key={company.companyId}
            width={120}
            height={70}
            alt="endorserCompany"
          />
        ))}
      </section>
    </div>
  );
};

export default Endorsements;
