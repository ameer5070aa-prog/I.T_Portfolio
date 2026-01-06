# 🔗 Integration Guide

Learn how to connect your portfolio frontend with the admin dashboard for dynamic content management.

## 🎯 Integration Goals

- Manage portfolio content from admin dashboard
- Store data in a backend (Supabase recommended)
- Real-time updates between admin and frontend
- Secure authentication for admin access

---

## 📊 Architecture Overview

```
┌─────────────────────┐
│  Portfolio Frontend │ ──────┐
│   (Public Facing)   │       │
└─────────────────────┘       │
                              ▼
                        ┌──────────┐
                        │ Supabase │
                        │ Database │
                        └──────────┘
                              ▲
┌─────────────────────┐       │
│  Admin Dashboard    │ ──────┘
│  (Authenticated)    │
└─────────────────────┘
```

---

## 🚀 Option 1: Supabase Integration (Recommended)

### Why Supabase?
- ✅ Free tier available
- ✅ Real-time database
- ✅ Built-in authentication
- ✅ REST API auto-generated
- ✅ TypeScript support
- ✅ Easy to setup

### Step 1: Create Supabase Project

1. Go to [Supabase](https://supabase.com)
2. Sign up / Log in
3. Click "New Project"
4. Note your **API URL** and **anon key**

### Step 2: Create Database Tables

Run this SQL in Supabase SQL Editor:

```sql
-- Projects table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  technologies TEXT[],
  github_url TEXT,
  live_url TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Skills table
CREATE TABLE skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  level INTEGER CHECK (level >= 1 AND level <= 5),
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Certifications table
CREATE TABLE certifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  date DATE,
  credential_url TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog posts table (optional)
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT,
  excerpt TEXT,
  image_url TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact submissions table
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public can view published projects"
  ON projects FOR SELECT
  USING (true);

CREATE POLICY "Public can view skills"
  ON skills FOR SELECT
  USING (true);

CREATE POLICY "Public can view certifications"
  ON certifications FOR SELECT
  USING (true);

CREATE POLICY "Public can view published blog posts"
  ON blog_posts FOR SELECT
  USING (published = true);

CREATE POLICY "Public can insert contact submissions"
  ON contact_submissions FOR INSERT
  WITH CHECK (true);

-- Admin full access (after setting up authentication)
-- CREATE POLICY "Admin full access" ON projects
--   FOR ALL USING (auth.role() = 'authenticated');
```

### Step 3: Configure Portfolio Frontend

**File:** `portfolio-frontend/.env`

```env
VITE_SUPABASE_URL=your-project-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**File:** `portfolio-frontend/src/lib/supabase.ts`

Already configured! Just add your credentials to `.env`

### Step 4: Update Components to Use Supabase

**Example: Fetch Projects**

```typescript
// portfolio-frontend/src/hooks/useProjects.ts
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });
};
```

**Use in Component:**

```typescript
import { useProjects } from '@/hooks/useProjects';

function ProjectsSection() {
  const { data: projects, isLoading } = useProjects();
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      {projects?.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
```

### Step 5: Configure Admin Dashboard

**File:** `admin-dashboard/.env`

```env
VITE_SUPABASE_URL=your-project-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**Install Supabase:**

```bash
cd admin-dashboard
npm install @supabase/supabase-js
```

**Create Supabase Client:**

```javascript
// admin-dashboard/src/config/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
```

### Step 6: Create Admin CRUD Pages

**Example: Project Management Page**

```jsx
// admin-dashboard/src/views/admin/ProjectsManager.jsx
import { useState, useEffect } from 'react';
import { supabase } from '@/config/supabase';
import { Card, Button, Table, Modal, Form } from 'react-bootstrap';

export default function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  // Fetch projects
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error) setProjects(data);
  };

  // Create/Update project
  const handleSave = async (projectData) => {
    if (currentProject) {
      // Update
      await supabase
        .from('projects')
        .update(projectData)
        .eq('id', currentProject.id);
    } else {
      // Create
      await supabase
        .from('projects')
        .insert([projectData]);
    }
    
    fetchProjects();
    setShowModal(false);
  };

  // Delete project
  const handleDelete = async (id) => {
    if (confirm('Delete this project?')) {
      await supabase
        .from('projects')
        .delete()
        .eq('id', id);
      
      fetchProjects();
    }
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title>Manage Projects</Card.Title>
        <Button onClick={() => { setCurrentProject(null); setShowModal(true); }}>
          Add New Project
        </Button>
      </Card.Header>
      <Card.Body>
        <Table responsive>
          <thead>
            <tr>
              <th>Title</th>
              <th>Technologies</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project.id}>
                <td>{project.title}</td>
                <td>{project.technologies?.join(', ')}</td>
                <td>
                  <Button size="sm" onClick={() => { setCurrentProject(project); setShowModal(true); }}>
                    Edit
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(project.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}
```

---

## 🔐 Adding Authentication

### Step 1: Enable Auth in Supabase

1. Go to Authentication in Supabase dashboard
2. Enable Email provider
3. Create an admin user

### Step 2: Protect Admin Routes

```jsx
// admin-dashboard/src/components/ProtectedRoute.jsx
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/config/supabase';

export default function ProtectedRoute({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!session) return <Navigate to="/login" />;
  
  return children;
}
```

### Step 3: Create Login Page

```jsx
// admin-dashboard/src/views/auth/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/config/supabase';
import { Card, Form, Button } from 'react-bootstrap';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (!error) {
      navigate('/dashboard');
    } else {
      alert('Login failed: ' + error.message);
    }
  };

  return (
    <Card>
      <Card.Body>
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit">Login</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
```

---

## 🎨 Alternative: REST API Backend

If you prefer building your own backend:

### Tech Stack Options

1. **Node.js + Express + PostgreSQL**
2. **Python + FastAPI + PostgreSQL**
3. **ASP.NET Core + SQL Server**

### Basic Structure

```
backend/
├── src/
│   ├── routes/
│   │   ├── projects.js
│   │   ├── skills.js
│   │   └── certifications.js
│   ├── controllers/
│   ├── models/
│   └── middleware/
├── package.json
└── .env
```

### Example API Endpoints

```
GET    /api/projects          # Get all projects
GET    /api/projects/:id      # Get single project
POST   /api/projects          # Create project (auth required)
PUT    /api/projects/:id      # Update project (auth required)
DELETE /api/projects/:id      # Delete project (auth required)

GET    /api/skills            # Get all skills
POST   /api/skills            # Create skill (auth required)

GET    /api/certifications    # Get all certifications
POST   /api/certifications    # Create certification (auth required)

POST   /api/contact           # Submit contact form
```

---

## 📊 Real-time Updates

Enable live updates when content changes:

```typescript
// Subscribe to changes
useEffect(() => {
  const subscription = supabase
    .channel('projects-changes')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'projects' },
      (payload) => {
        console.log('Change received!', payload);
        fetchProjects(); // Refresh data
      }
    )
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
}, []);
```

---

## 🎯 Next Steps

1. ✅ Choose your backend solution (Supabase recommended)
2. ✅ Set up database tables
3. ✅ Configure environment variables
4. ✅ Update frontend to fetch from API
5. ✅ Create admin CRUD pages
6. ✅ Add authentication
7. ✅ Test the full flow
8. ✅ Deploy!

---

**Questions?** Check the [Supabase Docs](https://supabase.com/docs) or create an issue!
