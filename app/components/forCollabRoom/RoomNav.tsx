"use client";

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
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { useClerk, useUser } from "@clerk/nextjs";
import { Iroomnav } from "@/lib/interfaces";
import RegisterCollabBtn from "../forHome/RegisterCollabBtn";
import { FaUserCheck } from "react-icons/fa";
import DeleteCollabBtn from "../forHome/DeleteCollabBtn";

const RoomNav: React.FC<Iroomnav> = ({ collaboratorList }) => {
  const [isEndModalOpen, setIsEndModalOpen] = useState<boolean>(false);
  const user = useUser().user;

  // states for invite
  const [emailText, setEmailText] = useState<string | null>(
    "Ay! You've been invited to a coding session!"
  );
  const [subjectLine, setSubjectLine] = useState<string>(
    "Java fintech app coding session"
  );
  const [sessionHost, setSessionHost] = useState(user?.fullName);
  const [potentialCollaborators, setPotentialCollaborators] = useState<
    string[]
  >(["mocmanca@gmail.com", "leapingbulls@gmail.com"]);
  const [startsAt, setStartsAt] = useState<string | null>("21h30");
  const [primaryLang, setPrimaryLang] = useState<string>();
  const [framework, setFramework] = useState<string>();
  const [sessionLength, setSessionLength] = useState<string | null>(
    "Around an hour"
  );
  const [expMemberCount, setExpMemberCount] = useState<number>(4);

  const { signOut } = useClerk();

  const router = useRouter();

  // end the session & push to profile
  const handleSessionEnd = () => {
    router.push("/profile");
    toast.success("Session ended . . .");
  };

  // sign out of session and redirect to landing
  const handleSignOut = () => {
    signOut({ redirectUrl: "/" });
    toast.success("Signing out . . .");
  };

  // invite collaborators to a session
  const handleInvite = async () => {
    try {
      await fetch("/api/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailText,
          subjectLine,
          sessionHost,
          potentialCollaborators,
          startsAt,
          primaryLang,
          framework,
          sessionLength,
          expMemberCount,
        }),
      });
    } catch (error) {
      console.log("Error sending invite info from clientside: ", error);
    }
  };

  return (
    <nav className=" h-28 w-full flex justify-center py-1 ">
      <div className=" h-[85%] bg-slate-700/60 rounded-xl w-[90%] sm:w-[85%] lg:w-[35%] lg:px-13 flex justify-around lg:justify-center lg:gap-8 items-center px-2 sm:px-3 md:px-5">
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
              <DialogTitle className=" text-center">Invite Friends</DialogTitle>
              <DialogDescription className=" w-full flex text-center text-black">
                Send an email invitation to your collaborators. They will
                receive a link to join this room.
              </DialogDescription>
            </DialogHeader>
            <section className=" w-full h-[60vh] flex flex-col overflow-auto ">
              <div className=" w-full my-5 flex flex-col min-h-fit py-2 px-3 text-center gap-1 ">
                {/* primary lang  */}
                <label htmlFor="">Primary Coding Language</label>
                <input
                  type="text"
                  value={primaryLang}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPrimaryLang(e.target.value)
                  }
                  placeholder="Eg. Typescript, C++ or Ruby"
                  className=" h-12 focus:scale-95 transition-all duration-300 px-3 bg-slate-950 text-white text-[14px] rounded-sm "
                />
              </div>
              <div className=" w-full my-5 flex flex-col min-h-fit py-2 px-3 text-center gap-1 ">
                {/* framework */}
                <label htmlFor="">Framework(s) Being Used</label>
                <input
                  type="text"
                  value={framework}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFramework(e.target.value)
                  }
                  placeholder="Eg. NextJS, Rails etc."
                  className=" h-12 focus:scale-95 transition-all duration-300 px-3 bg-slate-950 text-white text-[14px] rounded-sm "
                />
              </div>
              <div className=" w-full my-5 flex flex-col min-h-fit py-2 px-3 text-center gap-1 ">
                {/* session length  */}
                <label htmlFor="">Session Length</label>
                <select
                  className=" min-h-12 focus:scale-95 transition-all duration-300 px-3 bg-slate-950 text-white text-[14px] rounded-sm "
                  name=""
                  id=""
                >
                  <option value="">Select . . .</option>
                  <option value="15">1. Quick recap (15 minutes)</option>
                  <option value="30">2. Short code-along (30 minutes)</option>
                  <option value="45">3. Extensive (45 minutes)</option>
                  <option value="60">4. Full standup (1 hour)</option>
                  <option value="90">5. Oh boy, oh boy! (1h30min)</option>
                </select>
              </div>
              <div className=" w-full my-5 flex flex-col h-fit py-2 px-3 text-center gap-1 ">
                {/* expected members count  */}
                <label htmlFor="">How many people do you plan to invite?</label>
                <select
                  className=" h-12 focus:scale-95 transition-all duration-300 px-3 bg-slate-950 text-white text-[14px] rounded-sm "
                  name=""
                  id=""
                >
                  <option value="">Select . . .</option>
                  <option value="1">1. Just one</option>
                  <option value="3">2. Two or three</option>
                  <option value="10">3. Maybe ten, not sure</option>
                  <option value="50">5. A lot!</option>
                </select>
              </div>

              {/* dialog with list of collaborators ---> edit this so it calls data from Redis */}
              <div className=" w-full my-5 flex flex-col h-fit py-2 px-3 text-center gap-1 ">
                {/* expected members count  */}
                <label htmlFor="">Who are you inviting?</label>
                <Dialog>
                  <DialogTrigger className=" h-12 focus:scale-95 transition-all duration-300 px-3 bg-slate-950 text-white text-[14px] rounded-sm ">
                    Open Collaborators List
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className=" text-center ">
                        Invite others to your codeRume
                      </DialogTitle>
                      <DialogDescription className=" text-center text-black ">
                        Choose from a list of people {"you've"} coded alongside
                        in the past
                      </DialogDescription>
                    </DialogHeader>
                    <section className=" h-[80vh] lg:h-[75vh] bg-slate-500/10 p-3 rounded-lg ">
                      {collaboratorList.length > 0 ? (
                        <div>
                          {collaboratorList.map((person) => (
                            <div className=" bg-slate-950 rounded-md h-16 text-white ">
                              {person.email}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className=" w-full h-full flex flex-col p-2 text-center">
                          <section className=" w-full h-[70vh] overflow-auto flex flex-col items-center ">
                            {collaboratorList && collaboratorList.length > 0 ? (
                              <div className=" w-full h-full flex-col flex ">
                                <div className=" w-full h-[60%] bg-neutral-400/30 rounded-lg flex flex-col p-2 ">
                                  <h3 className=" text-center mb-2">
                                    Your current collaborators list
                                  </h3>
                                  <div className=" w-full h-full p-2 gap-5 sm:gap-4 md:gap-3 flex flex-col overflow-auto bg-slate-950 rounded-lg text-white">
                                    {collaboratorList.map((person: any) => (
                                      <div
                                        className=" min-h-12 flex bg-slate-500/50 rounded-md py-1 px-3"
                                        key={person.unique_id}
                                      >
                                        <div className=" flex items-center h-full">
                                          <FaUserCheck size={20} />
                                        </div>
                                        <p className=" w-full h-full flex justify-center items-center">
                                          {person.email}
                                        </p>
                                        <DeleteCollabBtn
                                          key={person.unique_id}
                                          unique_id={person.unique_id}
                                        />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <h3 className=" text-black text-center mt-3 ">
                                  You can easily register even more
                                  collaborators
                                </h3>
                                <div>
                                  {/* inputs  */}
                                  <div className=" w-full h-[40%]">
                                    <label
                                      className=" text-lg lg:text-[14px] "
                                      htmlFor=""
                                    >
                                      Email
                                    </label>
                                    <RegisterCollabBtn />
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className=" h-full flex w-full flex-col text-center justify-center items-center ">
                                <h2 className=" text-2xl font-semibold  ">
                                  You {"don't"} currently have any collaborators
                                  registered
                                </h2>
                                <p>
                                  {" "}
                                  Try adding a collaborator now. Simply save
                                  their email, and {"you'll"} be able to invite
                                  easily when you're ready
                                </p>

                                {/* inputs */}
                                <div className=" w-full mt-8">
                                  <label
                                    className=" text-lg lg:text-[14px] "
                                    htmlFor=""
                                  >
                                    Email
                                  </label>
                                  <RegisterCollabBtn />
                                </div>
                              </div>
                            )}
                          </section>
                        </div>
                      )}
                    </section>
                  </DialogContent>
                </Dialog>
              </div>

              <button
                className=" min-h-20 mb-12 rounded-md bg-slate-950 text-white text-lg flex justify-center items-center w-full"
                onClick={handleInvite}
              >
                Send Invite
              </button>
            </section>
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
          <DialogContent className=" py-20">
            <section className=" flex w-full flex-col p-2">
              <button
                onClick={handleSignOut}
                className=" w-full border-4 border-slate-950 hover:scale-95 transition-all duration-300 hover:bg-transparent hover:text-slate-950 h-20 flex justify-center items-center text-lg bg-slate-950 text-white rounded-md"
              >
                Sign out
              </button>
              <Link
                className=" w-full my-5 border-4 border-slate-950 hover:scale-95 transition-all duration-300 hover:bg-transparent hover:text-slate-950 h-20 flex justify-center items-center text-lg bg-slate-950 text-white rounded-md"
                href={"/profile"}
              >
                Profile
              </Link>
              <Link
                className=" w-full border-4 border-slate-950 hover:scale-95 transition-all duration-300 hover:bg-transparent hover:text-slate-950 h-20 flex justify-center items-center text-lg bg-slate-950 text-white rounded-md"
                href={"#"}
              >
                About the developer
              </Link>
            </section>
          </DialogContent>
        </Dialog>

        {/* session end dialog */}
        <Dialog open={isEndModalOpen} onOpenChange={setIsEndModalOpen}>
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
              <DialogTitle className=" text-center">
                Hang on there, are you absolutely sure?
              </DialogTitle>
              <DialogDescription className=" text-center text-black">
                This will your participation in this codeRume session. All code
                not saved to a textfile on your system will be lost . . .
              </DialogDescription>
            </DialogHeader>
            <section className=" px-5 h-[30vh] w-full flex flex-col justify-center items-center gap-5">
              <button
                onClick={handleSessionEnd}
                className=" h-16 w-full bg-black hover:scale-90 transition-all duration-300 ease-in-out hover:bg-red-500 text-white text-lg rounded-lg"
              >
                End Session
              </button>
              <button
                onClick={() => setIsEndModalOpen(false)}
                className=" w-full h-16 hover:scale-90 transition-all duration-300 ease-in-out bg-black hover:bg-green-500 rounded-lg text-white text-lg "
              >
                Stay in session
              </button>
            </section>
          </DialogContent>
        </Dialog>
      </div>
    </nav>
  );
};

export default RoomNav;
