"""
Configuration management for SMBShield API
"""

from typing import List

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment variables"""

    # API Configuration
    API_V1_PREFIX: str = "/api/v1"
    PROJECT_NAME: str = "SMBShield API"
    DEBUG: bool = True

    # Security
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # AI Configuration
    ANTHROPIC_API_KEY: str | None = None
    GEMINI_API_KEY: str

    # API Security
    API_KEY: str | None = None  # Optional API key for protected endpoints
    REQUIRE_API_KEY: bool = False  # Set to True in production

    # Mock mode for testing (when Gemini API isn't working)
    USE_MOCK_RESPONSES: bool = False  # Set to True for mock responses

    # CORS (will be parsed from comma-separated string)
    ALLOWED_ORIGINS: str = "http://localhost:3000,http://localhost:3001"

    @property
    def cors_origins(self) -> List[str]:
        """Parse ALLOWED_ORIGINS string into list"""
        return [origin.strip() for origin in self.ALLOWED_ORIGINS.split(",")]

    # Database (optional for now)
    SUPABASE_URL: str | None = None
    SUPABASE_KEY: str | None = None
    REDIS_URL: str | None = None

    # Email (optional for now)
    SENDGRID_API_KEY: str | None = None
    FROM_EMAIL: str | None = None

    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8", case_sensitive=True
    )


# Global settings instance
settings = Settings()
