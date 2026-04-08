# 🌐 Najmus Sakib — Full Stack Developer Portfolio

A modern, feature-rich personal portfolio with a full admin dashboard, blog system, analytics, and contact management. Built with Next.js 14, Supabase, and Tailwind CSS.

---

## ✨ Features

### 🎨 Public Portfolio
- **Animated Hero** — typewriter effect, orbiting tech icons, star canvas background
- **Custom Cursor** — smooth lagging ring cursor with hover effects
- **Mouse Particles** — colored particle trail following the cursor
- **Scroll Animations** — elements reveal as you scroll
- **Skills Section** — dual infinite marquee + categorized skill cards
- **Projects** — filterable grid with spotlight hover effect (pulls from database)
- **Blog** — post listing and individual post pages (pulls from database)
- **Contact Form** — validated form with email notifications via Resend
- **Dark / Light Mode** — smooth theme toggle with persistence
- **Fully Responsive** — mobile-first design

### ⚙️ Admin Dashboard (`/admin`)
- **Analytics** — daily/monthly/yearly visit charts, top pages, top countries, CV downloads
- **Settings** — dynamically update name, title, bio, social links, open-to-work status
- **Projects** — full CRUD with featured toggle, category, tech stack
- **Blog** — full CRUD with markdown editor, publish/unpublish, auto slug generation
- **Skills** — grouped by category with proficiency slider
- **Messages** — inbox for contact form submissions with read/unread tracking
- **Testimonials** — manage client quotes with star ratings and visibility toggle

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Email | Resend |
| Animations | CSS Animations + Canvas API |
| Hosting | Vercel |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Public portfolio homepage
│   ├── layout.tsx                # Root layout with theme provider
│   ├── globals.css               # Global styles & CSS variables
│   ├── blog/                     # Blog listing & post pages
│   ├── admin/                    # Admin dashboard pages
│   │   ├── page.tsx              # Analytics dashboard
│   │   ├── settings/             # Portfolio settings
│   │   ├── projects/             # Projects CRUD
│   │   ├── blog/                 # Blog CRUD
│   │   ├── skills/               # Skills CRUD
│   │   ├── messages/             # Contact messages inbox
│   │   └── testimonials/         # Testimonials CRUD
│   └── api/                      # API routes (backend)
│       ├── admin/                # Protected admin endpoints
│       ├── analytics/            # Visit & CV tracking
│       ├── auth/                 # Login & logout
│       └── contact/              # Contact form handler
├── components/
│   ├── sections/                 # Page sections (Hero, About, Skills...)
│   ├── canvas/                   # Star canvas background
│   └── ui/                       # Reusable UI (Cursor, Particles, Reveal)
├── contexts/
│   └── ThemeContext.tsx           # Dark/light mode context
├── hooks/
│   ├── index.ts                  # Typewriter, scroll reveal, mouse hooks
│   └── useAnalytics.ts           # Analytics tracking hook
├── lib/
│   ├── supabase/                 # Supabase client & server instances
│   ├── resend/                   # Email client & templates
│   └── auth.ts                   # Admin auth guard
├── middleware.ts                  # Protects /admin routes
└── types/
    └── index.ts                  # TypeScript type definitions
