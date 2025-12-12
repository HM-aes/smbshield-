"use client"

import { useEffect, useRef, useState } from "react"

import { Loader2, Send, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { chatWithTutor, type ChatMessage } from "@/lib/api"

type Role = "user" | "assistant"

type Message = {
  id: string
  role: Role
  content: string
}

type MarkdownSegment =
  | { kind: "text"; value: string }
  | { kind: "code"; value: string; language?: string }

type CodeToken =
  | { type: "keyword"; value: string }
  | { type: "string"; value: string }
  | { type: "number"; value: string }
  | { type: "text"; value: string }

const STORAGE_KEY = "smbshield-chat-history"
const CLAUDE_MODEL = "claude-sonnet-4-20250514"
const SYSTEM_PROMPT = `You are a cybersecurity expert specializing in helping small and medium businesses understand and implement security best practices.

Focus on:
- OWASP Top 10 vulnerabilities
- GenAI security risks and defenses
- EU compliance requirements (GDPR, AI Act)
- Practical, actionable advice tailored to SMB maturity
- Plain-language explanations with concrete next steps

When you share code or commands, keep them concise and highlight the security rationale.`

const EXAMPLE_QUESTIONS = [
  "What is broken access control and how do I prevent it?",
  "Explain SQL injection in simple terms for my team",
  "How can I secure my company's public API?",
  "What are emerging GenAI security threats in 2025?",
]

const LANGUAGE_ALIASES: Record<string, string> = {
  js: "javascript",
  jsx: "javascript",
  ts: "typescript",
  tsx: "typescript",
  py: "python",
  sh: "bash",
  shell: "bash",
  bash: "bash",
  ps1: "powershell",
  powershell: "powershell",
  yml: "yaml",
}

const KEYWORD_DICTIONARY: Record<string, string[]> = {
  text: [],
  javascript: [
    "const",
    "let",
    "var",
    "function",
    "return",
    "if",
    "else",
    "for",
    "while",
    "import",
    "from",
    "export",
    "async",
    "await",
    "try",
    "catch",
  ],
  typescript: [
    "interface",
    "type",
    "implements",
    "extends",
    "const",
    "let",
    "function",
    "return",
    "import",
    "from",
    "export",
    "async",
    "await",
  ],
  python: [
    "def",
    "import",
    "as",
    "return",
    "if",
    "elif",
    "else",
    "for",
    "while",
    "class",
    "try",
    "except",
    "with",
  ],
  bash: ["echo", "cd", "ls", "cat", "grep", "export", "if", "fi"],
  powershell: [
    "Write-Host",
    "Get-ChildItem",
    "if",
    "else",
    "return",
    "function",
    "param",
  ],
  sql: ["select", "from", "where", "and", "or", "group", "by", "order", "limit"],
  yaml: ["true", "false", "on", "off"],
  json: [],
}

const KEYWORD_SETS: Record<string, Set<string>> = Object.entries(
  KEYWORD_DICTIONARY,
).reduce(
  (acc, [language, words]) => {
    acc[language] = new Set(words.map((word) => word.toLowerCase()))
    return acc
  },
  {} as Record<string, Set<string>>,
)

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const requestIdRef = useRef(0)

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved) as Message[]
        if (Array.isArray(parsed)) {
          setMessages(parsed)
        }
      }
    } catch (err) {
      console.error("Failed to read saved chat history", err)
    }
  }, [])

  useEffect(() => {
    try {
      if (messages.length > 0) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
      } else {
        window.localStorage.removeItem(STORAGE_KEY)
      }
    } catch (err) {
      console.error("Failed to persist chat history", err)
    }
  }, [messages])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = createMessage("user", input.trim())
    const conversation = [...messages, userMessage]

    setMessages(conversation)
    setInput("")
    setError(null)

    const requestId = requestIdRef.current + 1
    requestIdRef.current = requestId
    setIsLoading(true)

    try {
      // Convert messages to backend format
      const conversationHistory: ChatMessage[] = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }))
      
      // Call backend API
      const reply = await chatWithTutor(input.trim(), conversationHistory)
      if (requestId !== requestIdRef.current) return

      const assistantMessage = createMessage("assistant", reply)
      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      if (requestId !== requestIdRef.current) return

      console.error("Backend chat error", err)
      const fallback =
        err instanceof Error 
          ? err.message 
          : "Sorry, something went wrong. Please make sure the backend is running at http://localhost:8000"
      const assistantMessage = createMessage(
        "assistant",
        `I ran into an issue fulfilling that request.\n\n${fallback}`,
      )
      setMessages((prev) => [...prev, assistantMessage])
      setError(fallback)
    } finally {
      if (requestId === requestIdRef.current) {
        setIsLoading(false)
      }
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleSend()
  }

  const handleExampleClick = (question: string) => {
    setInput(question)
    inputRef.current?.focus()
  }

  const handleClear = () => {
    requestIdRef.current += 1
    setMessages([])
    setInput("")
    setError(null)
    setIsLoading(false)
    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch (err) {
      console.error("Failed to clear chat history", err)
    }
  }

  const hasMessages = messages.length > 0

  return (
    <div className="flex h-[calc(100vh-6rem)] flex-col">
      <Card className="flex flex-1 flex-col overflow-hidden border-border/80">
        <CardHeader className="flex flex-col gap-4 border-b bg-muted/20 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle className="text-2xl font-semibold">
              AI Security Assistant
            </CardTitle>
            <CardDescription className="max-w-2xl text-sm">
              Ask security questions, get Anthropic Claude guidance on OWASP
              risks, GenAI threats, compliance gaps, and practical SMB fixes.
            </CardDescription>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={!hasMessages && !isLoading}
            onClick={handleClear}
            title="Clear chat history"
            className="justify-start gap-2 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
            Clear Chat
          </Button>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col p-0">
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {hasMessages ? (
              <div className="space-y-5">
                {messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-2xl border border-border/60 bg-muted px-4 py-3 text-sm shadow-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Claude is thinking
                      </div>
                      <div className="mt-2 text-muted-foreground/80">
                        <LoadingDots />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-6 text-center text-muted-foreground">
                <div className="max-w-2xl space-y-3">
                  <p className="text-base font-medium text-foreground">
                    Ask me anything about cybersecurity, OWASP Top 10, GenAI
                    risks, or how to keep your SMB safe.
                  </p>
                  <p className="text-sm">
                    Responses include markdown formatting, code snippets, and
                    actionable remediation steps you can share with your team.
                  </p>
                </div>
                <div>
                  <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-foreground/80">
                    Try an example
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {EXAMPLE_QUESTIONS.map((question) => (
                      <Button
                        key={question}
                        type="button"
                        variant="outline"
                        size="sm"
                        className="border-dashed"
                        onClick={() => handleExampleClick(question)}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {error && (
            <p className="px-6 pb-2 text-sm text-destructive">
              {error.includes("backend") || error.includes("localhost:8000")
                ? `${error} – make sure the backend is running at http://localhost:8000`
                : error}
            </p>
          )}

          <div className="border-t bg-background/90 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/70">
            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col gap-3 sm:flex-row"
            >
              <Input
                ref={inputRef}
                value={input}
                placeholder="Ask a security question..."
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
                    event.preventDefault()
                    handleSend()
                  }
                }}
                disabled={isLoading}
                autoComplete="off"
              />
              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="flex-1 gap-2 sm:flex-none"
                  disabled={isLoading || !input.trim()}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send
                    </>
                  )}
                </Button>
              </div>
            </form>
            <p className="mt-3 text-xs text-muted-foreground">
              Conversations are stored locally in your browser for easy
              follow-ups.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const MessageBubble = ({ message }: { message: Message }) => {
  const isUser = message.role === "user"

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-3xl px-4 py-3 text-sm shadow-sm ${
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted/80 text-foreground"
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-line">{message.content}</p>
        ) : (
          <MarkdownMessage content={message.content} />
        )}
      </div>
    </div>
  )
}

