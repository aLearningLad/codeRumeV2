import UniqueCard from "./UniqueCard";

const Unique = () => {
  // USED CARD COMPONENTS
  // 1.COLLABORATIVE LEARNING
  // 2. AI POWERED TUTORING

  return (
    <div className=" w-full h-[80vh] lg:h-screen xl:h-[180vh] px-2 md:px-3 xl:px-28 pt-7 md:pt-9 xl:pt-12 flex justify-between flex-col">
      {/* HEADING  */}
      <section className=" h-[7%]  w-full">
        <h1 className="text-3xl xl:text-5xl text-black text-center xl:text-start mb-1 lg:mb-8">
          What makes{" "}
          <i className="text-[32px]">
            code <b>Rume</b>
          </i>{" "}
          unique
        </h1>
      </section>

      {/* CARD 1  */}

      <UniqueCard
        btnText="Learn more"
        heading="Collaborative work & learning"
        blurb="Connect with others to build, learn, and share your knowledge. Leverage the power of community within workspaces, allowing you and others to fast-track your skillsets beyond just coding."
        imgLink="/assets/teams.png"
      />

      <hr className=" w-full h-[2px] bg-neutral-400 rounded-[30px] my-3" />

      {/* CARD 2  */}

      <UniqueCard
        heading="AI-Powered tutoring - Coming soon"
        blurb="Make use of artificial intelligence to seek out and fix bugs, explain code, or give suggestions on how you might improve existing snippets."
        btnText="More on code Rume AI"
        imgLink="/assets/ai.png"
      />
    </div>
  );
};

export default Unique;
