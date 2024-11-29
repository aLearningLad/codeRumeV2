"use client";

import useStore from "@/app/(store)/store";
import { Istore } from "@/lib/interfaces";
import SelectorBtn from "./SelectorBtn";

const DynamicSelector = () => {
  const setSelectedTab = useStore((store: Istore) => store.setSelectedTab);
  const setObjectShown = useStore((store: Istore) => store.setObjectShown);

  const handleDropDown = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tab = e.target.value;
    setSelectedTab(tab);

    switch (tab) {
      case "C++":
        setObjectShown(0);
        break;
      case "Swift":
        setObjectShown(4);
        break;
      case "Java":
        setObjectShown(5);
        break;
      case "Ruby":
        setObjectShown(3);
        break;
      case "Python":
        setObjectShown(1);
        break;
      case "Rust":
        setObjectShown(2);
        break;
    }
  };

  return (
    <div className="w-full h-[10%] rounded-xl focus:outline-none outline-none active:outline-none mb-2 sm:mb-5">
      {/* DROP DOWN FOR NON-PC SCREENS */}
      <select
        className="w-full h-full text-xl px-5 text-black font-extrabold flex xl:hidden"
        name="language"
        id="language"
        onChange={(e) => handleDropDown(e)}
      >
        <option value="C++">1. C++</option>
        <option value="Python">2. Python</option>
        <option value="Rust">3. Rust</option>
        <option value="Ruby">4. Ruby</option>
        <option value="Swift">5. Swift</option>
        <option value="Java">6. Java</option>
      </select>

      {/* SELECTORS FOR PC SCREENS  */}
      <section className="hidden xl:flex w-full h-full items-center justify-start">
        <SelectorBtn tabName="C++" />
        <SelectorBtn tabName="Ruby" />
        <SelectorBtn tabName="Python" />
        <SelectorBtn tabName="Rust" />
        <SelectorBtn tabName="Swift" />
        <SelectorBtn tabName="Java" />
      </section>
    </div>
  );
};

export default DynamicSelector;
