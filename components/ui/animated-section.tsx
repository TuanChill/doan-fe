"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import type { Variant } from "framer-motion";

type AnimatedSectionProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  animation?: "fadeIn" | "fadeUp" | "fadeLeft" | "fadeRight" | "scale" | "none";
};

type AnimationVariants = {
  hidden: Variant;
  visible: Variant;
};

export default function AnimatedSection({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
  animation = "fadeUp",
}: AnimatedSectionProps) {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [hasAnimated, setHasAnimated] = useState(false);

  // Animation variants
  const variants: Record<string, AnimationVariants> = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration } },
    },
    fadeUp: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: { duration } },
    },
    fadeLeft: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0, transition: { duration } },
    },
    fadeRight: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0, transition: { duration } },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1, transition: { duration } },
    },
    none: {
      hidden: {},
      visible: {},
    },
  };

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
      controls.start("visible");
    }
  }, [controls, inView, hasAnimated]);

  // If client-side hydration is complete, render with animations
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants[animation]}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
