import Hero from "./Hero";
import Endorsements from "./Endorsement";
import UseCases from "./UseCases";
import Unique from "./Unique";
import ScalePromo from "./ScalePromo";

const VisitorLanding = () => {
  return (
    <div className="flex w-full px-2 md:px-5 lg:px-10 xl:px-24 flex-col">
      <Hero />
      <Endorsements />
      <UseCases />
      <Unique />
      <ScalePromo />
    </div>
  );
};

export default VisitorLanding;
