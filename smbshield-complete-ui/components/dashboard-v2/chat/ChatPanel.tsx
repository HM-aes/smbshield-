"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Shield, X, MessageSquare, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { ChatMessage } from "./ChatMessage"
import { ChatInput } from "./ChatInput"
import { QuickSuggestions } from "./QuickSuggestions"
import { chatWithTutor } from "@/lib/api"
import type { ChatMessage as ChatMessageType, ChatState } from "../types"

interface ChatPanelProps {
  isOpen: boolean
  onToggle: () => void
  isMobile?: boolean
}

export function ChatPanel({ isOpen, onToggle, isMobile }: ChatPanelProps) {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatState.messages])

  const handleSend = useCallback(async (content: string) => {
    // Add user message
    const userMessage: ChatMessageType = {
      id: `user-${Date.now()}`,
      role: "user",
      content,
      timestamp: new Date(),
    }

    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      error: null,
    }))

    // Add streaming placeholder
    const assistantId = `assistant-${Date.now()}`
    setChatState((prev) => ({
      ...prev,
      messages: [
        ...prev.messages,
        {
          id: assistantId,
          role: "assistant",
          content: "",
          timestamp: new Date(),
          isStreaming: true,
        },
      ],
    }))

    try {
      // Convert messages to API format
      const history = chatState.messages.map((m) => ({
        role: m.role,
        content: m.content,
      }))

      const response = await chatWithTutor(content, history)

      // Update with actual response
      setChatState((prev) => ({
        ...prev,
        messages: prev.messages.map((m) =>
          m.id === assistantId
            ? { ...m, content: response, isStreaming: false }
            : m
        ),
        isLoading: false,
      }))
    } catch (error) {
      setChatState((prev) => ({
        ...prev,
        messages: prev.messages.filter((m) => m.id !== assistantId),
        isLoading: false,
        error: error instanceof Error ? error.message : "Failed to get response",
      }))
    }
  }, [chatState.messages])

  const handleCopy = useCallback((content: string) => {
    navigator.clipboard.writeText(content)
    // Could add toast notification here
  }, [])

  const handleSave = useCallback((message: ChatMessageType) => {
    // TODO: Implement save to library
    console.log("Save message:", message)
  }, [])

  const handleFeedback = useCallback((messageId: string, positive: boolean) => {
    // TODO: Implement feedback
    console.log("Feedback:", messageId, positive)
  }, [])

  if (!isOpen && !isMobile) {
    return null
  }

  return (
    <aside
      className={cn(
        "flex flex-col h-full",
        "bg-slate-900/95 backdrop-blur-md",
        "border-l border-slate-800/50",
        isMobile ? "w-full" : "w-[400px]"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-10 h-10 rounded-xl",
              "bg-gradient-to-br from-blue-500 to-cyan-500",
              "flex items-center justify-center",
              "shadow-lg shadow-blue-500/25"
            )}
          >
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-white flex items-center gap-2">
              Professor Shield
              <Sparkles className="w-4 h-4 text-amber-400" />
            </h2>
            <p className="text-xs text-slate-500">AI Security Tutor</p>
          </div>
        </div>
        {isMobile && (
          <button
            onClick={onToggle}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatState.messages.length === 0 ? (
          <EmptyState onSuggestionClick={handleSend} />
        ) : (
          <>
            {chatState.messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                onCopy={handleCopy}
                onSave={handleSave}
                onFeedback={handleFeedback}
              />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}

        {/* Error Message */}
        {chatState.error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {chatState.error}
          </div>
        )}
      </div>

      {/* Quick Suggestions */}
      {chatState.messages.length > 0 && (
        <QuickSuggestions
          onSelect={handleSend}
          disabled={chatState.isLoading}
        />
      )}

      {/* Input */}
      <ChatInput onSend={handleSend} isLoading={chatState.isLoading} />
    </aside>
  )
}

// Empty State Component
function EmptyState({ onSuggestionClick }: { onSuggestionClick: (prompt: string) => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6">
      <div
        className={cn(
          "w-16 h-16 rounded-2xl mb-4",
          "bg-gradient-to-br from-blue-500/20 to-cyan-500/20",
          "border border-blue-500/30",
          "flex items-center justify-center"
        )}
      >
        <MessageSquare className="w-8 h-8 text-blue-400" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">
        Ask Professor Shield
      </h3>
      <p className="text-sm text-slate-400 mb-6 max-w-[280px]">
        Your AI cybersecurity tutor. Ask about OWASP, LLM security, GDPR compliance, and more.
      </p>

      <div className="w-full space-y-2">
        <p className="text-xs text-slate-500 mb-3">Try asking:</p>
        {[
          "What is prompt injection?",
          "Explain OWASP Top 10 for me",
          "How do I secure my API?",
        ].map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => onSuggestionClick(suggestion)}
            className={cn(
              "w-full p-3 rounded-xl text-left text-sm",
              "bg-slate-800/50 border border-slate-700/50",
              "text-slate-300 hover:text-white",
              "hover:bg-slate-700/50 hover:border-blue-500/30",
              "transition-all duration-200"
            )}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  )
}
