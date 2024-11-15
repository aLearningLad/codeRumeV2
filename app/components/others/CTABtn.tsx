"use client";

import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const CTABtn = () => {
  return (
    // <div>
    //   <button className="rounded-lg lg:rounded-xl w-fit h-fit py-3 px-5 bg-black text-white">
    //     Get Started
    //   </button>
    // </div>
    <Dialog>
      <DialogTrigger className="rounded-lg lg:rounded-xl w-fit h-fit py-3 px-5 bg-black text-white">
        {/* <button className="rounded-lg lg:rounded-xl w-fit h-fit py-3 px-5 bg-black text-white"> */}
        Get Started
        {/* </button> */}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CTABtn;
