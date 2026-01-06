"use client";
import React, { useRef } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the component relative to the viewport
  // "start start": when top of ref meets top of viewport
  // "end start": when bottom of ref meets top of viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = [
    "var(--slate-900)",
    "var(--black)",
    "var(--neutral-900)",
  ];
  
  // Ensure we have colors for all cards
  const getBackgroundColor = (index: number) => {
    return backgroundColors[index % backgroundColors.length];
  };

  return (
    <motion.div
      // Create a smooth background transition container
      animate={{
        backgroundColor: getBackgroundColor(activeCard),
      }}
      className="w-full relative rounded-md p-10 space-y-10"
      ref={ref}
    >
      <div className="flex flex-col lg:flex-row justify-center relative items-start gap-10 lg:gap-20">
        
        {/* Left Side: Scrolling Content */}
        <div className="flex-1 max-w-2xl px-4">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-20 min-h-[60vh] flex flex-col justify-center">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-3xl font-bold text-slate-100 mb-4"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-lg text-slate-300 max-w-lg leading-relaxed"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          {/* Extra spacer at bottom to allow final card to be fully viewed comfortably */}
          <div className="h-40" />
        </div>

        {/* Right Side: Sticky Card */}
        {/* top-32 ensures it sticks below the navbar (~80px) + some buffer */}
        <div 
          className={cn(
            "hidden lg:block h-[500px] w-full max-w-md sticky top-32 overflow-hidden rounded-md bg-white",
            contentClassName
          )}
        >
          {/* Animate content transition */}
          <motion.div
            key={activeCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="h-full w-full"
          >
             {content[activeCard].content ?? null}
          </motion.div>
        </div>
        
      </div>
    </motion.div>
  );
};
