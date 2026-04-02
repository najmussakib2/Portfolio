// ─── Portfolio Settings ───────────────────────────────────────────────────────
export interface PortfolioSettings {
  id: string
  title: string // e.g. "Frontend Developer"
  name: string
  bio: string
  email: string
  location: string
  avatar_url: string | null
  cv_url: string | null
  open_to_work: boolean
  availability_message: string | null
  github_url: string | null
  linkedin_url: string | null
  twitter_url: string | null
  website_url: string | null
  created_at: string
  updated_at: string
}

// ─── Projects ─────────────────────────────────────────────────────────────────
export interface Project {
  id: string
  title: string
  description: string
  long_description: string | null
  tech_stack: string[]
  github_url: string | null
  live_url: string | null
  image_url: string | null
  featured: boolean
  order_index: number
  category: 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'other'
  created_at: string
  updated_at: string
}

export type ProjectInsert = Omit<Project, 'id' | 'created_at' | 'updated_at'>
export type ProjectUpdate = Partial<ProjectInsert>

// ─── Skills ───────────────────────────────────────────────────────────────────
export interface Skill {
  id: string
  name: string
  category: 'frontend' | 'backend' | 'devops' | 'tools' | 'other'
  proficiency: number // 1–100
  icon: string | null
  order_index: number
  created_at: string
}

export type SkillInsert = Omit<Skill, 'id' | 'created_at'>
export type SkillUpdate = Partial<SkillInsert>

// ─── Testimonials ─────────────────────────────────────────────────────────────
export interface Testimonial {
  id: string
  name: string
  role: string
  company: string | null
  avatar_url: string | null
  content: string
  rating: number // 1–5
  visible: boolean
  order_index: number
  created_at: string
}

export type TestimonialInsert = Omit<Testimonial, 'id' | 'created_at'>
export type TestimonialUpdate = Partial<TestimonialInsert>

// ─── Analytics ────────────────────────────────────────────────────────────────
export interface PageVisit {
  id: string
  page: string
  visitor_id: string // anonymous UUID stored in cookie
  session_id: string
  ip_country: string | null
  ip_city: string | null
  referrer: string | null
  user_agent: string | null
  created_at: string
}

export interface PageDuration {
  id: string
  page: string
  visitor_id: string
  session_id: string
  duration_seconds: number
  created_at: string
}

export interface CvDownload {
  id: string
  visitor_id: string
  ip_country: string | null
  referrer: string | null
  created_at: string
}

export interface AnalyticsSummary {
  total_visits: number
  unique_visitors: number
  avg_duration_seconds: number
  cv_downloads: number
  top_pages: { page: string; visits: number }[]
  visits_by_day: { date: string; visits: number }[]
  visits_by_country: { country: string; visits: number }[]
}

// ─── Contact ──────────────────────────────────────────────────────────────────
export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  created_at: string
}

export type ContactMessageInsert = Omit<ContactMessage, 'id' | 'read' | 'created_at'>

// ─── Blog (Supabase) ──────────────────────────────────────────────────────────
export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string // Markdown
  cover_image_url: string | null
  tags: string[]
  published: boolean
  published_at: string | null
  created_at: string
  updated_at: string
}

export type BlogPostInsert = Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>
export type BlogPostUpdate = Partial<BlogPostInsert>

export interface BlogPostSummary {
  id: string
  title: string
  slug: string
  excerpt: string
  cover_image_url: string | null
  tags: string[]
  published: boolean
  published_at: string | null
  created_at: string
}

// ─── API Responses ────────────────────────────────────────────────────────────
export interface ApiSuccess<T = null> {
  success: true
  data: T
  message?: string
}

export interface ApiError {
  success: false
  error: string
  code?: string
}

export type ApiResponse<T = null> = ApiSuccess<T> | ApiError
