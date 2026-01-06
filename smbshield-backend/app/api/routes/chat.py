"""
Chat API routes - OWASP Tutor interactions
"""
from fastapi import APIRouter, HTTPException, status
from app.models.schemas import ChatRequest, ChatResponse
from app.agents.owasp_tutor import get_tutor
from app.utils import sanitize_user_input, sanitize_conversation_history
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/chat", tags=["Chat"])


@router.post("/", response_model=ChatResponse, status_code=status.HTTP_200_OK)
async def chat_with_tutor(request: ChatRequest):
    """
    Chat with Professor Shield, your AI security tutor
    
    Send a message and get educational responses about:
    - OWASP Top 10 vulnerabilities
    - GenAI and LLM security
    - Cybersecurity best practices
    - EU compliance basics
    
    Perfect for SMB owners learning about security!
    """
    try:
        # Sanitize user input to prevent XSS and injection attacks
        try:
            sanitized_message = sanitize_user_input(request.message)
            sanitized_history = sanitize_conversation_history(request.conversation_history)
        except ValueError as e:
            logger.warning(f"Invalid input detected: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=str(e)
            )

        # Get the tutor agent
        tutor = get_tutor()

        # Process the sanitized message
        response_text = await tutor.chat(
            user_message=sanitized_message,
            conversation_history=sanitized_history
        )

        # Return response
        return ChatResponse(
            response=response_text,
            conversation_id=None  # We'll add conversation tracking later
        )

    except HTTPException:
        # Re-raise HTTP exceptions
        raise
    except Exception as e:
        logger.error(f"Chat error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to process chat message. Please try again."
        )


@router.get("/quick-tip", status_code=status.HTTP_200_OK)
async def get_security_tip():
    """
    Get a quick, actionable security tip
    
    Perfect for daily security reminders!
    """
    try:
        tutor = get_tutor()
        tip = await tutor.get_quick_tip()
        return {"tip": tip}
        
    except Exception as e:
        logger.error(f"Quick tip error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to generate security tip"
        )
