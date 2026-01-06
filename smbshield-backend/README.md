# SMBShield API

> AI-powered OWASP Top 10 education platform - Universal security learning for all industries

## 🎯 Overview

SMBShield provides **interactive OWASP Top 10 education** through an AI-powered tutor ("Professor Shield"). Built with FastAPI and Google Gemini, it delivers personalized security learning experiences for developers, business owners, and security professionals across **all sectors**.

**Key Features:**
- ✅ AI-powered OWASP Top 10 tutor (Gemini 1.5 Flash)
- ✅ Rate limiting & input sanitization
- ✅ Production-ready with Docker + Fly.io config
- ✅ Comprehensive test suite
- ✅ Structured logging for debugging
- ✅ Optional API key authentication

## 🏗️ Architecture

```
Next.js Frontend
    ↓ [HTTPS + CORS]
FastAPI Backend API
    ├─ Rate Limiting (In-Memory) ✅
    ├─ Input Sanitization ✅
    ├─ Request Validation (Pydantic) ✅
    └─ Structured Logging ✅
        ↓
Pydantic AI Agent
    └─ Professor Shield (Gemini 1.5 Flash) ✅
        ↓
Future: Supabase + Redis + Email
```

## 🚀 Quick Start

### Prerequisites
- Python 3.11+ (3.12 works too)
- Virtual environment

### Setup

1. **Clone and navigate**
```bash
cd smbshield-backend
```

2. **Create virtual environment**
```bash
python3 -m venv venv
source venv/bin/activate  # On Mac/Linux
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Configure environment**
```bash
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY and SECRET_KEY
```

5. **Run the server**
```bash
uvicorn app.main:app --reload
```

6. **Test it**
```bash
# In another terminal
python test_api.py
```

## 📚 API Endpoints

### Production Ready ✅
- `GET /` - Root health check
- `GET /health` - Service health status
- `GET /health/live` - Kubernetes liveness probe
- `GET /health/ready` - Kubernetes readiness probe
- `POST /api/v1/chat` - Chat with Professor Shield (OWASP tutor)
- `GET /api/v1/chat/quick-tip` - Get random security tip

### Future Enhancements ⏳
- `GET /api/v1/lessons` - OWASP content library
- `POST /api/v1/auth/signup` - User registration
- `POST /api/v1/subscribe` - Email subscriptions

## 🔒 Security Features

### Implemented ✅
- **Rate Limiting** - 20 req/min, 100 req/hour (in-memory)
- **Input Sanitization** - XSS & SQL injection prevention
- **CORS Protection** - Configured allowed origins
- **Structured Logging** - JSON logging for production
- **API Key Auth** - Optional endpoint protection
- **Request Validation** - Pydantic schemas
- **Health Checks** - Kubernetes-compatible probes

### Future ⏳
- PII Scanning (Presidio installed, not integrated)
- JWT Authentication (dependencies ready)
- Redis-based rate limiting
- Database integration (Supabase)

## 🧪 Testing

```bash
# Run tests
pytest

# Run with coverage
pytest --cov=app tests/
```

## 📁 Project Structure

```
smbshield-backend/
├── app/
│   ├── main.py              # FastAPI app entry point
│   ├── config.py            # Environment configuration
│   ├── agents/              # AI agents
│   │   └── owasp_tutor.py  # Professor Shield (Gemini)
│   ├── api/
│   │   └── routes/
│   │       └── chat.py      # Chat endpoints
│   ├── middleware/          # Custom middleware
│   │   ├── rate_limit.py   # Rate limiting
│   │   └── auth.py         # API key auth
│   ├── models/
│   │   └── schemas.py      # Pydantic models
│   ├── utils/              # Utilities
│   │   ├── sanitization.py # Input sanitization
│   │   └── logging_config.py # Structured logging
│   ├── security/           # Future: JWT auth
│   └── db/                 # Future: Database layer
├── tests/
│   └── test_main.py        # Comprehensive test suite
├── Dockerfile              # Container config
├── fly.toml                # Fly.io deployment
├── pytest.ini              # Test configuration
├── requirements.txt        # Dependencies
├── .env.example            # Dev environment template
├── .env.production.example # Production template
└── DEPLOY.md               # Deployment guide
```

## 🚀 Deployment

See [DEPLOY.md](./DEPLOY.md) for detailed deployment instructions.

**Quick Deploy to Fly.io:**
```bash
# Install Fly CLI
brew install flyctl

# Login
fly auth login

# Deploy
fly launch
fly secrets set SECRET_KEY="..." GEMINI_API_KEY="..."
fly deploy
```

## 🛠️ Development

### Running Tests
```bash
# All tests
pytest

# With coverage
pytest --cov=app tests/

# Verbose output
pytest -v
```

### Adding New Endpoints
1. Create route file in `app/api/routes/`
2. Define Pydantic models in `app/models/schemas.py`
3. Add input sanitization if needed
4. Write tests in `tests/`
5. Include router in `app/main.py`

### Environment Variables
See `.env.example` for development and `.env.production.example` for production configuration.

**Required:**
- `GEMINI_API_KEY` - Google Gemini API key
- `SECRET_KEY` - Strong secret (generate with `openssl rand -hex 32`)

**Optional:**
- `REQUIRE_API_KEY=True` - Enable endpoint protection
- `API_KEY` - Client API key for authentication

## 🌍 Universal OWASP Education

This platform teaches **universal OWASP Top 10 vulnerabilities** applicable to **all industries**:
- Web applications (all sectors)
- E-commerce platforms
- SaaS applications
- Financial services
- Healthcare systems
- Government portals
- And more...

The AI tutor (Professor Shield) provides sector-specific examples dynamically based on user questions.

## 📝 Tech Stack

- **Framework:** FastAPI 0.115.5
- **AI:** Pydantic AI 0.0.51 + Google Gemini 1.5 Flash
- **Validation:** Pydantic 2.10.3
- **Server:** Uvicorn (ASGI)
- **Testing:** Pytest + TestClient
- **Deployment:** Docker + Fly.io

## 📄 License

Private project - All rights reserved
