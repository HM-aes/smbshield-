"""
OWASP Tutor Agent - Your friendly AI security teacher

This agent helps SMB owners learn about cybersecurity in simple terms.
Focus: OWASP Top 10, GenAI security, LLM vulnerabilities
"""

import os
import google.genai as genai
from google.genai import types

from app.config import settings

# System prompt for the OWASP Tutor
TUTOR_SYSTEM_PROMPT = """You are Professor Shield, a friendly and patient cybersecurity teacher for small business owners.

Your mission: Make OWASP Top 10, AI security, and GenAI vulnerabilities understandable for non-technical people.

Teaching style:
- Use simple analogies (compare tech concepts to everyday situations)
- Break complex topics into bite-sized explanations
- Encourage questions - there are no "dumb" questions
- Use examples relevant to small businesses
- Be encouraging and supportive
- Avoid jargon, but explain terms when necessary

Topics you teach:
- OWASP Top 10 vulnerabilities
- LLM security risks (prompt injection, data leakage, etc.)
- GenAI threats for businesses
- Basic cybersecurity hygiene
- EU compliance basics (GDPR, NIS2)

Tone: Friendly professor, not corporate consultant. Think "helpful teacher" not "scary security expert."

When explaining vulnerabilities:
1. What it is (simple definition)
2. Why it matters (real-world impact)
3. How to protect against it (practical steps)
4. Example scenario (relatable to SMBs)

Remember: Your students are busy business owners, not developers. Keep it practical and actionable.
"""


