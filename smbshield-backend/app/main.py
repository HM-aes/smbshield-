"""
SMBShield API - Main Application
A security-focused educational platform for SMBs
"""
from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.responses import JSONResponse
import logging

from app.config import settings
from app.api.routes import chat
from app.middleware import RateLimitMiddleware, APIKeyMiddleware
from app.utils import setup_logging

# Configure logging
setup_logging(debug=settings.DEBUG)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title=settings.PROJECT_NAME,
    description="AI-powered OWASP education and security intelligence for SMBs",
    version="1.0.0",
    docs_url="/docs" if settings.DEBUG else None,  # Disable docs in production
    redoc_url="/redoc" if settings.DEBUG else None,
)

# Security Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# API Key authentication (optional, controlled by REQUIRE_API_KEY)
app.add_middleware(APIKeyMiddleware)

# Rate limiting (20 requests/min, 100 requests/hour)
app.add_middleware(
    RateLimitMiddleware,
    requests_per_minute=20,
    requests_per_hour=100
)

# Trust only specific hosts in production
if not settings.DEBUG:
    app.add_middleware(
        TrustedHostMiddleware,
        allowed_hosts=["smbshield.com", "*.smbshield.com"]
    )

# Include routers
app.include_router(chat.router, prefix=settings.API_V1_PREFIX)

# Log startup
logger.info(f"Starting {settings.PROJECT_NAME}")
logger.info(f"Debug mode: {settings.DEBUG}")
logger.info(f"CORS origins: {settings.cors_origins}")


@app.get("/")
async def root():
    """Root endpoint - API health check"""
    return {
        "message": "SMBShield API is running",
        "version": "1.0.0",
        "status": "healthy"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring"""
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME
    }


@app.get("/health/live")
async def liveness_probe():
    """
    Kubernetes liveness probe
    Returns 200 if the service is running
    """
    return {"status": "alive"}


@app.get("/health/ready")
async def readiness_probe():
    """
    Kubernetes readiness probe
    Returns 200 if the service is ready to accept traffic
    """
    try:
        # Check if critical dependencies are available
        from app.agents.owasp_tutor import get_tutor

        # Try to get the tutor (validates Gemini API key is configured)
        tutor = get_tutor()

        return {
            "status": "ready",
            "checks": {
                "api_key_configured": bool(settings.GEMINI_API_KEY),
                "tutor_agent": "initialized"
            }
        }
    except Exception as e:
        logger.error(f"Readiness check failed: {str(e)}")
        return JSONResponse(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            content={
                "status": "not_ready",
                "error": str(e)
            }
        )


# Error handlers
@app.exception_handler(404)
async def not_found_handler(request, exc):
    return JSONResponse(
        status_code=404,
        content={"detail": "Resource not found"}
    )


@app.exception_handler(500)
async def internal_error_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"}
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG
    )
