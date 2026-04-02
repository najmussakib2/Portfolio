import { Metadata } from 'next'
import BlogPageClient from './BlogPageClient'

export const metadata: Metadata = {
  title: 'Blog — Najmus Sakib',
  description: 'Articles about web development, architecture, and software engineering.',
}

export default function BlogPage() {
  return <BlogPageClient />
}
