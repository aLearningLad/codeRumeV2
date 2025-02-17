"use client";

import { pricinginfotiles } from "@/miscdata/pricingtileinfo";
import { motion } from "framer-motion";

const tileVariants = {
  hidden: { opacity: 0, x: 0, scale: 0 },
  visible: (direction: string) => ({
    opacity: 1,
    x: direction === "left" ? -20 : direction === "right" ? 100 : 0,
    scale: direction === "center" ? 1.1 : 1, // "inflate" middle tile slightly
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 20,
      delay: 0.2, // so I'll delay a bit for stagger effect
    },
  }),
};

const PricingSlides = () => {
  return (
    <div className=" w-full min-h-[50vh] border-4 border-black  p-2 md:p-5 lg:p-7 flex flex-col items-center">
      {pricinginfotiles.map(
        ({ description, id, price, subheading, tileImg, title }, index) => {
          // direction based on tile's position
          const direction =
            index === 0 ? "left" : index === 2 ? "right" : "center";

          return (
            <motion.div
              key={id}
              className=" w-full h-[40px] bg-black rounded-lg text-white flex flex-col items-center justify-center gap-2 my-4 lg:my-6"
              variants={tileVariants}
              initial="hidden"
              animate="visible"
              custom={direction}
            ></motion.div>
          );
        }
      )}
    </div>
  );
};

export default PricingSlides;
