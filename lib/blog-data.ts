
export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  featured?: boolean
  author?: string
  content?: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: "why-i-started-smbshield",
    title: "Why I Started SMBShield: Bridging the AI Security Gap",
    excerpt: "From training bankers at UBS to discovering the ease of Python hacking while traveling—my journey to protecting SMBs in the AI era.",
    category: "Founder Story",
    date: "December 12, 2024",
    readTime: "5 min read",
    featured: true,
    author: "Founder",
    content: `
<h2>The Journey from Financial Markets to Cyber Security</h2>
<p>There's a specific kind of pressure you feel when you're training clients on the trading floors of <strong>Tier-1 Global Banks</strong>. I spent years in that world, working as a customer specialist and client trainer for <strong>Reuters</strong>. It was a high-stakes environment where precision was everything.</p>

<p>My career took me across the globe. I managed projects for major tech companies and spent significant time in <strong>Saudi Arabia</strong> working with <strong>Reuters</strong> and <strong>STC (Saudi Telecom)</strong> on complex Siebel supply chain projects. I was a sports coach, a traveler, and a tech enthusiast navigating the corporate world.</p>

<h2>The Python Revelation</h2>
<p>But the real turning point didn't happen in a boardroom. It happened while I was traveling.</p>

<p>I had always loved technology, but I decided to dive deeper into development. I picked up <strong>Python</strong>. What started as a hobby quickly turned into a revelation. As I learned the language, I stumbled into the world of cybersecurity tools.</p>

<p><strong>I was shocked.</strong></p>

<p>I couldn't believe how <em>easy</em> it was. The tools available to hackers—scripts that could automate attacks, scan for vulnerabilities, or compromise systems—were readily available and terrifyingly simple to use for anyone with basic Python knowledge. It demystified "hacking" for me, but it also terrified me.</p>

<h2>The SMB Blind Spot</h2>
<p>As I looked around the industry, specifically with the explosion of <strong>AI Agents and LLMs</strong>, I noticed a dangerous pattern. The conversation about AI security was dominated by big tech. Microsoft, Google, OpenAI—they have armies of security engineers.</p>

<p><strong>But what about the SMBs?</strong></p>

<p>Small and Medium Businesses are rushing to adopt AI to stay competitive. They want to focus on profit, efficiency, and growth. They don't have the resources for a dedicated styling team, let alone a Chief Information Security Officer (CISO). They are being left behind in the security conversation, yet they are the most vulnerable targets for these automated, Python-powered attacks I had discovered.</p>

<h2>The Mission: Security for the Rest of Us</h2>
<p>That is why I founded <strong>SMBShield</strong>.</p>

<p>I realized there was hardly any education tailored for this sector. The market was missing a bridge—someone to translate the complex, technical world of <strong>OWASP Top 10</strong> and <strong>LLM Vulnerabilities</strong> into language that a business owner could understand and act on.</p>

<p>We aren't just selling a tool; we are building a shield. We want to help you focus on your profit and your passion, while we ensure you understand the modern threat landscape without needing a PhD in Computer Science.</p>

<p>Welcome to the era of secure, autonomous business. Welcome to SMBShield.</p>
    `
  },
  {
    slug: "understanding-owasp-top-10-for-smbs",
    title: "Understanding OWASP Top 10 for SMBs",
    excerpt: "A comprehensive guide to the most critical web application security risks and how small businesses can protect themselves.",
    category: "OWASP",
    date: "November 15, 2024",
    readTime: "8 min read",
    content: `
<h2>Introduction</h2>
<p>The OWASP Top 10 is a standard awareness document for developers and web application security. It represents a broad consensus about the most critical security risks to web applications.</p>
<p>For small and medium businesses, understanding these risks is crucial. While you may not have a dedicated security team, being aware of common vulnerabilities can help you make informed decisions about your web applications.</p>
<h2>The Top 10 Risks</h2>
<h3>1. Broken Access Control</h3>
<p>Access control enforces policy such that users cannot act outside of their intended permissions. Failures typically lead to unauthorized information disclosure, modification, or destruction of data.</p>
<h3>2. Cryptographic Failures</h3>
<p>Previously known as Sensitive Data Exposure, this category focuses on failures related to cryptography. This often leads to exposure of sensitive data such as passwords, credit card numbers, and personal information.</p>
<h3>3. Injection</h3>
<p>Injection flaws, such as SQL, NoSQL, OS, and LDAP injection, occur when untrusted data is sent to an interpreter as part of a command or query.</p>
<h2>What SMBs Should Do</h2>
<h3>Start with the Basics</h3>
<p>You don't need to be a security expert to protect your business. Start by ensuring your web applications follow basic security practices:</p>
<ul>
<li>Keep all software and frameworks up to date</li>
<li>Use strong authentication methods</li>
<li>Implement proper access controls</li>
<li>Encrypt sensitive data both in transit and at rest</li>
<li>Validate and sanitize all user inputs</li>
</ul>
    `
  },
  {
    slug: "genai-security-risks-2024",
    title: "GenAI Security Risks in 2024",
    excerpt: "Exploring the emerging security challenges posed by generative AI systems and how to mitigate them.",
    category: "GenAI",
    date: "November 12, 2024",
    readTime: "6 min read",
    content: `<p>Generative AI is transforming business, but it brings new risks. From prompt injection to data leakage, understanding these threats is the first step to securing your AI adoption.</p>`
  },
  {
    slug: "eu-ai-act-what-smbs-need-to-know",
    title: "EU AI Act: What SMBs Need to Know",
    excerpt: "Breaking down the new European AI regulations and their implications for small and medium businesses.",
    category: "Compliance",
    date: "November 10, 2024",
    readTime: "10 min read",
    content: `<p>The EU AI Act is here. We break down the risk categories and what your SMB needs to do to stay compliant without stifling innovation.</p>`
  },
  {
    slug: "prompt-injection-real-examples",
    title: "Prompt Injection: Real Examples",
    excerpt: "Learn about prompt injection attacks through real-world examples and how to defend against them.",
    category: "GenAI",
    date: "November 8, 2024",
    readTime: "7 min read",
    content: `<p>Prompt injection is the SQL injection of the AI era. See how attackers trick models and how you can sanitize inputs to prevent it.</p>`
  },
  {
    slug: "gdpr-enforcement-trends",
    title: "GDPR Enforcement Trends in 2024",
    excerpt: "Analysis of recent GDPR enforcement actions and what they mean for European businesses.",
    category: "Compliance",
    date: "November 5, 2024",
    readTime: "9 min read",
    content: `<p>GDPR fines are rising. We analyze the latest enforcement trends to show you where regulators are focusing their attention in 2024.</p>`
  },
  {
    slug: "securing-small-business-apis",
    title: "Securing Small Business APIs",
    excerpt: "Practical tips for implementing API security without enterprise-level resources.",
    category: "OWASP",
    date: "November 1, 2024",
    readTime: "12 min read",
    content: `<p>APIs are the lifeblood of modern apps. Learn how to secure your endpoints with authentication, rate limiting, and proper validation.</p>`
  },
]

export const categories = ["All", "Founder Story", "OWASP", "GenAI", "Compliance"]
