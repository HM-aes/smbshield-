import Link from "next/link"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BlogCard } from "@/components/blog/blog-card"
import { StaggerContainer } from "@/components/animated/stagger-container"

// Mock blog posts
const blogPosts = [
  {
    slug: "understanding-owasp-top-10-for-smbs",
    title: "Understanding OWASP Top 10 for SMBs",
    excerpt: "A comprehensive guide to the most critical web application security risks and how small businesses can protect themselves.",
    category: "OWASP",
    date: "November 15, 2024",
    readTime: "8 min read",
    featured: true,
  },
  {
    slug: "genai-security-risks-2024",
    title: "GenAI Security Risks in 2024",
    excerpt: "Exploring the emerging security challenges posed by generative AI systems and how to mitigate them.",
    category: "GenAI",
    date: "November 12, 2024",
    readTime: "6 min read",
  },
  {
    slug: "eu-ai-act-what-smbs-need-to-know",
    title: "EU AI Act: What SMBs Need to Know",
    excerpt: "Breaking down the new European AI regulations and their implications for small and medium businesses.",
    category: "Compliance",
    date: "November 10, 2024",
    readTime: "10 min read",
  },
  {
    slug: "prompt-injection-real-examples",
    title: "Prompt Injection: Real Examples",
    excerpt: "Learn about prompt injection attacks through real-world examples and how to defend against them.",
    category: "GenAI",
    date: "November 8, 2024",
    readTime: "7 min read",
  },
  {
    slug: "gdpr-enforcement-trends",
    title: "GDPR Enforcement Trends in 2024",
    excerpt: "Analysis of recent GDPR enforcement actions and what they mean for European businesses.",
    category: "Compliance",
    date: "November 5, 2024",
    readTime: "9 min read",
  },
  {
    slug: "securing-small-business-apis",
    title: "Securing Small Business APIs",
    excerpt: "Practical tips for implementing API security without enterprise-level resources.",
    category: "OWASP",
    date: "November 1, 2024",
    readTime: "12 min read",
  },
]

const categories = ["All", "OWASP", "GenAI", "Compliance"]

export default function BlogPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="pt-32 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Security Insights & Updates
            </h1>
            <p className="text-lg text-muted-foreground sm:text-xl">
              Expert analysis on cybersecurity, compliance, and emerging threats
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {blogPosts.filter(post => post.featured).map((post) => (
        <section key={post.slug} className="border-b py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Card className="overflow-hidden hover-lift">
              <div className="grid md:grid-cols-2">
                <div className="h-64 bg-gradient-to-br from-blue-600 to-indigo-600 md:h-auto"></div>
                <div className="flex flex-col justify-center p-8">
                  <div className="mb-4 inline-flex items-center gap-2">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {post.category}
                    </span>
                    <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-600 dark:text-yellow-400">
                      Featured
                    </span>
                  </div>
                  <h2 className="mb-4 text-3xl font-bold">{post.title}</h2>
                  <p className="mb-6 text-muted-foreground">{post.excerpt}</p>
                  <div className="mb-6 flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.readTime}
                    </div>
                  </div>
                  <Button asChild>
                    <Link href={`/blog/${post.slug}`}>
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>
      ))}

      {/* Blog Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerContainer staggerDelay={0.1} triggerOnScroll={true} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.filter(post => !post.featured).map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="border-t bg-muted/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
              Stay Updated
            </h2>
            <p className="mb-8 text-muted-foreground">
              Get weekly security briefings delivered to your inbox
            </p>
            <Button size="lg" asChild>
              <Link href="/dashboard">Subscribe Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
