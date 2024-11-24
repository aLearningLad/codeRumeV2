// "use client";

import { squares } from "@/miscdata/squares";
import { useClerk, useUser } from "@clerk/nextjs";
import Image from "next/image";
// import { useEffect, useState } from "react";

export default function Home() {
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

  const falsesquares = [1, 2, 3, 4];

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
          <p className=" text-[26px] pb-6 xl:pb-0">
            For developers, by a developer
          </p>
        </header>

        <section className=" flex ">
          {/* left side squares */}
          <div className=" w-full px-3 sm:px-5 md:px-7 lg:px-12 gap-5 py-5 lg:w-7/12 grid grid-cols-1 md:grid-cols-2 ">
            {falsesquares.map((square) => (
              <div className=" w-full min-h-52 rounded-md bg-slate-50/60">
                a square
              </div>
            ))}
          </div>

          {/* right side with video */}
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
