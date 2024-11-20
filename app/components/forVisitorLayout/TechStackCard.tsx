import Image from "next/image";
import Link from "next/link";

const TechStackCard: React.FC<TtechStack> = ({
  imgLink,
  techId,
  title,
  stackLink,
}) => {
  return (
    <Link
      target="_blank"
      href={stackLink}
      className="flex group hover:scale-95 hover:bg-black transition-all duration-300 flex-col group items-center justify-center text-center p-3 rounded-lg bg-neutral-400/30"
    >
      <Image
        className=" rounded-lg"
        src={imgLink}
        alt={`${title} logo`}
        width={40}
        height={40}
      />
      <p className=" text-[10px] text-black group-hover:text-white mt-1 ">
        {title}
      </p>
    </Link>
  );
};

export default TechStackCard;
