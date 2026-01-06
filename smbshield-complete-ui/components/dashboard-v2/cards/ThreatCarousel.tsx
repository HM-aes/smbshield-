"use client"

import { useRef } from "react"
import { Newspaper, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ThreatCard } from "./ThreatCard"
import { MOCK_THREATS } from "../constants"

interface ThreatCarouselProps {
  onThreatClick?: (threatId: string) => void
}

export function ThreatCarousel({ onThreatClick }: ThreatCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "p-2 rounded-lg",
              "bg-slate-800/50 border border-slate-700/50"
            )}
          >
            <Newspaper className="w-5 h-5 text-slate-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Latest Threats</h3>
            <p className="text-xs text-slate-500">
              Security news and vulnerabilities
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Scroll Buttons */}
          <button
            onClick={() => scroll("left")}
            className={cn(
              "p-2 rounded-lg",
              "bg-slate-800/50 border border-slate-700/50",
              "text-slate-400 hover:text-white",
              "hover:bg-slate-700/50 hover:border-slate-600",
              "transition-all duration-200"
            )}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className={cn(
              "p-2 rounded-lg",
              "bg-slate-800/50 border border-slate-700/50",
              "text-slate-400 hover:text-white",
              "hover:bg-slate-700/50 hover:border-slate-600",
              "transition-all duration-200"
            )}
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* View All Link */}
          <Link
            href="/dashboard-v2/news"
            className={cn(
              "flex items-center gap-1 px-3 py-2 rounded-lg",
              "text-sm text-slate-400 hover:text-white",
              "hover:bg-slate-800/50",
              "transition-all duration-200"
            )}
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className={cn(
          "flex gap-4 overflow-x-auto pb-2",
          "scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent",
          // Hide scrollbar but keep functionality
          "[&::-webkit-scrollbar]:h-1.5",
          "[&::-webkit-scrollbar-track]:bg-transparent",
          "[&::-webkit-scrollbar-thumb]:bg-slate-700",
          "[&::-webkit-scrollbar-thumb]:rounded-full",
          "[&::-webkit-scrollbar-thumb:hover]:bg-slate-600"
        )}
      >
        {MOCK_THREATS.map((threat) => (
          <ThreatCard
            key={threat.id}
            threat={threat}
            onClick={() => onThreatClick?.(threat.id)}
          />
        ))}
      </div>
    </div>
  )
}