const MarkdownMessage = ({ content }: { content: string }) => {
  const segments = splitMarkdownSegments(content)

  return (
    <div className="space-y-4 text-sm leading-relaxed [&_a]:text-primary [&_a]:underline [&_blockquote]:border-l-2 [&_blockquote]:border-primary/60 [&_blockquote]:pl-3 [&_blockquote]:text-muted-foreground [&_code]:rounded [&_code]:bg-background/70 [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-xs [&_h3]:text-base [&_h4]:text-sm [&_h3]:font-semibold [&_h4]:font-semibold [&_ul]:ml-5 [&_ul]:list-disc [&_ol]:ml-5 [&_ol]:list-decimal [&_li]:leading-relaxed">
      {segments.map((segment, index) =>
        segment.kind === "code" ? (
          <CodeBlock
            key={`code-${index}`}
            language={segment.language}
            value={segment.value}
          />
        ) : (
          <div
            key={`text-${index}`}
            dangerouslySetInnerHTML={{
              __html: markdownToHtml(segment.value),
            }}
          />
        ),
      )}
    </div>
  )
}

const CodeBlock = ({
  language,
  value,
}: {
  language?: string
  value: string
}) => {
  const normalizedLanguage = normalizeLanguage(language)
  const tokens = tokenizeCode(value, normalizedLanguage)

  return (
    <div className="rounded-2xl border border-border/50 bg-background/70">
      <div className="flex items-center justify-between border-b border-border/40 px-4 py-2 text-xs uppercase tracking-wide text-muted-foreground">
        <span>{normalizedLanguage}</span>
        <span>Claude</span>
      </div>
      <pre className="overflow-x-auto whitespace-pre-wrap px-4 py-3 text-sm font-mono leading-relaxed">
        {tokens.map((token, index) => {
          if (token.type === "keyword") {
            return (
              <span
                key={`keyword-${index}`}
                className="text-sky-600 dark:text-sky-300"
              >
                {token.value}
              </span>
            )
          }
          if (token.type === "string") {
            return (
              <span
                key={`string-${index}`}
                className="text-amber-600 dark:text-amber-300"
              >
                {token.value}
              </span>
            )
          }
          if (token.type === "number") {
            return (
              <span
                key={`number-${index}`}
                className="text-emerald-600 dark:text-emerald-300"
              >
                {token.value}
              </span>
            )
          }
          return (
            <span key={`text-${index}`} className="text-foreground">
              {token.value}
            </span>
          )
        })}
      </pre>
    </div>
  )
}

