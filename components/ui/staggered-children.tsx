"use client";

import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

type StaggeredChildrenProps = {
  children: React.ReactNode;
  containerClassName?: string;
  delay?: number;
  staggerDelay?: number;
  duration?: number;
  animation?: "fadeIn" | "fadeUp" | "fadeLeft" | "fadeRight" | "scale";
};

export default function StaggeredChildren({
  children,
  containerClassName = "",
  delay = 0,
  staggerDelay = 0.1,
  duration = 0.5,
  animation = "fadeUp",
}: StaggeredChildrenProps) {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  // Animation variants
  const getVariants = () => {
    switch (animation) {
      case "fadeIn":
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration } },
        };
      case "fadeUp":
        return {
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { duration } },
        };
      case "fadeLeft":
        return {
          hidden: { opacity: 0, x: -30 },
          visible: { opacity: 1, x: 0, transition: { duration } },
        };
      case "fadeRight":
        return {
          hidden: { opacity: 0, x: 30 },
          visible: { opacity: 1, x: 0, transition: { duration } },
        };
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1, transition: { duration } },
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration } },
        };
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      className={containerClassName}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div key={index} variants={getVariants()}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}
