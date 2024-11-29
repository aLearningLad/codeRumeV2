import { Istore } from "@/lib/interfaces";
import { create } from "zustand";

const useStore: any = create<Istore>()((set: any) => ({
  //INITIAL VALUES
  promoImage: "/assets/learning.png",
  selectedTab: "C++",
  objectShown: 0,
  modalOpen: false,

  // CHANGE FUNCTIONS
  setPromoImage: (state: string | null) => set({ promoImage: state }),
  setSelectedTab: (state: string | null) => set({ selectedTab: state }),
  setObjectShown: (state: number) => set({ objectShown: state }),
  setModalOpen: (state: boolean) => set({ modalOpen: state }),
}));

export default useStore;
