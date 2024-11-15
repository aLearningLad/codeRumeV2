import { navlinks } from "@/miscdata/navlinks";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full z-10 bg-white sticky top-0 flex h-[10vh] xl:h-[15vh] px-3 md:px-5 py-2 md:py-3 items-center justify-between">
      <div className="flex justify-start items-center px-2 gap-2 h-full">
        {/* HOME LINK  */}
        <Link className=" flex items-end gap-1 italic" href="/">
          <p className="text-[14px] font-semibold xl:font-normal lg:text-xl xl:text-2xl text-black">
            code
          </p>
          <p className="text-xl lg:text-4xl xl:text-5xl text-black font-extrabold">
            Rume
          </p>
        </Link>

        {/* DESKTOP NAV */}
        <section className=" hidden xl:flex h-full items-center justify-start gap-7 pl-12">
          {navlinks.map((navlink) => (
            <Link
              className="border-[1px] border-transparent p-3 rounded-lg hover:scale-90 transition duration-500 ease-in hover:border-black"
              key={navlink.id}
              href={navlink.uniqueLink}
            >
              {navlink.title}
            </Link>
          ))}
        </section>
      </div>

      {/* MOBILE LINKS & MENU BUTTON */}
      <div className="flex gap-5 h-full items-center p-2 lg:p-0">
        {/* <DynamicBtn />
          <OptionsBtn /> */}
        buttons come here
      </div>
    </nav>
  );
};

export default Navbar;