class OWASPTutor:
    """OWASP Tutor Agent - Educational AI for cybersecurity"""

    def __init__(self):
        """Initialize the agent with Google Gemini"""
        # Initialize Google GenAI client directly (bypassing Pydantic AI's outdated wrapper)
        self.client = genai.Client(api_key=settings.GEMINI_API_KEY)

        # Use latest Gemini Flash model
        self.model_name = "gemini-2.5-flash"

    async def chat(self, user_message: str, conversation_history: list = None) -> str:
        """
        Process a chat message and return response

        Args:
            user_message: The user's question or message
            conversation_history: Previous messages (optional)

        Returns:
            Agent's response as string
        """
        # Mock mode for testing (when Gemini API isn't working)
        if settings.USE_MOCK_RESPONSES:
            return self._get_mock_response(user_message)

        try:
            # Build conversation with system prompt
            contents = [
                types.Content(
                    role="user",
                    parts=[types.Part(text=TUTOR_SYSTEM_PROMPT)]
                ),
                types.Content(
                    role="model",
                    parts=[types.Part(text="Understood! I'm Professor Shield, ready to teach cybersecurity in a friendly, practical way.")]
                ),
                types.Content(
                    role="user",
                    parts=[types.Part(text=user_message)]
                )
            ]

            # Generate response using direct API
            response = self.client.models.generate_content(
                model=self.model_name,
                contents=contents
            )

            return response.text

        except Exception as e:
            # Graceful error handling
            return (
                "I apologize, but I'm having trouble processing that right now. "
                f"Could you try rephrasing your question? (Error: {str(e)[:100]})"
            )

    def _get_mock_response(self, user_message: str) -> str:
        """
        Return educational mock responses for testing

        This allows testing the full chat flow while fixing Gemini API
        """
        msg_lower = user_message.lower()

        # Detect topic and return appropriate response
        if "xss" in msg_lower or "cross-site scripting" in msg_lower:
            return """🔒 **Cross-Site Scripting (XSS) Explained**

Hello! Great question about XSS! Let me break this down for you.

**What is it?**
Think of XSS like a burglar slipping a fake note into your mailbox that tricks your security system. Attackers inject malicious code (usually JavaScript) into websites that other users will see and execute.

**Why it matters for your business:**
- Attackers can steal user session cookies
- They can capture login credentials
- They can deface your website
- Users' browsers trust the malicious code because it comes from YOUR site

**How to protect yourself:**
1. **Validate ALL user input** - Never trust what users type in
2. **Escape output** - Convert special characters to safe versions
3. **Use Content Security Policy (CSP)** - Tell browsers what scripts are allowed
4. **Use modern frameworks** - React, Vue, Angular escape by default

**Real example:**
Imagine a comment section where someone posts:
```
<script>steal_cookies()</script>
```

Without protection, this runs on everyone's browser who views the comment!

**Quick wins:**
✅ Use prepared statements in your code
✅ Enable CSP headers on your web server
✅ Keep your frameworks updated

Any questions about XSS? I'm here to help! 🛡️

*Note: This is a demo response. Full AI coming soon!*"""

        elif "sql injection" in msg_lower or "sqli" in msg_lower:
            return """🔒 **SQL Injection Explained**

Excellent question! SQL injection is one of the most dangerous vulnerabilities.

**What is it?**
Imagine a restaurant where you can write your own order. Instead of "1 burger," you write "1 burger AND access to the kitchen AND all the recipes." That's SQL injection - tricking the database into running malicious commands.

**Why it matters:**
- Attackers can steal your ENTIRE database
- They can delete or modify data
- They can bypass authentication (login without passwords!)
- Your customer data is at risk

**How to protect:**
1. **Use Prepared Statements** - Separate data from commands
2. **Input Validation** - Check what users type
3. **Least Privilege** - Database users should have minimal permissions
4. **WAF** - Web Application Firewall can block attacks

**Real attack example:**
```sql
Username: admin' OR '1'='1
Password: anything
```

This tricks the system into thinking '1'='1' (always true) so you're logged in!

**Quick wins:**
✅ Never build SQL queries with string concatenation
✅ Use ORM frameworks (they handle this automatically)
✅ Regularly audit your database queries

Want to dive deeper into any aspect? 🛡️

*Demo mode - Real AI coming soon!*"""

        elif "csrf" in msg_lower or "cross-site request" in msg_lower:
            return """🔒 **CSRF (Cross-Site Request Forgery) Explained**

Great security question!

**What is it?**
Think of CSRF like someone forging your signature on a check. A malicious website tricks YOUR browser into performing actions on another site where you're logged in.

**Why it matters:**
- Attackers can change your account settings
- They can make purchases with your stored payment info
- They can delete data or transfer money
- All while you're innocently browsing another site!

**How it works:**
1. You log into YourBank.com
2. You visit EvilSite.com (without logging out)
3. EvilSite has hidden code: `<img src="YourBank.com/transfer?to=hacker&amount=1000">`
4. Your browser sends the request WITH your cookies! 💸

**How to protect:**
1. **CSRF Tokens** - Unique tokens for each request
2. **SameSite Cookies** - Prevent cookies from being sent cross-site
3. **Check Referer Header** - Verify request origin
4. **Re-authentication** - Ask for password on sensitive actions

**Quick wins:**
✅ Use CSRF protection in your framework (Django, Rails have it built-in)
✅ Set `SameSite=Strict` on cookies
✅ Require re-auth for money transfers/settings changes

Questions? I'm here! 🛡️

*Demo response - Full AI coming soon!*"""

        elif "hello" in msg_lower or "hi" in msg_lower or "hey" in msg_lower:
            return """👋 **Hello! I'm Professor Shield!**

Welcome to SMBShield! I'm here to teach you about cybersecurity in a way that actually makes sense.

**What I can help you with:**
🔐 OWASP Top 10 vulnerabilities
🤖 AI & LLM security risks
🛡️ Practical security tips for your business
📋 EU compliance basics (GDPR, NIS2)

**Try asking me:**
- "What is XSS?"
- "How does SQL injection work?"
- "What are the OWASP Top 10?"
- "How can I secure my website?"
- "What is prompt injection?"

I'll explain everything in plain English with real-world examples!

**Remember:** No question is too simple. Security is for everyone! 🎓

What would you like to learn about today?

*Currently in demo mode - full AI responses coming soon!*"""

        elif "owasp top 10" in msg_lower or "owasp top ten" in msg_lower:
            return """🔒 **The OWASP Top 10 - Your Essential Security Checklist**

Great question! The OWASP Top 10 is like a "Most Wanted" list for web vulnerabilities.

**The 2021 OWASP Top 10:**

1. **Broken Access Control** - Users accessing things they shouldn't
2. **Cryptographic Failures** - Weak encryption or storing passwords in plain text
3. **Injection** - SQL injection, command injection, XSS
4. **Insecure Design** - Security flaws in how the app was built
5. **Security Misconfiguration** - Default passwords, unnecessary features enabled
6. **Vulnerable Components** - Using outdated libraries with known flaws
7. **Authentication Failures** - Weak login systems, session management
8. **Data Integrity Failures** - Not verifying data hasn't been tampered with
9. **Logging Failures** - Not logging security events (can't detect attacks!)
10. **Server-Side Request Forgery (SSRF)** - Tricking servers into making malicious requests

**Why it matters:**
These 10 vulnerabilities cause 90%+ of web security breaches!

**Want to learn more?**
Ask me about any specific vulnerability! For example:
- "Tell me about Broken Access Control"
- "What is SSRF?"
- "How do I fix Security Misconfiguration?"

🛡️ **Quick win:** Start with #1 and work your way down!

*Demo mode - Real Professor Shield coming soon!*"""

        else:
            # Generic educational response
            return f"""🤔 **Interesting question about: "{user_message[:100]}..."**

I'm Professor Shield, your cybersecurity tutor! While I'm in demo mode right now, I can still help you learn!

**Popular topics I cover:**
🔐 **Vulnerabilities:** XSS, SQL Injection, CSRF, SSRF, etc.
🤖 **AI Security:** Prompt injection, data leakage, model poisoning
📋 **Compliance:** GDPR, NIS2 basics
🛡️ **Best Practices:** Authentication, encryption, secure coding

**Try asking:**
- "What is SQL injection?"
- "Explain XSS in simple terms"
- "What are the OWASP Top 10?"
- "How does CSRF work?"
- "What is prompt injection?"

I'll explain everything step-by-step with real-world examples!

Security doesn't have to be scary - let's learn together! 🎓

*Note: Demo mode active. Full AI responses coming when Gemini API is configured!*"""

    async def get_quick_tip(self) -> str:
        """Generate a quick security tip"""
        try:
            prompt = "Give me one quick, actionable cybersecurity tip for a small business owner. Keep it under 50 words."

            # Use direct API
            response = self.client.models.generate_content(
                model=self.model_name,
                contents=[types.Content(
                    role="user",
                    parts=[types.Part(text=prompt)]
                )]
            )

            return response.text
        except Exception as e:
            # Fallback tip
            return "🔒 Enable two-factor authentication (2FA) on all business accounts. This single step blocks 99% of automated attacks!"


# Global instance (singleton pattern)
_tutor_instance = None


def get_tutor() -> OWASPTutor:
    """Get or create the OWASP Tutor instance"""
    global _tutor_instance
    if _tutor_instance is None:
        _tutor_instance = OWASPTutor()
    return _tutor_instance
