// IT Portfolio - Shared TypeScript Types
// Auto-generated from database schema

export interface Project {
  id: string;
  title: string;
  description: string;
  summary: string;
  color: string;
  image_url: string | null;
  video_url: string | null;
  github_url: string | null;
  live_url: string | null;
  technologies: string[];
  features: string[];
  category: string;
  featured: boolean;
  order: number;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: 1 | 2 | 3 | 4 | 5;
  icon: string | null;
  description: string | null;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface SkillsByCategory {
  [category: string]: Skill[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  status: 'in_progress' | 'completed' | 'planned';
  issue_date: string | null;
  expiry_date: string | null;
  credential_id: string | null;
  credential_url: string | null;
  image_url: string | null;
  description: string;
  study_topics: string[];
  order: number;
  created_at: string;
  updated_at: string;
}

export interface Lab {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  date_completed: string;
  image_url: string | null;
  repository_url: string | null;
  notes: string | null;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
  replied_at: string | null;
}

export interface PersonalInfo {
  id: string;
  full_name: string;
  title: string;
  bio: string;
  tagline: string;
  email: string;
  phone: string | null;
  location: string | null;
  avatar_url: string | null;
  resume_url: string | null;
  social_links: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
  };
  updated_at: string;
}

// API Response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiError {
  error: string;
  status?: number;
}

// Form input types (for creating/updating)
export type CreateProjectInput = Omit<Project, 'id' | 'created_at' | 'updated_at'>;
export type UpdateProjectInput = Partial<CreateProjectInput>;

export type CreateSkillInput = Omit<Skill, 'id' | 'created_at' | 'updated_at'>;
export type UpdateSkillInput = Partial<CreateSkillInput>;

export type CreateCertificationInput = Omit<Certification, 'id' | 'created_at' | 'updated_at'>;
export type UpdateCertificationInput = Partial<CreateCertificationInput>;

export type CreateLabInput = Omit<Lab, 'id' | 'created_at' | 'updated_at'>;
export type UpdateLabInput = Partial<CreateLabInput>;

export type CreateContactInput = Omit<ContactSubmission, 'id' | 'status' | 'created_at' | 'replied_at'>;

export type UpdatePersonalInfoInput = Omit<PersonalInfo, 'id' | 'updated_at'>;
