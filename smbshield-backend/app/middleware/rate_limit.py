"""
Rate limiting middleware for API protection
Simple in-memory implementation for demo/staging
"""
from fastapi import Request, HTTPException, status
from starlette.middleware.base import BaseHTTPMiddleware
from datetime import datetime, timedelta
from collections import defaultdict
from typing import Dict, Tuple
import logging

logger = logging.getLogger(__name__)


class RateLimiter:
    """
    Simple in-memory rate limiter
    Tracks requests per IP address
    """

    def __init__(self, requests_per_minute: int = 20, requests_per_hour: int = 100):
        self.requests_per_minute = requests_per_minute
        self.requests_per_hour = requests_per_hour
        # Format: {ip: [(timestamp1, timestamp2, ...)]}
        self.request_history: Dict[str, list] = defaultdict(list)

    def _cleanup_old_requests(self, ip: str, now: datetime):
        """Remove requests older than 1 hour"""
        cutoff = now - timedelta(hours=1)
        self.request_history[ip] = [
            timestamp for timestamp in self.request_history[ip]
            if timestamp > cutoff
        ]

    def is_allowed(self, ip: str) -> Tuple[bool, str]:
        """
        Check if request is allowed
        Returns: (allowed: bool, reason: str)
        """
        now = datetime.now()

        # Cleanup old requests
        self._cleanup_old_requests(ip, now)

        # Get request timestamps for this IP
        timestamps = self.request_history[ip]

        # Check per-minute limit
        minute_ago = now - timedelta(minutes=1)
        recent_requests = sum(1 for ts in timestamps if ts > minute_ago)

        if recent_requests >= self.requests_per_minute:
            return False, f"Rate limit exceeded: {self.requests_per_minute} requests per minute"

        # Check per-hour limit
        if len(timestamps) >= self.requests_per_hour:
            return False, f"Rate limit exceeded: {self.requests_per_hour} requests per hour"

        # Request is allowed
        self.request_history[ip].append(now)
        return True, "OK"


class RateLimitMiddleware(BaseHTTPMiddleware):
    """
    Middleware to enforce rate limiting
    """

    def __init__(self, app, requests_per_minute: int = 20, requests_per_hour: int = 100):
        super().__init__(app)
        self.limiter = RateLimiter(requests_per_minute, requests_per_hour)
        logger.info(
            f"Rate limiting enabled: {requests_per_minute}/min, {requests_per_hour}/hour"
        )

    async def dispatch(self, request: Request, call_next):
        # Skip rate limiting for health checks
        if request.url.path in ["/", "/health", "/health/live", "/health/ready"]:
            return await call_next(request)

        # Get client IP
        client_ip = request.client.host if request.client else "unknown"

        # Check rate limit
        allowed, reason = self.limiter.is_allowed(client_ip)

        if not allowed:
            logger.warning(f"Rate limit exceeded for IP {client_ip}: {reason}")
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail=reason,
                headers={"Retry-After": "60"}  # Suggest retry after 60 seconds
            )

        # Process request
        response = await call_next(request)

        # Add rate limit headers to response
        response.headers["X-RateLimit-Limit-Minute"] = str(self.limiter.requests_per_minute)
        response.headers["X-RateLimit-Limit-Hour"] = str(self.limiter.requests_per_hour)

        return response
