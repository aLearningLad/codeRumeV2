"use client";

const RoomNavBtn: React.FC<Troomnavdata> = ({
  optionIcon,
  optionId,
  optionTitle,
  index,
}) => {
  return (
    <button
      className={` flex flex-col  gap-1 items-center justify-center text-center group hover:bg-slate-500/70 rounded-lg h-[90%] w-full  `}
      key={optionId}
    >
      {optionIcon}
      <p className=" text-[10px] text-white ">{optionTitle}</p>
    </button>
  );
};

export default RoomNavBtn;
