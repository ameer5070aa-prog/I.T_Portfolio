-- IT Portfolio Supabase Schema
-- Generated: 2026-01-05
-- Run this SQL in Supabase SQL Editor

-- ==================== PROJECTS TABLE ====================

CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  summary TEXT NOT NULL,
  color TEXT DEFAULT '#3B82F6',
  image_url TEXT,
  video_url TEXT,
  github_url TEXT,
  live_url TEXT,
  technologies TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  category TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  order_num INTEGER DEFAULT 0,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects indexes
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_order ON projects(order_num);

-- ==================== SKILLS TABLE ====================

CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  proficiency INTEGER DEFAULT 3 CHECK (proficiency >= 1 AND proficiency <= 5),
  icon TEXT,
  description TEXT,
  order_num INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Skills indexes
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
CREATE INDEX IF NOT EXISTS idx_skills_order ON skills(order_num);

-- ==================== CERTIFICATIONS TABLE ====================

CREATE TABLE IF NOT EXISTS certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  status TEXT DEFAULT 'planned' CHECK (status IN ('planned', 'in_progress', 'completed')),
  issue_date DATE,
  expiry_date DATE,
  credential_id TEXT,
  credential_url TEXT,
  image_url TEXT,
  description TEXT,
  study_topics TEXT[] DEFAULT '{}',
  order_num INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Certifications indexes
CREATE INDEX IF NOT EXISTS idx_certifications_status ON certifications(status);
CREATE INDEX IF NOT EXISTS idx_certifications_order ON certifications(order_num);

-- ==================== LABS TABLE ====================

CREATE TABLE IF NOT EXISTS labs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  technologies TEXT[] DEFAULT '{}',
  date_completed DATE,
  image_url TEXT,
  repository_url TEXT,
  notes TEXT,
  order_num INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Labs indexes
CREATE INDEX IF NOT EXISTS idx_labs_order ON labs(order_num);
CREATE INDEX IF NOT EXISTS idx_labs_date ON labs(date_completed);

-- ==================== CONTACT SUBMISSIONS TABLE ====================

CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  replied_at TIMESTAMPTZ
);

-- Contact indexes
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_submissions(created_at DESC);

-- ==================== PERSONAL INFO TABLE ====================

CREATE TABLE IF NOT EXISTS personal_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  title TEXT NOT NULL,
  bio TEXT,
  tagline TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  location TEXT,
  avatar_url TEXT,
  resume_url TEXT,
  social_links JSONB DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==================== ROW LEVEL SECURITY ====================

-- Enable RLS on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE labs ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE personal_info ENABLE ROW LEVEL SECURITY;

-- Projects policies
CREATE POLICY "Anyone can view published projects"
  ON projects FOR SELECT
  USING (status = 'published');

CREATE POLICY "Authenticated users can do everything with projects"
  ON projects FOR ALL
  USING (auth.role() = 'authenticated');

-- Skills policies (public read)
CREATE POLICY "Anyone can view skills"
  ON skills FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage skills"
  ON skills FOR ALL
  USING (auth.role() = 'authenticated');

-- Certifications policies (public read)
CREATE POLICY "Anyone can view certifications"
  ON certifications FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage certifications"
  ON certifications FOR ALL
  USING (auth.role() = 'authenticated');

-- Labs policies (public read)
CREATE POLICY "Anyone can view labs"
  ON labs FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage labs"
  ON labs FOR ALL
  USING (auth.role() = 'authenticated');

-- Contact submissions policies
CREATE POLICY "Anyone can insert contact submissions"
  ON contact_submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view and manage contact submissions"
  ON contact_submissions FOR ALL
  USING (auth.role() = 'authenticated');

-- Personal info policies (public read)
CREATE POLICY "Anyone can view personal info"
  ON personal_info FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can update personal info"
  ON personal_info FOR ALL
  USING (auth.role() = 'authenticated');

-- ==================== STORAGE BUCKET ====================

-- Create storage bucket for uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-uploads', 'portfolio-uploads', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policy: anyone can read, authenticated can upload
CREATE POLICY "Public Access to Portfolio Uploads"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolio-uploads');

CREATE POLICY "Authenticated users can upload files"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'portfolio-uploads' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update their uploads"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'portfolio-uploads' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete their uploads"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'portfolio-uploads' AND auth.role() = 'authenticated');

-- ==================== FUNCTIONS ====================

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_certifications_updated_at BEFORE UPDATE ON certifications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_labs_updated_at BEFORE UPDATE ON labs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_personal_info_updated_at BEFORE UPDATE ON personal_info
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==================== COMPLETE ====================
-- Schema setup complete!
-- Next steps:
-- 1. Run migration script to import data
-- 2. Update frontend environment variables
-- 3. Test the connection
