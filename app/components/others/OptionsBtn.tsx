import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { techStack } from "@/miscdata/techStack";
import TechStackCard from "../forVisitorLayout/TechStackCard";

const OptionsBtn = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <button className="h-full flex flex-col justify-center items-center gap-2 pr-5">
          <div className="w-[20px] h-[2px] bg-black rounded-md" />
          <div className="w-[20px] h-[2px] bg-black rounded-md" />
          <div className="w-[20px] h-[2px] bg-black rounded-md" />
        </button>
      </DialogTrigger>
      <DialogContent className=" p-5 lg:p-12 min-h-[60vh] flex justify-center items-center flex-col  ">
        <DialogHeader className=" mb-5">
          <DialogTitle className=" w-full flex justify-center items-center text-center mb-2">
            About this application
          </DialogTitle>
          <DialogDescription className=" text-black">
            <p>
              codeRume by HillSawft&copy; is a fun project that I built to
              better understand how to integrate live collaboration
              functionalities.
            </p>
            <br />
            <p>
              Although comfortable with socket.io, this project provided a new
              challenge due to the use of NextJS and it's serverless
              architecture. In deciding to forgo the need for a separate Express
              server, and not being keen to deploy outside of Vercel, an
              alternative was found: Enter <b>PusherJS</b>!
            </p>
            <br />
            <p>
              And so with many re-reads of PusherJs documentation, a lot of
              Googling, and temporarily giving up multiple times, the
              functionality came together after much trial and error.
            </p>
          </DialogDescription>
        </DialogHeader>
        <section className=" w-full flex flex-col items-center justify-center gap-1 bg-neutral-200/70 rounded-2xl p-4 ">
          <h3 className=" text-center text-[14px] ">
            Here are the documentation for some of the technology powering
            codeRume
          </h3>
          <div className=" w-full flex justify-around items-center">
            {techStack.map(({ imgLink, techId, title }) => (
              <TechStackCard
                imgLink={imgLink}
                techId={techId}
                title={title}
                key={techId}
              />
            ))}
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default OptionsBtn;
