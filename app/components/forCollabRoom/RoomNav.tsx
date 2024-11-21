import { roomnavdata } from "@/miscdata/roomnavedata";
import RoomNavBtn from "./RoomNavBtn";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const RoomNav = () => {
  return (
    <nav className=" h-28 w-full flex justify-center py-1 ">
      <div className=" h-[85%] bg-slate-700/60 rounded-xl w-[90%] sm:w-[85%] lg:w-[35%] lg:px-13 flex justify-around lg:justify-center lg:gap-8 items-center">
        {/* {roomnavdata.map(({ optionIcon, optionId, optionTitle, index }) => (
          <RoomNavBtn
            optionIcon={optionIcon}
            optionId={optionId}
            optionTitle={optionTitle}
            key={optionId}
            index={index}
          />
        ))} */}
        {/* invite dialog */}
        <Dialog>
          <DialogTrigger className=" w-full h-full ">
            <RoomNavBtn
              index={roomnavdata[0].index}
              optionIcon={roomnavdata[0].optionIcon}
              optionId={roomnavdata[0].optionId}
              optionTitle={roomnavdata[0].optionTitle}
            />
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

        {/* options dialog */}
        <Dialog>
          <DialogTrigger className=" w-full h-full ">
            <RoomNavBtn
              index={roomnavdata[1].index}
              optionIcon={roomnavdata[1].optionIcon}
              optionId={roomnavdata[1].optionId}
              optionTitle={roomnavdata[1].optionTitle}
            />
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

        {/* session end dialog */}
        <Dialog>
          <DialogTrigger className=" w-full h-full ">
            <RoomNavBtn
              index={roomnavdata[2].index}
              optionIcon={roomnavdata[2].optionIcon}
              optionId={roomnavdata[2].optionId}
              optionTitle={roomnavdata[2].optionTitle}
            />
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
      </div>
    </nav>
  );
};

export default RoomNav;
