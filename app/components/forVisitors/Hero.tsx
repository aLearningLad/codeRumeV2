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
                About this application
              </DialogTitle>
              <DialogDescription className=" text-black text-lg lg:text-[14px] ">
                <p>
                  codeRume by HillSawft&copy; is a fun project that I built to
                  better understand how to integrate live collaboration
                  functionalities.
                </p>
                <br />
                <p>
                  Although I have a fundemental grasp of websockets, this
                  project provided a new challenge due to the use of NextJS and
                  it's serverless architecture. In deciding to forgo the need
                  for a separate Express server, and not being keen to deploy
                  outside of Vercel, an alternative was found: Enter{" "}
                  <b>PusherJS</b>!
                </p>
                <br />
                <p>
                  And so with many re-reads of PusherJS documentation, a lot of
                  Googling, and temporarily giving up multiple times, the
                  functionality came together after much trial and error.
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
