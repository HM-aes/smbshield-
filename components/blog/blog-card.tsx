"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScaleHover } from "@/components/animated/scale-hover"

interface BlogCardProps {
  post: {
    slug: string
    title: string
    excerpt: string
    category: string
    date: string
    readTime: string
    featured?: boolean
  }
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <ScaleHover scale={1.02} liftDistance={-8}>
      <Card className="flex flex-col overflow-hidden">
        {/* Image with zoom effect */}
        <div className="relative h-48 overflow-hidden">
          <motion.div
            className="h-full w-full bg-gradient-to-br from-blue-600 to-indigo-600"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        </div>

        <CardHeader>
          {/* Category Badge */}
          <motion.div
            className="mb-2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.1,
            }}
          >
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {post.category}
            </span>
          </motion.div>
          <h3 className="text-xl font-bold">{post.title}</h3>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col">
          <p className="mb-6 flex-1 text-muted-foreground">{post.excerpt}</p>

          {/* Meta Info */}
          <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {post.date}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </div>
          </div>

          {/* Read More Button */}
          <Button variant="outline" asChild className="w-full group">
            <Link href={`/blog/${post.slug}`}>
              Read More
              <motion.span
                className="ml-2 inline-block"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </Link>
          </Button>
        </CardContent>
      </Card>
    </ScaleHover>
  )
}

