"""
API Key Authentication Middleware
Simple authentication for protecting endpoints
"""
from fastapi import Request, HTTPException, status
from starlette.middleware.base import BaseHTTPMiddleware
from app.config import settings
import logging

logger = logging.getLogger(__name__)


class APIKeyMiddleware(BaseHTTPMiddleware):
    """
    Middleware to enforce API key authentication
    """

    # Paths that don't require authentication
    PUBLIC_PATHS = [
        "/",
        "/health",
        "/health/live",
        "/health/ready",
        "/docs",
        "/redoc",
        "/openapi.json"
    ]

    async def dispatch(self, request: Request, call_next):
        # Skip auth for public paths
        if request.url.path in self.PUBLIC_PATHS:
            return await call_next(request)

        # Skip auth if not required
        if not settings.REQUIRE_API_KEY:
            return await call_next(request)

        # Check for API key
        api_key = request.headers.get("X-API-Key") or request.headers.get("Authorization")

        # Authorization header might be "Bearer <key>"
        if api_key and api_key.startswith("Bearer "):
            api_key = api_key[7:]  # Remove "Bearer " prefix

        # Validate API key
        if not api_key:
            logger.warning(f"Missing API key from {request.client.host if request.client else 'unknown'}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="API key required. Include X-API-Key header or Authorization: Bearer <key>",
                headers={"WWW-Authenticate": "ApiKey"}
            )

        if api_key != settings.API_KEY:
            logger.warning(f"Invalid API key from {request.client.host if request.client else 'unknown'}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid API key",
                headers={"WWW-Authenticate": "ApiKey"}
            )

        # API key is valid, process request
        response = await call_next(request)
        return response
