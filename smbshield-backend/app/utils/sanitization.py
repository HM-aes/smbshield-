"""
Input sanitization utilities
Prevents XSS, injection attacks, and malicious input
"""
import re
import html
from typing import Optional


def sanitize_user_input(text: str, max_length: int = 2000) -> str:
    """
    Sanitize user input to prevent XSS and injection attacks

    Args:
        text: User input text
        max_length: Maximum allowed length

    Returns:
        Sanitized text safe for processing

    Raises:
        ValueError: If input is invalid
    """
    if not text:
        raise ValueError("Input cannot be empty")

    # Trim whitespace
    text = text.strip()

    # Check length
    if len(text) > max_length:
        raise ValueError(f"Input too long (max {max_length} characters)")

    if len(text) < 1:
        raise ValueError("Input too short")

    # HTML escape to prevent XSS
    text = html.escape(text)

    # Remove potentially dangerous patterns
    # Block script tags
    text = re.sub(r'<script[^>]*>.*?</script>', '', text, flags=re.IGNORECASE | re.DOTALL)

    # Block SQL injection attempts
    dangerous_sql = [
        r'\bDROP\s+TABLE\b',
        r'\bDELETE\s+FROM\b',
        r'\bINSERT\s+INTO\b',
        r'\bUPDATE\s+\w+\s+SET\b',
        r';\s*DROP\s+',
        r'--\s*$',
        r'/\*.*?\*/',
    ]
    for pattern in dangerous_sql:
        if re.search(pattern, text, re.IGNORECASE):
            raise ValueError("Input contains potentially dangerous content")

    # Block command injection
    dangerous_commands = [
        r'\$\(',
        r'`',
        r'\|\s*sh\b',
        r'\|\s*bash\b',
        r'&&',
        r'\|\|',
    ]
    for pattern in dangerous_commands:
        if re.search(pattern, text):
            raise ValueError("Input contains potentially dangerous content")

    return text


def sanitize_conversation_history(
    history: Optional[list], max_messages: int = 50
) -> list:
    """
    Sanitize conversation history

    Args:
        history: List of message dictionaries
        max_messages: Maximum number of messages to keep

    Returns:
        Sanitized and validated history
    """
    if not history:
        return []

    if not isinstance(history, list):
        raise ValueError("Conversation history must be a list")

    # Limit number of messages
    history = history[-max_messages:]

    # Sanitize each message
    sanitized = []
    for msg in history:
        if not isinstance(msg, dict):
            continue

        if "role" not in msg or "content" not in msg:
            continue

        # Only allow valid roles
        if msg["role"] not in ["user", "assistant", "system"]:
            continue

        # Sanitize content
        try:
            content = sanitize_user_input(msg["content"])
            sanitized.append({
                "role": msg["role"],
                "content": content
            })
        except ValueError:
            # Skip invalid messages
            continue

    return sanitized


def validate_api_key(api_key: str) -> bool:
    """
    Validate API key format

    Args:
        api_key: API key to validate

    Returns:
        True if valid format
    """
    if not api_key:
        return False

    # Must be alphanumeric + dashes, reasonable length
    if not re.match(r'^[a-zA-Z0-9_-]{20,100}$', api_key):
        return False

    return True