supabase/
└── schema.sql                    # Full database schema with RLS policies
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A [Supabase](https://supabase.com) account
- A [Resend](https://resend.com) account

### 1. Clone the repository

```bash
git clone https://github.com/najmussakib2/portfolio.git
cd portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Resend (email)
RESEND_API_KEY=your_resend_api_key

# Admin email (where contact form messages are sent)
ADMIN_EMAIL=your@email.com
```

### 4. Set up the database

Go to **Supabase → SQL Editor** and run the full contents of `supabase/schema.sql`. This creates all tables, indexes, RLS policies, and analytics views.

### 5. Create your admin user

Go to **Supabase → Authentication → Users → Add User** and create a user with your email and password. This is your admin login.

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio.
Open [http://localhost:3000/admin](http://localhost:3000/admin) to access the admin dashboard.

---

## 🗄️ Database Schema

| Table | Purpose |
|---|---|
| `portfolio_settings` | Dynamic portfolio content (name, title, bio, links) |
| `projects` | Portfolio projects with tech stack and links |
| `skills` | Skills grouped by category with proficiency levels |
| `testimonials` | Client testimonials with ratings |
| `blog_posts` | Blog posts with markdown content |
| `contact_messages` | Incoming contact form submissions |
| `page_visits` | Analytics — page visit tracking |
| `page_durations` | Analytics — time spent per page |
| `cv_downloads` | Analytics — CV download tracking |

---

## 🔐 API Routes

### Public
| Method | Route | Description |
|---|---|---|
| `GET` | `/api/admin/projects` | Fetch all projects |
| `GET` | `/api/admin/blog` | Fetch published blog posts |
| `GET` | `/api/admin/settings` | Fetch portfolio settings |
| `GET` | `/api/admin/skills` | Fetch all skills |
| `POST` | `/api/contact` | Submit contact form |
| `POST` | `/api/analytics/track` | Track page visit |
| `POST` | `/api/analytics/duration` | Track time on page |
| `POST` | `/api/analytics/cv` | Track CV download |

### Protected (Admin only)
| Method | Route | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Admin login |
| `POST` | `/api/auth/logout` | Admin logout |
| `PATCH` | `/api/admin/settings` | Update portfolio settings |
| `POST/PATCH/DELETE` | `/api/admin/projects` | Manage projects |
| `POST/PATCH/DELETE` | `/api/admin/blog` | Manage blog posts |
| `POST/PATCH/DELETE` | `/api/admin/skills` | Manage skills |
| `POST/PATCH/DELETE` | `/api/admin/testimonials` | Manage testimonials |
| `GET/PATCH` | `/api/contact` | Read/update messages |
| `GET` | `/api/analytics/summary` | Analytics dashboard data |

---

## 🎨 Color Palette

| Role | Dark Theme | Light Theme |
|---|---|---|
| Background | `#060B14` | `#F0FAFA` |
| Primary | `#0EA5E9` (Sky) | `#0EA5E9` (Sky) |
| Secondary | `#06B6D4` (Cyan) | `#0891B2` (Cyan) |
| Tertiary | `#14B8A6` (Teal) | `#0F766E` (Teal) |
| Accent | `#10B981` (Emerald) | `#059669` (Emerald) |
| Text | `#F0FAFA` | `#0F1E2E` |

---

## 📦 Key Dependencies

```json
{
  "next": "^14",
  "typescript": "^5",
  "tailwindcss": "^3",
  "@supabase/supabase-js": "^2",
  "@supabase/ssr": "^0",
  "resend": "^3"
}
```

---

## 🌍 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import your repository
3. Add all environment variables from `.env.local`
4. Deploy

Vercel automatically handles Next.js builds and serverless API routes.

---

## 📝 Customization

### Update your personal info
Go to `/admin/settings` and update your name, title, bio, social links, and avatar URL directly from the dashboard — no code changes needed.

### Add projects
Go to `/admin/projects` → click **New Project** → fill in details and save.

### Write blog posts
Go to `/admin/blog` → click **New Post** → write in markdown → publish.

### Update your photo
Replace the emoji in `src/components/sections/Hero.tsx` with:
```tsx
<img src="/avatar.jpg" alt="Najmus Sakib" className="w-full h-full object-cover" />
```
And place your photo at `public/avatar.jpg`.

---

## 👤 Author

**Najmus Sakib**
- 🌐 Portfolio: [your-portfolio-url.vercel.app](https://your-portfolio-url.vercel.app)
- 💼 LinkedIn: [linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile)
- 🐙 GitHub: [github.com/najmussakib2](https://github.com/najmussakib2)
- 📧 Email: your@email.com

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  Built with ❤️ from Dhaka, Bangladesh 🇧🇩
</div>