const LoadingDots = () => (
  <span className="flex items-center gap-1">
    {Array.from({ length: 3 }).map((_, index) => (
      <span
        key={`dot-${index}`}
        className="h-2.5 w-2.5 rounded-full bg-muted-foreground/70 animate-bounce"
        style={{ animationDelay: `${index * 150}ms` }}
      />
    ))}
  </span>
)

const createMessage = (role: Role, content: string): Message => ({
  id:
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${role}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
  role,
  content,
})

const normalizeLanguage = (language?: string) => {
  if (!language) return "text"
  const lower = language.toLowerCase()
  return LANGUAGE_ALIASES[lower] ?? lower
}

const splitMarkdownSegments = (value: string): MarkdownSegment[] => {
  const segments: MarkdownSegment[] = []
  const regex = /```([\w-]+)?\s*([\s\S]*?)```/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(value)) !== null) {
    if (match.index > lastIndex) {
      segments.push({
        kind: "text",
        value: value.slice(lastIndex, match.index),
      })
    }

    segments.push({
      kind: "code",
      value: match[2].trim(),
      language: match[1],
    })

    lastIndex = match.index + match[0].length
  }

  if (lastIndex < value.length) {
    segments.push({ kind: "text", value: value.slice(lastIndex) })
  }

  return segments.filter((segment) => segment.value.trim().length > 0)
}

const escapeHtml = (text: string) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")

