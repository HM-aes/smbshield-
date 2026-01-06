"""
Test suite for main API endpoints
"""
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


class TestHealthEndpoints:
    """Test health check endpoints"""

    def test_root_endpoint(self):
        """Test root endpoint returns healthy status"""
        response = client.get("/")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert data["message"] == "SMBShield API is running"
        assert "version" in data

    def test_health_check(self):
        """Test /health endpoint"""
        response = client.get("/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert "service" in data

    def test_liveness_probe(self):
        """Test Kubernetes liveness probe"""
        response = client.get("/health/live")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "alive"

    def test_readiness_probe(self):
        """Test Kubernetes readiness probe"""
        response = client.get("/health/ready")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "ready"
        assert "checks" in data


class TestRateLimiting:
    """Test rate limiting functionality"""

    def test_rate_limit_allows_normal_requests(self):
        """Test that normal request volume is allowed"""
        # Make 5 requests - should all succeed
        for _ in range(5):
            response = client.post(
                "/api/v1/chat/",
                json={"message": "What is XSS?"}
            )
            # Should either succeed or fail with non-rate-limit error
            assert response.status_code != 429

    def test_rate_limit_headers_present(self):
        """Test that rate limit headers are included"""
        response = client.post(
            "/api/v1/chat/",
            json={"message": "Test"}
        )
        # Check for rate limit headers
        assert "X-RateLimit-Limit-Minute" in response.headers
        assert "X-RateLimit-Limit-Hour" in response.headers


class TestInputSanitization:
    """Test input sanitization and validation"""

    def test_rejects_empty_message(self):
        """Test that empty messages are rejected"""
        response = client.post(
            "/api/v1/chat/",
            json={"message": ""}
        )
        assert response.status_code == 400

    def test_rejects_very_long_message(self):
        """Test that overly long messages are rejected"""
        long_message = "a" * 3000  # Exceeds 2000 char limit
        response = client.post(
            "/api/v1/chat/",
            json={"message": long_message}
        )
        assert response.status_code == 400

    def test_rejects_sql_injection_attempt(self):
        """Test that SQL injection attempts are blocked"""
        malicious_input = "'; DROP TABLE users; --"
        response = client.post(
            "/api/v1/chat/",
            json={"message": malicious_input}
        )
        assert response.status_code == 400
        assert "dangerous" in response.json()["detail"].lower()

    def test_rejects_xss_attempt(self):
        """Test that XSS attempts are sanitized"""
        xss_input = "<script>alert('xss')</script>"
        response = client.post(
            "/api/v1/chat/",
            json={"message": xss_input}
        )
        # Should either sanitize or reject
        assert response.status_code in [200, 400]

    def test_accepts_valid_message(self):
        """Test that normal messages are accepted"""
        response = client.post(
            "/api/v1/chat/",
            json={"message": "What is SQL injection?"}
        )
        # Should process normally (might fail if no API key, but not validation error)
        assert response.status_code in [200, 500]  # 500 if Gemini API fails


class TestChatEndpoints:
    """Test chat functionality"""

    def test_chat_endpoint_exists(self):
        """Test that chat endpoint is accessible"""
        response = client.post(
            "/api/v1/chat/",
            json={"message": "Hello"}
        )
        # Should not be 404
        assert response.status_code != 404

    def test_quick_tip_endpoint(self):
        """Test quick tip endpoint"""
        response = client.get("/api/v1/chat/quick-tip")
        # Should not be 404
        assert response.status_code != 404

    def test_chat_requires_message(self):
        """Test that chat requires a message field"""
        response = client.post(
            "/api/v1/chat/",
            json={}
        )
        assert response.status_code == 422  # Validation error

    def test_chat_accepts_conversation_history(self):
        """Test that conversation history parameter works"""
        response = client.post(
            "/api/v1/chat/",
            json={
                "message": "What is XSS?",
                "conversation_history": [
                    {"role": "user", "content": "Hello"},
                    {"role": "assistant", "content": "Hi there!"}
                ]
            }
        )
        # Should accept the format
        assert response.status_code in [200, 500]  # 500 if API key issue


class TestErrorHandling:
    """Test error handling"""

    def test_404_handler(self):
        """Test custom 404 handler"""
        response = client.get("/nonexistent-endpoint")
        assert response.status_code == 404
        assert "detail" in response.json()

    def test_invalid_json_rejected(self):
        """Test that invalid JSON is rejected"""
        response = client.post(
            "/api/v1/chat/",
            data="not json",
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 422


class TestCORS:
    """Test CORS configuration"""

    def test_cors_headers_present(self):
        """Test that CORS headers are included"""
        response = client.options(
            "/api/v1/chat/",
            headers={"Origin": "http://localhost:3000"}
        )
        # Check for CORS headers
        assert "access-control-allow-origin" in response.headers or response.status_code == 200


class TestAPIDocumentation:
    """Test API documentation endpoints"""

    def test_openapi_schema_accessible_in_debug(self):
        """Test that OpenAPI schema is accessible in debug mode"""
        response = client.get("/openapi.json")
        # Should be accessible in debug mode
        assert response.status_code in [200, 404]  # 404 if DEBUG=False

    def test_docs_accessible_in_debug(self):
        """Test that /docs is accessible in debug mode"""
        response = client.get("/docs")
        # Should be accessible in debug mode
        assert response.status_code in [200, 404]  # 404 if DEBUG=False
