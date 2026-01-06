/**
 * API Client for SMBShield Backend
 * Handles all communication with the FastAPI backend
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
const API_PREFIX = "/api/v1"

export interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

export interface ChatRequest {
  message: string
  conversation_history?: ChatMessage[]
}

export interface ChatResponse {
  response: string
  conversation_id?: string | null
  timestamp?: string
}

export interface QuickTipResponse {
  tip: string
}

/**
 * Send a chat message to the backend OWASP Tutor
 */
export async function chatWithTutor(
  message: string,
  conversationHistory?: ChatMessage[]
): Promise<string> {
  const response = await fetch(`${API_URL}${API_PREFIX}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      conversation_history: conversationHistory || [],
    } as ChatRequest),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Failed to process chat message" }))
    throw new Error(error.detail || `HTTP ${response.status}: ${response.statusText}`)
  }

  const data = (await response.json()) as ChatResponse
  return data.response
}

/**
 * Get a quick security tip from the backend
 */
export async function getQuickTip(): Promise<string> {
  const response = await fetch(`${API_URL}${API_PREFIX}/chat/quick-tip`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Failed to get security tip" }))
    throw new Error(error.detail || `HTTP ${response.status}: ${response.statusText}`)
  }

  const data = (await response.json()) as QuickTipResponse
  return data.tip
}

/**
 * Health check endpoint
 */
export async function checkBackendHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/health`, {
      method: "GET",
    })
    return response.ok
  } catch {
    return false
  }
}

