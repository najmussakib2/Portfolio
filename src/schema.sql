-- ============================================================
-- PORTFOLIO DATABASE SCHEMA
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── Portfolio Settings ───────────────────────────────────────────────────────
CREATE TABLE portfolio_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL DEFAULT 'Full Stack Developer',
  name TEXT NOT NULL DEFAULT 'Your Name',
  bio TEXT NOT NULL DEFAULT 'A passionate developer building elegant solutions.',
  email TEXT NOT NULL DEFAULT 'you@example.com',
  location TEXT NOT NULL DEFAULT 'Dhaka, Bangladesh',
  avatar_url TEXT,
  cv_url TEXT,
  open_to_work BOOLEAN NOT NULL DEFAULT true,
  availability_message TEXT DEFAULT 'Available for freelance & full-time',
  github_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  website_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Only one settings row ever exists
INSERT INTO portfolio_settings (name, title, bio, email, location)
VALUES ('Your Name', 'Full Stack Developer', 'A passionate developer who loves building things.', 'you@example.com', 'Dhaka, Bangladesh');

-- ─── Projects ─────────────────────────────────────────────────────────────────
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  tech_stack TEXT[] NOT NULL DEFAULT '{}',
  github_url TEXT,
  live_url TEXT,
  image_url TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  order_index INTEGER NOT NULL DEFAULT 0,
  category TEXT NOT NULL DEFAULT 'fullstack'
    CHECK (category IN ('frontend', 'backend', 'fullstack', 'mobile', 'other')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Sample projects
INSERT INTO projects (title, description, tech_stack, featured, order_index, category) VALUES
('E-Commerce Platform', 'A full-featured online store with cart, payments, and admin panel.', ARRAY['Next.js', 'Supabase', 'Stripe', 'Tailwind'], true, 1, 'fullstack'),
('Portfolio CMS', 'This very portfolio — built with Next.js, Supabase, and Hygraph.', ARRAY['Next.js', 'Supabase', 'Hygraph', 'GraphQL'], true, 2, 'fullstack'),
('Task Manager API', 'RESTful API for task management with auth and team support.', ARRAY['Node.js', 'PostgreSQL', 'JWT'], false, 3, 'backend');

-- ─── Skills ───────────────────────────────────────────────────────────────────
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'other'
    CHECK (category IN ('frontend', 'backend', 'devops', 'tools', 'other')),
  proficiency INTEGER NOT NULL DEFAULT 80 CHECK (proficiency BETWEEN 1 AND 100),
  icon TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Sample skills
INSERT INTO skills (name, category, proficiency, order_index) VALUES
('React', 'frontend', 90, 1),
('Next.js', 'frontend', 88, 2),
('TypeScript', 'frontend', 85, 3),
('Tailwind CSS', 'frontend', 92, 4),
('Node.js', 'backend', 85, 5),
('PostgreSQL', 'backend', 80, 6),
('Supabase', 'backend', 82, 7),
('GraphQL', 'backend', 75, 8),
('Docker', 'devops', 70, 9),
('Git', 'tools', 90, 10);

-- ─── Testimonials ─────────────────────────────────────────────────────────────
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT,
  avatar_url TEXT,
  content TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  visible BOOLEAN NOT NULL DEFAULT true,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Sample testimonial
INSERT INTO testimonials (name, role, company, content, rating, order_index) VALUES
('Sarah Johnson', 'Product Manager', 'TechCorp', 'Delivered an outstanding product on time. Exceptional attention to detail and great communication throughout.', 5, 1);

-- ─── Analytics: Page Visits ───────────────────────────────────────────────────
CREATE TABLE page_visits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page TEXT NOT NULL,
  visitor_id TEXT NOT NULL,
  session_id TEXT NOT NULL,
  ip_country TEXT,
  ip_city TEXT,
  referrer TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fast analytics queries
CREATE INDEX idx_page_visits_created_at ON page_visits(created_at);
CREATE INDEX idx_page_visits_visitor_id ON page_visits(visitor_id);
CREATE INDEX idx_page_visits_page ON page_visits(page);

-- ─── Analytics: Page Durations ────────────────────────────────────────────────
CREATE TABLE page_durations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page TEXT NOT NULL,
  visitor_id TEXT NOT NULL,
  session_id TEXT NOT NULL,
  duration_seconds INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_page_durations_created_at ON page_durations(created_at);

-- ─── Analytics: CV Downloads ──────────────────────────────────────────────────
CREATE TABLE cv_downloads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  visitor_id TEXT NOT NULL,
  ip_country TEXT,
  referrer TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_cv_downloads_created_at ON cv_downloads(created_at);

-- ─── Contact Messages ─────────────────────────────────────────────────────────
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_contact_messages_read ON contact_messages(read);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

ALTER TABLE portfolio_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_durations ENABLE ROW LEVEL SECURITY;
ALTER TABLE cv_downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- ─── Public READ policies (anyone can read) ───────────────────────────────────
CREATE POLICY "Public can read settings"
  ON portfolio_settings FOR SELECT USING (true);

CREATE POLICY "Public can read projects"
  ON projects FOR SELECT USING (true);

CREATE POLICY "Public can read skills"
  ON skills FOR SELECT USING (true);

CREATE POLICY "Public can read visible testimonials"
  ON testimonials FOR SELECT USING (visible = true);

-- ─── Public INSERT policies (for analytics + contact) ────────────────────────
CREATE POLICY "Anyone can insert page visits"
  ON page_visits FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can insert page durations"
  ON page_durations FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can insert cv downloads"
  ON cv_downloads FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can insert contact messages"
  ON contact_messages FOR INSERT WITH CHECK (true);

-- ─── Admin policies (authenticated user only) ────────────────────────────────
-- Settings
CREATE POLICY "Admin can update settings"
  ON portfolio_settings FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Projects
CREATE POLICY "Admin can insert projects"
  ON projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin can update projects"
  ON projects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can delete projects"
  ON projects FOR DELETE USING (auth.role() = 'authenticated');

-- Skills
CREATE POLICY "Admin can insert skills"
  ON skills FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin can update skills"
  ON skills FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can delete skills"
  ON skills FOR DELETE USING (auth.role() = 'authenticated');

-- Testimonials
CREATE POLICY "Admin can insert testimonials"
  ON testimonials FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin can update testimonials"
  ON testimonials FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can delete testimonials"
  ON testimonials FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can read all testimonials"
  ON testimonials FOR SELECT USING (auth.role() = 'authenticated');

-- Analytics (admin read only)
CREATE POLICY "Admin can read page visits"
  ON page_visits FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can read page durations"
  ON page_durations FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can read cv downloads"
  ON cv_downloads FOR SELECT USING (auth.role() = 'authenticated');

-- Contact messages (admin read + update for marking read)
CREATE POLICY "Admin can read contact messages"
  ON contact_messages FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can update contact messages"
  ON contact_messages FOR UPDATE USING (auth.role() = 'authenticated');

-- ============================================================
-- HELPER FUNCTIONS
-- ============================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_portfolio_settings_updated_at
  BEFORE UPDATE ON portfolio_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- ANALYTICS VIEWS (convenient for admin dashboard)
-- ============================================================

-- Daily visits view
CREATE VIEW daily_visits AS
SELECT
  DATE(created_at) AS date,
  COUNT(*) AS total_visits,
  COUNT(DISTINCT visitor_id) AS unique_visitors
FROM page_visits
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Monthly visits view
CREATE VIEW monthly_visits AS
SELECT
  TO_CHAR(created_at, 'YYYY-MM') AS month,
  COUNT(*) AS total_visits,
  COUNT(DISTINCT visitor_id) AS unique_visitors
FROM page_visits
GROUP BY TO_CHAR(created_at, 'YYYY-MM')
ORDER BY month DESC;

-- Yearly visits view
CREATE VIEW yearly_visits AS
SELECT
  EXTRACT(YEAR FROM created_at)::TEXT AS year,
  COUNT(*) AS total_visits,
  COUNT(DISTINCT visitor_id) AS unique_visitors
FROM page_visits
GROUP BY EXTRACT(YEAR FROM created_at)
ORDER BY year DESC;

-- Per-page average duration view
CREATE VIEW page_avg_duration AS
SELECT
  page,
  ROUND(AVG(duration_seconds)) AS avg_seconds,
  COUNT(*) AS sessions
FROM page_durations
GROUP BY page
ORDER BY avg_seconds DESC;
