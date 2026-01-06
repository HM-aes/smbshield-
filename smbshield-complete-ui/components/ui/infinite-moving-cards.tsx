"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
    icon?: LucideIcon;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards",
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse",
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <li
              className="group relative w-[380px] max-w-full shrink-0 rounded-2xl border border-zinc-700/50 bg-zinc-900/40 px-6 py-6 backdrop-blur-md transition-all duration-300 md:w-[420px] hover:border-zinc-600 hover:bg-zinc-900/60 dark:border-zinc-700/50 dark:bg-zinc-900/40"
              key={item.name + idx}
            >
              <blockquote className="relative">
                {/* OWASP Tag Badge */}
                <div className="mb-4 flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-400 ring-1 ring-red-500/20">
                    {item.title}
                  </span>
                  {Icon && (
                    <Icon className="h-6 w-6 text-red-400/60 transition-colors group-hover:text-red-400" />
                  )}
                </div>

                {/* Card Title */}
                <h3 className="relative z-20 mb-3 text-lg font-semibold text-zinc-100 dark:text-zinc-100">
                  {item.name}
                </h3>

                {/* Card Description */}
                <p className="relative z-20 text-sm leading-relaxed text-zinc-300 dark:text-zinc-300">
                  {item.quote}
                </p>

                {/* Glassmorphism glow effect on hover */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/5 via-transparent to-orange-500/5" />
                </div>
              </blockquote>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
