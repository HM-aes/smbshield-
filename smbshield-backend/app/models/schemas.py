"""
Pydantic models for API requests and responses
"""
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime


class ChatMessage(BaseModel):
    """Single chat message"""
    role: str = Field(..., description="Message role: 'user' or 'assistant'")
    content: str = Field(..., description="Message content")


class ChatRequest(BaseModel):
    """Request model for chat endpoint"""
    message: str = Field(..., min_length=1, max_length=2000, description="User's message")
    conversation_history: Optional[List[ChatMessage]] = Field(
        default=None,
        description="Previous messages in the conversation"
    )
    
    class Config:
        json_schema_extra = {
            "example": {
                "message": "What is SQL injection?",
                "conversation_history": []
            }
        }


class ChatResponse(BaseModel):
    """Response model for chat endpoint"""
    response: str = Field(..., description="Agent's response")
    conversation_id: Optional[str] = Field(None, description="Conversation identifier")
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        json_schema_extra = {
            "example": {
                "response": "SQL injection is a code injection technique...",
                "conversation_id": "conv_123",
                "timestamp": "2024-01-20T10:30:00Z"
            }
        }


class LessonSummary(BaseModel):
    """Summary of an OWASP lesson"""
    id: str
    title: str
    category: str
    difficulty: str
    duration_minutes: int


class LessonDetail(LessonSummary):
    """Detailed lesson content"""
    content: str
    examples: List[str]
    key_takeaways: List[str]
