import { IoSettingsSharp } from "react-icons/io5";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const EditProfileBtn = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className=" h-20 lg:h-10 w-full sm:w-10/12 md:w-8/12 lg:w-fit hover:scale-95 px-12 bg-slate-500/20 group hover:bg-white hover:text-black transition-all duration-300 ease-in-out rounded-md flex justify-center items-center gap-1 ">
          <IoSettingsSharp
            size={20}
            className=" text-white group-hover:text-black "
          />
          Edit Profile
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className=" text-center">Premium Feature</DialogTitle>
          <DialogDescription className=" text-center text-black ">
            This action is currently reserved for a selected group of users
            running the beta program. After launch, premium features such as
            LLM-based tutoring, multiple accounts, and profile changes will be
            available to the general public for subscription.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>{" "}
    </Dialog>
  );
};

export default EditProfileBtn;
