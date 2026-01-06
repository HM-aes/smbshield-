"use client"

import { memo } from "react"
import { Shield, User, Copy, BookmarkPlus, ThumbsUp, ThumbsDown } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ChatMessage as ChatMessageType } from "../types"

interface ChatMessageProps {
  message: ChatMessageType
  onCopy?: (content: string) => void
  onSave?: (message: ChatMessageType) => void
  onFeedback?: (messageId: string, positive: boolean) => void
}

export const ChatMessage = memo(function ChatMessage({
  message,
  onCopy,
  onSave,
  onFeedback,
}: ChatMessageProps) {
  const isUser = message.role === "user"

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date)
  }

  if (isUser) {
    return (
      <div className="flex justify-end animate-in slide-in-from-right-2 duration-300">
        <div className="flex items-end gap-2 max-w-[85%]">
          <div
            className={cn(
              "px-4 py-3 rounded-2xl rounded-br-md",
              "bg-gradient-to-br from-blue-500 to-blue-600",
              "text-white shadow-lg shadow-blue-500/20"
            )}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {message.content}
            </p>
            <p className="text-[10px] text-blue-200 mt-1 text-right">
              {formatTime(message.timestamp)}
            </p>
          </div>
          <div
            className={cn(
              "w-7 h-7 rounded-lg flex-shrink-0",
              "bg-slate-700 flex items-center justify-center"
            )}
          >
            <User className="w-4 h-4 text-slate-400" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-start animate-in slide-in-from-left-2 duration-300">
      <div className="flex items-start gap-2 max-w-[90%]">
        {/* Avatar */}
        <div
          className={cn(
            "w-8 h-8 rounded-lg flex-shrink-0",
            "bg-gradient-to-br from-blue-500 to-cyan-500",
            "flex items-center justify-center",
            "shadow-lg shadow-blue-500/25"
          )}
        >
          <Shield className="w-4 h-4 text-white" />
        </div>

        {/* Message Content */}
        <div className="flex-1 space-y-2">
          <div
            className={cn(
              "px-4 py-3 rounded-2xl rounded-tl-md",
              "bg-slate-800/90 backdrop-blur-sm",
              "border border-slate-700/50",
              "shadow-lg"
            )}
          >
            {/* Streaming Indicator */}
            {message.isStreaming && (
              <div className="flex items-center gap-1 mb-2">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
                <span className="text-xs text-slate-500 ml-1">Thinking...</span>
              </div>
            )}

            {/* Message Text with Markdown-like styling */}
            <div className="text-sm text-slate-200 leading-relaxed prose-invert prose-sm max-w-none">
              {message.content.split("\n").map((line, i) => {
                // Handle headers
                if (line.startsWith("### ")) {
                  return (
                    <h3 key={i} className="text-base font-semibold text-white mt-3 mb-2 first:mt-0">
                      {line.replace("### ", "")}
                    </h3>
                  )
                }
                if (line.startsWith("## ")) {
                  return (
                    <h2 key={i} className="text-lg font-semibold text-white mt-3 mb-2 first:mt-0">
                      {line.replace("## ", "")}
                    </h2>
                  )
                }
                // Handle bullet points
                if (line.startsWith("- ") || line.startsWith("* ")) {
                  return (
                    <div key={i} className="flex gap-2 my-1">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>{line.replace(/^[-*] /, "")}</span>
                    </div>
                  )
                }
                // Handle numbered lists
                if (/^\d+\.\s/.test(line)) {
                  const num = line.match(/^(\d+)\./)?.[1]
                  return (
                    <div key={i} className="flex gap-2 my-1">
                      <span className="text-blue-400 font-medium min-w-[1.5rem]">{num}.</span>
                      <span>{line.replace(/^\d+\.\s/, "")}</span>
                    </div>
                  )
                }
                // Handle bold text with **
                if (line.includes("**")) {
                  const parts = line.split(/\*\*(.*?)\*\*/g)
                  return (
                    <p key={i} className="my-1">
                      {parts.map((part, j) =>
                        j % 2 === 1 ? (
                          <strong key={j} className="text-white font-semibold">
                            {part}
                          </strong>
                        ) : (
                          part
                        )
                      )}
                    </p>
                  )
                }
                // Handle code blocks
                if (line.startsWith("`") && line.endsWith("`")) {
                  return (
                    <code
                      key={i}
                      className="px-1.5 py-0.5 rounded bg-slate-700/50 text-blue-300 text-xs font-mono"
                    >
                      {line.replace(/`/g, "")}
                    </code>
                  )
                }
                // Empty lines
                if (line.trim() === "") {
                  return <div key={i} className="h-2" />
                }
                // Regular paragraphs
                return (
                  <p key={i} className="my-1">
                    {line}
                  </p>
                )
              })}
            </div>

            {/* Timestamp */}
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-700/50">
              <div className="flex items-center gap-1">
                {!message.isStreaming && (
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                )}
                <span className="text-[10px] text-slate-500">
                  {formatTime(message.timestamp)}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {!message.isStreaming && (
            <div className="flex items-center gap-1 px-1">
              <button
                onClick={() => onCopy?.(message.content)}
                className={cn(
                  "p-1.5 rounded-md",
                  "text-slate-500 hover:text-slate-300",
                  "hover:bg-slate-800/50",
                  "transition-all duration-200"
                )}
                title="Copy message"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onSave?.(message)}
                className={cn(
                  "p-1.5 rounded-md",
                  "text-slate-500 hover:text-slate-300",
                  "hover:bg-slate-800/50",
                  "transition-all duration-200"
                )}
                title="Save to library"
              >
                <BookmarkPlus className="w-3.5 h-3.5" />
              </button>
              <div className="w-px h-4 bg-slate-700 mx-1" />
              <button
                onClick={() => onFeedback?.(message.id, true)}
                className={cn(
                  "p-1.5 rounded-md",
                  "text-slate-500 hover:text-green-400",
                  "hover:bg-green-500/10",
                  "transition-all duration-200"
                )}
                title="Good response"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onFeedback?.(message.id, false)}
                className={cn(
                  "p-1.5 rounded-md",
                  "text-slate-500 hover:text-red-400",
                  "hover:bg-red-500/10",
                  "transition-all duration-200"
                )}
                title="Poor response"
              >
                <ThumbsDown className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
})
