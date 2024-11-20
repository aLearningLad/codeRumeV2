import { roomnavdata } from "@/miscdata/roomnavedata";
import RoomNavBtn from "./RoomNavBtn";

const RoomNav = () => {
  return (
    <nav className=" h-28 w-full flex justify-center py-1 ">
      <div className=" h-[85%] bg-slate-700/60 rounded-xl w-[90%] sm:w-[85%] lg:w-fit lg:px-28 flex justify-around lg:justify-center lg:gap-8 items-center">
        {roomnavdata.map(({ optionIcon, optionId, optionTitle, index }) => (
          <RoomNavBtn
            optionIcon={optionIcon}
            optionId={optionId}
            optionTitle={optionTitle}
            key={optionId}
            index={index}
          />
        ))}
      </div>
    </nav>
  );
};

export default RoomNav;
