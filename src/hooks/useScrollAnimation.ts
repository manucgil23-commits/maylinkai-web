import { useScroll, useTransform } from "framer-motion";
import { RefObject } from "react";

export const useScrollAnimation = (ref: RefObject<HTMLElement>) => {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const particlesY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  
  return { particlesY, contentY };
};
