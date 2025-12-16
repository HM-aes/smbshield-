import React from "react"
import Link from "next/link"
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { blogPosts } from "@/lib/blog-data"

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  // Unwrap params using React.use() for Next.js 15+
  const { slug } = React.use(params)
  
  const blogPost = blogPosts.find(p => p.slug === slug)
  
  if (!blogPost) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
        <p className="text-muted-foreground mb-8">The intelligence log you found does not exist or has been redacted.</p>
        <Button asChild>
          <Link href="/blog">Return to Log Stream</Link>
        </Button>
      </div>
    )
  }

  const relatedPosts = blogPosts
    .filter(p => p.category === blogPost.category && p.slug !== blogPost.slug)
    .slice(0, 2)

  // Fallback if no related posts in same category, just take other recent ones
  const finalRelatedPosts = relatedPosts.length > 0 
    ? relatedPosts 
    : blogPosts.filter(p => p.slug !== blogPost.slug).slice(0, 2)

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Back Button */}
      <div className="border-b border-border/40 sticky top-0 z-10 bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
          <Button variant="ghost" className="group" asChild>
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Intel Log
            </Link>
          </Button>
        </div>
      </div>

      {/* Article Header */}
      <article className="pt-12 pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="mb-4 inline-block rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-sm font-medium text-blue-500">
              {blogPost.category}
            </span>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl leading-tight">
              {blogPost.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-sm font-bold text-white shadow-lg shadow-blue-500/20">
                  {(blogPost.author?.[0] || "S").toUpperCase()}
                </div>
                <span className="font-medium text-foreground">{blogPost.author || "SMBShield Team"}</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-border" />
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {blogPost.date}
              </div>
              <div className="w-1 h-1 rounded-full bg-border" />
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {blogPost.readTime}
              </div>
            </div>
          </div>

          {/* Featured Image (Abstract) */}
          <div className="mb-12 aspect-video overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-gray-900 via-slate-900 to-black relative">
             <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20" />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/5 blur-[80px]" />
          </div>

          {/* Article Content */}
          <div
            className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-500 prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: blogPost.content || "" }}
          />
        </div>
      </article>

      {/* Related Posts */}
      <section className="border-t border-border/40 bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold font-mono uppercase tracking-wider text-muted-foreground">Related Transmissions</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {finalRelatedPosts.map((post) => (
              <Card key={post.slug} className="hover-lift border-border/50 bg-background/50 backdrop-blur-sm">
                <div className="h-48 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent" />
                </div>
                <CardContent className="p-6">
                  <span className="mb-2 inline-block rounded border border-border px-2 py-0.5 text-[10px] font-mono uppercase text-muted-foreground">
                    {post.category}
                  </span>
                  <h3 className="mb-4 text-xl font-bold line-clamp-2">{post.title}</h3>
                  <Button variant="outline" asChild className="w-full justify-between group">
                    <Link href={`/blog/${post.slug}`}>
                        Read Analysis
                        <ArrowRight className="h-4 w-4 -rotate-45 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/40 py-24 bg-gradient-to-b from-background to-blue-500/5">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-bold sm:text-4xl tracking-tight">
            Ready to secure your AI adoption?
          </h2>
          <p className="mb-10 text-xl text-muted-foreground max-w-2xl mx-auto">
            Join the community of SMBs who prioritize security without compromising on speed.
          </p>
          <Button size="lg" className="h-12 px-8 text-base shadow-xl shadow-blue-500/20" asChild>
            <Link href="/dashboard">Access Intelligence Platform</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