const formatInline = (text: string) => {
  let formatted = escapeHtml(text)
  formatted = formatted.replace(
    /\[(.+?)\]\((https?:\/\/[^\s]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
  )
  formatted = formatted.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
  formatted = formatted.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, "<em>$1</em>")
  formatted = formatted.replace(/`([^`]+)`/g, "<code>$1</code>")
  return formatted
}

const markdownToHtml = (text: string) => {
  const lines = text.replace(/\r\n/g, "\n").split("\n")
  const htmlParts: string[] = []
  let paragraphBuffer: string[] = []
  let currentList: "ul" | "ol" | null = null

  const closeParagraph = () => {
    if (!paragraphBuffer.length) return
    const paragraph = paragraphBuffer
      .map((line) => formatInline(line))
      .join("<br />")
    htmlParts.push(`<p>${paragraph}</p>`)
    paragraphBuffer = []
  }

  const closeList = () => {
    if (!currentList) return
    htmlParts.push(`</${currentList}>`)
    currentList = null
  }

  lines.forEach((line) => {
    const trimmed = line.trim()

    if (!trimmed) {
      closeParagraph()
      closeList()
      return
    }

    if (/^#{1,3}\s+/.test(trimmed)) {
      closeParagraph()
      closeList()
      const level = Math.min(trimmed.match(/^#+/)?.[0].length ?? 1, 3)
      const tag = level === 1 ? "h3" : level === 2 ? "h4" : "h5"
      const content = trimmed.replace(/^#{1,3}\s+/, "")
      htmlParts.push(`<${tag}>${formatInline(content)}</${tag}>`)
      return
    }

    if (/^>\s+/.test(trimmed)) {
      closeParagraph()
      closeList()
      htmlParts.push(
        `<blockquote>${formatInline(trimmed.replace(/^>\s+/, ""))}</blockquote>`,
      )
      return
    }

    if (/^[-*+]\s+/.test(trimmed)) {
      closeParagraph()
      if (currentList !== "ul") {
        closeList()
        currentList = "ul"
        htmlParts.push("<ul>")
      }
      htmlParts.push(`<li>${formatInline(trimmed.replace(/^[-*+]\s+/, ""))}</li>`)
      return
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      closeParagraph()
      if (currentList !== "ol") {
        closeList()
        currentList = "ol"
        htmlParts.push("<ol>")
      }
      htmlParts.push(
        `<li>${formatInline(trimmed.replace(/^\d+\.\s+/, ""))}</li>`,
      )
      return
    }

    paragraphBuffer.push(trimmed)
  })

  closeParagraph()
  closeList()

  return htmlParts.join("")
}

const tokenizeCode = (source: string, language: string): CodeToken[] => {
  const tokens: CodeToken[] = []
  const keywordSet =
    KEYWORD_SETS[language] ??
    KEYWORD_SETS[LANGUAGE_ALIASES[language] ?? "text"] ??
    KEYWORD_SETS.text

  let index = 0

  while (index < source.length) {
    const char = source[index]

    if (char === '"' || char === "'") {
      let value = char
      index += 1
      while (index < source.length) {
        value += source[index]
        if (source[index] === char && source[index - 1] !== "\\") {
          index += 1
          break
        }
        index += 1
      }
      tokens.push({ type: "string", value })
      continue
    }

    if (/\d/.test(char)) {
      let next = index + 1
      while (next < source.length && /[\d._xXa-fA-F]/.test(source[next])) {
        next += 1
      }
      tokens.push({ type: "number", value: source.slice(index, next) })
      index = next
      continue
    }

    if (/[A-Za-z_]/.test(char)) {
      let next = index + 1
      while (next < source.length && /[\w-]/.test(source[next])) {
        next += 1
      }
      const word = source.slice(index, next)
      if (keywordSet.has(word.toLowerCase())) {
        tokens.push({ type: "keyword", value: word })
      } else {
        tokens.push({ type: "text", value: word })
      }
      index = next
      continue
    }

    tokens.push({ type: "text", value: char })
    index += 1
  }

  return tokens
}

// Note: Direct Anthropic API calls removed - now using backend API via lib/api.ts
