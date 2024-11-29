import DynamicPromo from "./DynamicPromo";
import DynamicPrompt from "./DynamicPrompt";
import DynamicSelector from "./DynamicSelector";

const UseCases = () => {
  return (
    <div className="w-full h-[90vh] xl:h-[130vh] bg-neutral-100/80 rounded-lg md:rounded-xl lg:rounded-2xl xl:rounded-3xl p-5 md:p-3 lg:p-5 xl:p-8 flex flex-col">
      <h1 className="text-3xl xl:text-5xl text-black mb-4 lg:mb-8">
        See how different <br className="hidden xl:flex" /> developers use{" "}
        <i className="text-[32px]">
          code <b>Rume</b>
        </i>
      </h1>
      <DynamicSelector />
      <DynamicPromo />
      <DynamicPrompt />
    </div>
  );
};

export default UseCases;
