import { FcInvite } from "react-icons/fc";
import { FaWindowClose } from "react-icons/fa";
import { SiCodeblocks } from "react-icons/si";

export const roomnavdata: Troomnavdata[] = [
  {
    // btn => opens a dialog
    optionId: "d7wdh82",
    optionTitle: "Invite Friends",
    optionIcon: (
      <FcInvite size={20} className=" text-white group-hover:hidden " />
    ),
    index: 0,
  },
  {
    // btn => open dialog with options: visit profile, sign out
    optionId: "d92hswhu2",
    optionTitle: "Options",
    optionIcon: <SiCodeblocks size={36} className=" text-white" />,
    index: 1,
  },
  {
    // btn => open dialog to confirm ending of session. Push to profile if so
    optionId: "w13uhd98s",
    optionTitle: "End Session",
    optionIcon: <FaWindowClose size={20} className=" text-white" />,
    index: 2,
  },
];
