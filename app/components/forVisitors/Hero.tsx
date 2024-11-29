import Link from "next/link";
import HeroDynamic from "./HeroDynamic";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
        <Dialog>
          <DialogTrigger className="w-full xl:w-1/2 hover:bg-cyan-500 transition duration-300 ease-in hover:border-transparent py-5 flex justify-center items-center text-xl border-[1px] border-black text-black rounded-lg">
            <div>See how it works</div>
          </DialogTrigger>
          <DialogContent className=" p-5 lg:p-12 min-h-[80vh] lg:min-h-[60vh] flex justify-center items-center flex-col  ">
            <DialogHeader>
              <DialogTitle className=" w-full flex  lg:text-xl text-4xl sm:text-3xl md:text-2xl justify-center items-center text-center mb-2">
                The little pieces that work together
              </DialogTitle>
              <DialogDescription className=" text-black gap-5 flex flex-col h-[50vh] text-lg lg:text-[14px] text-center overflow-auto ">
                <p>
                  {" "}
                  codeRume&copy; by HillSawft uses real-time APIs to make
                  collaborative coding easy and fun.{" "}
                </p>{" "}
                <p>
                  Although NextJS is a full-stack Typescript framework, with
                  loads of support for API development and routing, it's
                  serverless architecture heavily constrains what is achievable
                  with packages like Socket.io.
                </p>
                <p>
                  So instead, codeRume makes use of the{" "}
                  <Link
                    className=" underline text-cyan-600 text-lg font-semibold "
                    target="_blank"
                    href={"/https://pusher.com/"}
                  >
                    PusherJS
                  </Link>{" "}
                  real-time API. This powers each coding {"session's"} chat
                  interactivity where users can banter, exchange ideas, and
                  discuss their code.
                </p>
                <p>
                  <Link
                    target="_blank"
                    href={"/https://www.npmjs.com/package/zustand"}
                    className="underline text-cyan-600 text-lg font-semibold"
                  >
                    Zustand
                  </Link>{" "}
                  manages global state, allowing seamless triggering of updates
                  across components that {"aren't"}
                  do not have a parent-child relationship on the DOM.
                </p>
                <p>
                  <Link
                    target="_blank"
                    href={"/https://liveblocks.io/"}
                    className="underline text-cyan-600 text-lg font-semibold"
                  >
                    {"Liveblock's"}
                  </Link>{" "}
                  realtime IDE emulator powers the coding session functionality
                  that allows live collaboration, while all Auth logic is left
                  to Clerk.
                </p>
                <p>
                  codeRume&copy; uses a serverless postgreSQL database by{" "}
                  <Link
                    className="underline text-cyan-600 text-lg font-semibold"
                    target="_blank"
                    href={"/https://neon.tech/home"}
                  >
                    NeonDB
                  </Link>
                  .{" "}
                </p>
                <p>
                  The app was built by{" "}
                  <Link
                    className=" text-2xl text-cyan-600 underline "
                    target="_blank"
                    href={"#"}
                  >
                    Thato
                  </Link>
                  . Head over to the developer portfolio to see more projects,
                  including outlines for those still in the works.
                </p>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </section>
    </div>
  );
};

export default Hero;
