import { footerlinks } from "@/miscdata/footerlinks";

const Footer = () => {
  return (
    <footer className="w-full bg-neutral-800 text-white h-[35vh] md:h-[30vh] xl:h-[10vh] flex-col xl:flex-row items-center justify-around xl:justify-around flex">
      <h3 className="italic text-[14px]">2024 Hillsawft&copy;, Inc</h3>
      <h3 className="text-[14px]">Terms & Privacy</h3>
      <span className="w-full xl:w-[400px] justify-center xl:justify-center h-fit xl:h-full xl:px-5 xl:gap-4 flex items-center gap-1">
        {footerlinks.map((social) => (
          <div
            key={social.id}
            className="flex group flex-col items-center h-fit w-fit p-3 bg-black justify-center xl:w-[60px] xl:h-[60px] text-white xl:bg-black rounded-full"
          >
            {social.icon}
            <p className="hidden text-[10px] xl:group-hover:flex xl:group-hover:text-white transition duration-500 ease-in">
              {social.social}
            </p>
          </div>
        ))}
      </span>
    </footer>
  );
};

export default Footer;
