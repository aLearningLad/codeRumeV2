import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

export default OptionsBtn;
