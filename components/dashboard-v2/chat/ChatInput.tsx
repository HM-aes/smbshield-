"use client"

import { useState, useRef, useEffect, KeyboardEvent } from "react"
import { Send, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatInputProps {
  onSend: (message: string) => void
  isLoading: boolean
  placeholder?: string
}

export function ChatInput({
  onSend,
  isLoading,
  placeholder = "Ask Professor Shield...",
}: ChatInputProps) {
  const [message, setMessage] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`
    }
  }, [message])

  const handleSend = () => {
    const trimmed = message.trim()
    if (trimmed && !isLoading) {
      onSend(trimmed)
      setMessage("")
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
      }
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="p-4 border-t border-slate-700/50 bg-slate-900/50">
      <div
        className={cn(
          "flex items-end gap-2",
          "p-2 rounded-xl",
          "bg-slate-800/50 border border-slate-700/50",
          "focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/20",
          "transition-all duration-200"
        )}
      >
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isLoading ? "Professor Shield is thinking..." : placeholder}
          disabled={isLoading}
          rows={1}
          className={cn(
            "flex-1 bg-transparent resize-none",
            "text-sm text-white placeholder:text-slate-500",
            "focus:outline-none",
            "min-h-[40px] max-h-[120px] py-2 px-2",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        />

        <button
          onClick={handleSend}
          disabled={!message.trim() || isLoading}
          className={cn(
            "p-2.5 rounded-lg",
            "transition-all duration-200",
            message.trim() && !isLoading
              ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105"
              : "bg-slate-700 text-slate-500 cursor-not-allowed"
          )}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Character count for long messages */}
      {message.length > 200 && (
        <p className="text-xs text-slate-500 mt-2 text-right">
          {message.length} / 2000
        </p>
      )}

      {/* Helper text */}
      <p className="text-[10px] text-slate-600 mt-2 text-center">
        Press Enter to send, Shift+Enter for new line
      </p>
    </div>
  )
}
