"use client";

import { newsquares } from "@/miscdata/newsquares";
import Link from "next/link";
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
import { FaUserCheck } from "react-icons/fa";
import DeleteCollabBtn from "./components/forHome/DeleteCollabBtn";
import { GiTronArrow } from "react-icons/gi";
import { nanoid } from "nanoid";
import { TiThMenu } from "react-icons/ti";
import { FaAnglesRight, FaSquareCaretRight } from "react-icons/fa6";
import { loggedinnavdata } from "@/miscdata/loggedinnavdata";
import SignOutBtn from "./components/forHome/SignOutBtn";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const [userId, setUserId] = useState<string>();
  const [collabsData, setCollabsData] = useState<Tcollaborator[]>([]);

  // ====================> CSR FROM HERE <======================

  // get userId
  useEffect(() => {
    const getUserId = async () => {
      const { isLoaded, isSignedIn, user } = useUser();
      if (isSignedIn) {
        setUserId(user.id);
      }
      console.log("The user ID: ", userId);
    };

    getUserId();
  }, []);

  // get collabsData
  useEffect(() => {}, [userId]);

  return (
    <main className=" w-full flex-col text-black flex">
      <div className=" w-full ">
        <nav className=" w-full p-4 h-20 border-b-2 border-slate-500/20 ">
          <Dialog>
            <DialogTrigger>
              <div>
                <TiThMenu size={30} color="black" />
              </div>
            </DialogTrigger>
            <DialogContent className=" w-full border-none h-screen bg-slate-500/30 lg:h-[70vh] gap-5 md:gap-3 flex flex-col justify-center items-center ">
              <DialogTitle className=" mb-5 text-white font-normal text-xl ">
                Explore
              </DialogTitle>

              {loggedinnavdata.map(({ linkHref, linkId, linkTitle }) => (
                <Link
                  className=" w-full bg-white hover:scale-95 transition-all duration-300 hover:bg-slate-950 hover:text-white text-slate-950 rounded-sm sm:rounded-md md:rounded-lg h-16 flex justify-center items-center text-2xl md:text-xl lg:text-lg "
                  key={linkId}
                  href={linkHref}
                >
                  {linkTitle}
                </Link>
              ))}

              <SignOutBtn />
            </DialogContent>
          </Dialog>
        </nav>
        <header className=" mb-5 md:mb-7 lg:mb-12 mt-2 lg:mt-4">
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
                  <Dialog key={squareId}>
                    <DialogTrigger>
                      <div className=" text-white hover:bg-cyan-500 cursor-pointer mt-8 hover:scale-90 transition-all duration-300 ease-in-out w-full text-center p-3 flex flex-col justify-center items-center group h-40 lg:min-h-60 rounded-md sm:rounded-lg lg:rounded-2xl xl:rounded-3xl bg-slate-950 ">
                        <div className=" group-hover:hidden">{squareIcon}</div>
                        <h3 className=" text-2xl lg:text-lg group-hover:hidden">
                          {squareTitle}
                        </h3>
                        <p className=" text-xl lg:text-[14px] group-hover:hidden">
                          {squareBlurb}
                        </p>
                        <div className=" hidden p-2 items-center justify-center group-hover:flex-col gap-2 group-hover:flex h-[70%] w-full sm:w-10/12 md:w-8/12 rounded-lg text-white ">
                          <FaSquareCaretRight size={40} />
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
                    } hover:bg-cyan-500 ${
                      squareId === "ioOdn82bNW8d" && "bg-slate-950 text-white"
                    } cursor-pointer hover:scale-90 transition-all duration-300 ease-in-out w-full text-center p-3 flex flex-col justify-center items-center group h-40 lg:min-h-60 rounded-md sm:rounded-lg lg:rounded-2xl xl:rounded-3xl bg-slate-500/20 `}
                  >
                    <div className=" group-hover:hidden">{squareIcon}</div>
                    <h3 className=" text-2xl lg:text-lg group-hover:hidden">
                      {squareTitle}
                    </h3>
                    <p className=" text-xl lg:text-[14px] group-hover:hidden">
                      {squareBlurb}
                    </p>

                    <div className=" hidden p-2 items-center justify-center group-hover:flex-col gap-2 group-hover:flex h-[70%] w-full sm:w-10/12 md:w-8/12 rounded-lg text-white ">
                      <FaSquareCaretRight size={60} />
                      <p className=" text-xl lg:text-lg ">
                        {squareHoverPrompt}
                      </p>
                    </div>
                  </Link>
                )
            )}
          </div>

          {/* right side */}
          <div className=" hidden h-[60vh] lg:flex w-5/12 flex-row ">
            <div className=" h-full flex flex-col text-start pl-3">
              <h2 className=" text-4xl ">
                Explore <b className=" text-2xl">codeRume&copy;</b> as a
                networking site
              </h2>
              <h3 className=" mb-3">
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
                . . . and inumerable other topics to liven up your
                codeRume&copy; sessions
              </p>

              <Link
                className=" w-fit px-5 border-b-2 border-slate-950 flex justify-center items-center text-slate-900 gap-2 "
                href={`/collabroom/${nanoid()}`}
              >
                Take me there <FaAnglesRight size={20} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
