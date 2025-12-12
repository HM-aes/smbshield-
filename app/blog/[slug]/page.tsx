import Link from "next/link"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// This would typically come from a CMS or database
const blogPost = {
  title: "Understanding OWASP Top 10 for SMBs",
  category: "OWASP",
  date: "November 15, 2024",
  readTime: "8 min read",
  author: "HiTek",
  content: `
<h2>Introduction</h2>
<p>The OWASP Top 10 is a standard awareness document for developers and web application security. It represents a broad consensus about the most critical security risks to web applications.</p>

<p>For small and medium businesses, understanding these risks is crucial. While you may not have a dedicated security team, being aware of common vulnerabilities can help you make informed decisions about your web applications.</p>

<h2>The Top 10 Risks</h2>

<h3>1. Broken Access Control</h3>
<p>Access control enforces policy such that users cannot act outside of their intended permissions. Failures typically lead to unauthorized information disclosure, modification, or destruction of data.</p>

<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>

<h3>2. Cryptographic Failures</h3>
<p>Previously known as Sensitive Data Exposure, this category focuses on failures related to cryptography. This often leads to exposure of sensitive data such as passwords, credit card numbers, and personal information.</p>

<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

<h3>3. Injection</h3>
<p>Injection flaws, such as SQL, NoSQL, OS, and LDAP injection, occur when untrusted data is sent to an interpreter as part of a command or query.</p>

<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>

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

<h3>Regular Security Assessments</h3>
<p>Consider conducting regular security assessments, even if they're basic. Many tools can help you identify common vulnerabilities without requiring deep technical expertise.</p>

<p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>

<h2>Conclusion</h2>
<p>Understanding the OWASP Top 10 is the first step in securing your web applications. While the technical details can be complex, the core principles are straightforward: validate input, control access, protect data, and keep software updated.</p>

<p>At SMBShield, we translate these technical concepts into actionable advice for SMBs. Our weekly briefings help you stay on top of emerging threats without needing a security background.</p>

<p>Remember, cybersecurity is not about being perfect—it's about being prepared and staying informed.</p>
  `,
}

// Mock related posts
const relatedPosts = [
  {
    slug: "securing-small-business-apis",
    title: "Securing Small Business APIs",
    category: "OWASP",
  },
  {
    slug: "gdpr-enforcement-trends",
    title: "GDPR Enforcement Trends in 2024",
    category: "Compliance",
  },
]

export default function BlogPostPage() {
  return (
    <div className="flex flex-col">
      {/* Back Button */}
      <div className="border-b">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
          <Button variant="ghost" asChild>
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>

      {/* Article Header */}
      <article className="pt-12 pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              {blogPost.category}
            </span>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
              {blogPost.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-sm font-bold text-white">
                  HT
                </div>
                <span>{blogPost.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {blogPost.date}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {blogPost.readTime}
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-12 aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600"></div>

          {/* Article Content */}
          <div
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: blogPost.content }}
          />
        </div>
      </article>

      {/* Related Posts */}
      <section className="border-t bg-muted/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold">Related Articles</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {relatedPosts.map((post) => (
              <Card key={post.slug} className="hover-lift">
                <div className="h-48 bg-gradient-to-br from-blue-600 to-indigo-600"></div>
                <CardContent className="p-6">
                  <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {post.category}
                  </span>
                  <h3 className="mb-4 text-xl font-bold">{post.title}</h3>
                  <Button variant="outline" asChild>
                    <Link href={`/blog/${post.slug}`}>Read Article</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
            Get Weekly Security Briefings
          </h2>
          <p className="mb-8 text-muted-foreground">
            Stay informed with curated security intelligence delivered to your inbox
          </p>
          <Button size="lg" asChild>
            <Link href="/dashboard">Start Free Trial</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
