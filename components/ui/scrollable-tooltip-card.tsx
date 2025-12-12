"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";

interface ScrollableTooltipCardProps {
  children: React.ReactNode;
  className?: string;
  maxHeight?: string;
}

export function ScrollableTooltipCard({
  children,
  className,
  maxHeight = "max-h-[600px]",
}: ScrollableTooltipCardProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const scrollbarId = useMemo(() => `scrollbar-${Math.random().toString(36).substr(2, 9)}`, []);

  useEffect(() => {
    if (!scrollRef.current) return;

    // Remove any existing style with this ID
    const existingStyle = document.getElementById(scrollbarId);
    if (existingStyle) {
      existingStyle.remove();
    }

    const style = document.createElement("style");
    style.id = scrollbarId;
    style.textContent = `
      #${scrollbarId}::-webkit-scrollbar {
        width: 10px;
      }
      #${scrollbarId}::-webkit-scrollbar-track {
        background: transparent;
      }
      #${scrollbarId}::-webkit-scrollbar-thumb {
        background: ${isHovered ? "#71717a" : "transparent"};
        border-radius: 5px;
        transition: background 0.3s ease;
      }
      #${scrollbarId}::-webkit-scrollbar-thumb:hover {
        background: ${isHovered ? "#a1a1aa" : "transparent"};
      }
    `;
    document.head.appendChild(style);

    return () => {
      const styleToRemove = document.getElementById(scrollbarId);
      if (styleToRemove) {
        styleToRemove.remove();
      }
    };
  }, [isHovered, scrollbarId]);

  return (
    <div className={cn("relative", className)}>
      {/* Tooltip Card Container */}
      <div className="relative rounded-3xl border border-white/10 bg-neutral-950/80 backdrop-blur-xl overflow-hidden shadow-2xl">
        {/* Tooltip Pointer (Top Center) */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rotate-45 border-l border-t border-white/10 bg-neutral-950/80 backdrop-blur-xl" />
        
        {/* Scrollable Content with Custom Scrollbar */}
        <div
          ref={scrollRef}
          id={scrollbarId.current}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={cn("overflow-y-auto", maxHeight)}
          style={{
            scrollbarWidth: isHovered ? "thin" : "none",
            scrollbarColor: isHovered ? "#71717a transparent" : "transparent transparent",
          }}
        >
          <div className="p-8 md:p-12">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

