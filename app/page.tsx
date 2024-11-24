// "use client";

import { newsquares } from "@/miscdata/newsquares";
import { squares } from "@/miscdata/squares";
import { useClerk, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineStart } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { currentUser } from "@clerk/nextjs/server";
import sql from "@/lib/db";
import RegisterCollabBtn from "./components/forHome/RegisterCollabBtn";
import { FaTrashAlt, FaUserCheck } from "react-icons/fa";
import DeleteCollabBtn from "./components/forHome/DeleteCollabBtn";
import { GiTronArrow } from "react-icons/gi";
import { nanoid } from "nanoid";

// import { useEffect, useState } from "react";

export default async function Home() {
  // const [emailBody, setEmailBody] = useState<string>(
  //   "Hi there! If you recieve this, it means your email sender service is working!"
  // );
  // const [subjectLine, setSubjectLine] = useState<string>(
  //   "This is just a test subject line"
  // );
  // const [sessionHost, setSessionHost] = useState<string>(
  //   "Thato, also known as HIM!"
  // );
  // const [potentialCollaborators, setPotentialCollaborators] = useState<
  //   string[]
  // >(["mocmanca@gmail.com", "leapingbulls@gmail.com"]);

  // const { signOut } = useClerk();

  // send invite to codeRume session
  // const handleSend = async () => {
  //   try {
  //     const response = await fetch("/api/invite", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         emailBody,
  //         subjectLine,
  //         sessionHost,
  //         potentialCollaborators,
  //       }),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       console.log("Email to workers sent successfully", data);
  //     } else {
  //       console.error("Failed to send invites: ", data.message);
  //       alert("Error sending email to admin");
  //     }
  //   } catch (error) {
  //     console.log("Error while sending email: ", error);
  //   }
  // };
  const user = await currentUser();
  const userId = user?.id;

  const collabsData = await sql(
    `SELECT * FROM all_collaborators WHERE friend_id = $1`,
    [userId]
  );

  console.log("Here is the list of collaborators: ", collabsData);

  return (
    <main className=" w-full flex-col bg-slate-900 text-white flex">
      {/* Welcome!
      <button onClick={() => signOut({ redirectUrl: "/" })}>Sign Out</button>
      <button onClick={handleSend}>Send Invite</button> */}
      <div className=" w-full ">
        <nav className=" w-full h-20 border-b-2 border-slate-500/20 ">
          Modal opener here
        </nav>
        <header className=" mb-5 md:mb-7 lg:mb-12">
          <h1 className=" text-3xl pb-4 text-center xl:text-start lg:text-[60px] xl:text-[70px] xl:leading-[62px]">
            Collaborative coding <br className=" xl:flex hidden" /> made a
            little easier
          </h1>
          <p className=" text-[26px] pb-6 xl:pb-0 text-center lg:text-start">
            For developers, by a developer
          </p>
        </header>

        <section className=" flex ">
          {/* left side squares */}
          <div className=" w-full px-3 sm:px-5 md:px-7 lg:px-12 gap-5 py-5 lg:w-7/12 grid grid-cols-1 md:grid-cols-2 ">
            {newsquares.map(
              ({
                squareBlurb,
                squareHoverPrompt,
                squareIcon,
                squareId,
                squareTitle,
                squarehref,
              }) =>
                squareId === "okJ92Hbs" ? (
                  <Dialog>
                    <DialogTrigger>
                      <div className=" hover:bg-cyan-500/30 cursor-pointer mt-8 hover:scale-90 transition-all duration-300 ease-in-out w-full text-center p-3 flex flex-col justify-center items-center group h-40 lg:min-h-60 rounded-md sm:rounded-lg lg:rounded-2xl xl:rounded-3xl bg-slate-500/20 ">
                        <div className=" group-hover:hidden">{squareIcon}</div>
                        <h3 className=" text-2xl lg:text-lg group-hover:hidden">
                          {squareTitle}
                        </h3>
                        <p className=" text-xl lg:text-[14px] group-hover:hidden">
                          {squareBlurb}
                        </p>
                        <div className=" hidden p-2 items-center justify-center group-hover:flex-col gap-2 group-hover:flex h-[70%] w-full sm:w-10/12 md:w-8/12 rounded-lg text-white ">
                          <MdOutlineStart size={40} />
                          <p className=" text-xl lg:text-lg ">
                            {squareHoverPrompt}
                          </p>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className=" text-center ">
                          Curate collaborator list
                        </DialogTitle>
                        <DialogDescription className=" text-black text-center ">
                          Carefully manage your list of friends. People you can
                          invite at any time to help you during your coding
                          sessions
                        </DialogDescription>
                      </DialogHeader>
                      <section className=" w-full h-[70vh] overflow-auto flex flex-col items-center ">
                        {collabsData && collabsData.length > 0 ? (
                          <div className=" w-full h-full flex-col flex ">
                            <div className=" w-full h-[60%] bg-neutral-400/30 rounded-lg flex flex-col p-2 ">
                              <h3 className=" text-center mb-2">
                                Your current collaborators list
                              </h3>
                              <div className=" w-full h-full p-2 gap-5 sm:gap-4 md:gap-3 flex flex-col overflow-auto bg-slate-950 rounded-lg text-white">
                                {collabsData.map((card: any) => (
                                  <div
                                    className=" min-h-12 flex bg-slate-500/50 rounded-md py-1 px-3"
                                    key={card.unique_id}
                                  >
                                    <div className=" flex items-center h-full">
                                      <FaUserCheck size={20} />
                                    </div>
                                    <p className=" w-full h-full flex justify-center items-center">
                                      {card.email}
                                    </p>
                                    <DeleteCollabBtn
                                      key={card.unique_id}
                                      unique_id={card.unique_id}
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                            <h3 className=" text-black text-center mt-3 ">
                              You can easily register even more collaborators
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
                              Try adding a collaborator now. Simply save their
                              email, and {"you'll"} be able to invite easily
                              when you're ready
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
                    </DialogContent>
                  </Dialog>
                ) : (
                  <Link
                    href={squarehref as string}
                    key={squareId}
                    className={` ${
                      squareId === "jd7777181" && "mt-8"
                    } hover:bg-cyan-500/30 cursor-pointer hover:scale-90 transition-all duration-300 ease-in-out w-full text-center p-3 flex flex-col justify-center items-center group h-40 lg:min-h-60 rounded-md sm:rounded-lg lg:rounded-2xl xl:rounded-3xl bg-slate-500/20 `}
                  >
                    <div className=" group-hover:hidden">{squareIcon}</div>
                    <h3 className=" text-2xl lg:text-lg group-hover:hidden">
                      {squareTitle}
                    </h3>
                    <p className=" text-xl lg:text-[14px] group-hover:hidden">
                      {squareBlurb}
                    </p>

                    <div className=" hidden p-2 items-center justify-center group-hover:flex-col gap-2 group-hover:flex h-[70%] w-full sm:w-10/12 md:w-8/12 rounded-lg text-white ">
                      <MdOutlineStart size={40} />
                      <p className=" text-xl lg:text-lg ">
                        {squareHoverPrompt}
                      </p>
                    </div>
                  </Link>
                )
            )}
          </div>

          {/* right side with video */}
          <div className=" hidden h-[60vh] lg:flex w-5/12 flex-row ">
            <video
              src="/assets/feedvid1.mp4"
              width={1920}
              height={1080}
              autoPlay={true}
              controls={false}
              loop
              muted
              className=" w-fit overflow-clip rounded-xl  "
            />
            <div className=" h-full flex flex-col text-start pl-3">
              <h2 className=" text-2xl">
                <b>codeRume&copy;</b>
                as a networking site
              </h2>
              <h3>
                Explore other facets of programming. Perhaps try centering your
                codeRume&copy; session chats around topics such as:
              </h3>
              <ol className=" flex flex-col gap-5 mb-7">
                <li className=" flex gap-2 text-start items-center w-full">
                  <GiTronArrow /> Systems design
                </li>
                <li className=" flex gap-2 text-start items-center w-full">
                  <GiTronArrow />
                  Data (collecting, cleaning & saving)
                </li>
                <li className=" flex gap-2 text-start items-center w-full">
                  <GiTronArrow />
                  Interview prep via algorithmic thinking & problem solving
                </li>
                <li className=" flex gap-2 text-start items-center w-full">
                  <GiTronArrow />
                  Data structure usage and tradeoffs
                </li>
                <li className=" flex gap-2 text-start items-center w-full">
                  <GiTronArrow />
                  Machine learning, choosing models to train, and tradeoffs
                </li>
              </ol>
              <p className=" mb-5">
                {" "}
                . . . and inumerable other topics to liven up your
                codeRume&copy; sessions
              </p>

              <Link
                className=" w-8/12 bg-white rounded-md flex justify-center items-center text-black "
                href={`/collabroom/${nanoid()}`}
              >
                Take me there!
              </Link>
            </div>
          </div>
        </section>

        {/* <section className="w-full xl:w-8/12 flex flex-col text-center xl:text-start">
          <h1 className=" text-3xl pb-4 text-center xl:text-start lg:text-[60px] xl:text-[70px] xl:leading-[62px]">
            Collaborative learning <br className=" xl:flex hidden" /> made a
            little easier
          </h1>
          <p className=" text-[26px] pb-6 xl:pb-0">
            For developers, by a developer, bruv
          </p> */}
        {/* <section className="xl:h-full w-full px-3 md:px-4 lg:px-5 xl:px-7 flex flex-col xl:flex-row justify-center xl:justify-normal items-center xl:items-end">
            <div className="w-full xl:w-4/12 h-[70%] xl:h-[60%] relative overflow-clip rounded-xl lg:rounded-2xl">
              <Image
                src="/assets/feed1.png"
                className=" absolute"
                fill
                alt="groupwork"
              />
            </div>
            <div className=" w-[1px] xl:flex hidden h-full bg-neutral-300 mx-2" />
            <div className="w-8/12 h-full flex flex-col justify-start pt-8 xl:pt-0 xl:justify-end items-start">
              <h1 className="text-xl">Dive in! What do you need help with?</h1>
              <div className=" w-full h-[60%] grid grid-cols-1 lg:grid-cols-2 gap-2 xl:gap-4 px-2 mt-3">
                {squares.map((tab) => (
                  <button
                    key={tab.id}
                    className="w-full p-2 hover:scale-90 flex-col group h-full border-[3px] border-neutral-300 hover:bg-cyan-500 transition duration-500 ease-in hover:text-white hover:border-none active:border-none flex justify-center items-center rounded-lg lg:rounded-2xl"
                  >
                    <p className="text-xl xl:text-2xl group-hover:hidden text-neutral-600 group-hover:text-white">
                      {tab.title}
                    </p>
                    <p className="text-[12px] hidden xl:group-hover:flex">
                      {tab.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </section>
        </section> */}
        {/* RIGHT SIDE VIDEO   */}
        {/* <section className="w-full xl:w-4/12 justify-between gap-2 hidden xl:flex flex-col rounded-lg md:rounded-xl lg:rounded-2xl">
          <div className=" w-full h-[90%] hidden xl:flex flex-col gap-4 overflow-clip rounded-lg md:rounded-xl lg:rounded-2xl">
            <video
              src="/assets/feedvid1.mp4"
              width={1920}
              height={1080}
              autoPlay={true}
              controls={false}
              loop
              muted
            />
          </div>
          <button className="h-[10%] w-full text-black flex justify-center items-center rounded-lg md:rounded-xl">
            <p className=" text-2xl">Explore</p>
            <div className="h-[1px] w-[80px] bg-neutral-500 " />
          </button>
        </section> */}
      </div>
    </main>
  );
}
