"use client";

import useStore from "@/app/(store)/store";

interface SelectorBtnProps {
  tabName: string;
}

const SelectorBtn: React.FC<SelectorBtnProps> = ({ tabName }) => {
  const setSelectedTab = useStore((store: any) => store.setSelectedTab);
  const selectedTab = useStore((store: any) => store.selectedTab);
  const setObjectShown = useStore((store: any) => store.setObjectShown);

  const handleSelection = (tab: string) => {
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
    <button
      onClick={() => handleSelection(tabName)}
      className={`w-fit h-[90%] flex justify-center px-7 text-[16px] ${
        selectedTab === tabName
          ? " border-[1px] border-cyan-400 bg-cyan-600 text-white scale-90 text-[28px]"
          : "border-[1px] border-black/70 hover:bg-black hover:text-white"
      }  transition duration-500 ease-in-out items-center rounded-xl mx-6`}
    >
      {tabName}
    </button>
  );
};

export default SelectorBtn;
