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
      href={stackLink}
      className="flex flex-col items-center justify-center text-center"
    >
      <Image src={imgLink} alt={`${title} logo`} width={40} height={40} />
      <p className=" text-[12px] ">{title}</p>
    </Link>
  );
};

export default TechStackCard;
