# IT Portfolio Project

A comprehensive IT portfolio showcasing your skills, projects, and professional experience with both a public-facing portfolio and an admin dashboard for content management.

## 🎯 Project Overview

This project combines two powerful templates:
- **Portfolio Frontend**: Modern React/TypeScript portfolio with Tailwind CSS
- **Admin Dashboard**: Professional admin panel for managing portfolio content

## 📁 Project Structure

```
IT-Portfolio/
├── portfolio-frontend/          # Public-facing portfolio website
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Main pages (Index, Admin, NotFound)
│   │   ├── hooks/              # Custom React hooks
│   │   └── lib/                # Utilities and Supabase config
│   ├── public/                 # Static assets
│   └── package.json
│
├── admin-dashboard/            # Admin panel for content management
│   ├── src/
│   │   ├── components/         # Dashboard components
│   │   ├── views/              # Dashboard views
│   │   ├── layouts/            # Layout components
│   │   └── routes/             # Route configuration
│   └── package.json
│
├── docs/                       # Project documentation
├── shared/                     # Shared resources (optional)
└── README.md                   # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Git** - For version control

### Installation

#### 1. Portfolio Frontend Setup

```bash
# Navigate to portfolio frontend
cd Projects/IT-Portfolio/portfolio-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The portfolio will be available at `http://localhost:5173`

#### 2. Admin Dashboard Setup

```bash
# Navigate to admin dashboard
cd Projects/IT-Portfolio/admin-dashboard

# Install dependencies
npm install
# or
yarn install

# Start development server
npm start
# or
yarn start
```

The admin dashboard will be available at `http://localhost:5174`

## 🛠️ Technology Stack

### Portfolio Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Routing**: React Router DOM
- **State Management**: React Query (@tanstack/react-query)
- **Backend**: Supabase (optional)
- **Icons**: Lucide React

### Admin Dashboard
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Bootstrap 5 + SCSS
- **UI Library**: React Bootstrap
- **Charts**: ApexCharts
- **Routing**: React Router DOM
- **Icons**: Feather Icons

## 📦 Key Features

### Portfolio Frontend
- ✨ Modern, responsive design
- 🎨 Beautiful particle background effects
- 📱 Mobile-first approach
- 🎯 Sections: Hero, About, Skills, Projects, Labs, Certifications, Contact
- 🌓 Theme support with next-themes
- 📊 Project showcase with filtering
- 🎓 Certifications display
- 📧 Contact form integration

### Admin Dashboard
- 📊 Analytics dashboard
- 📈 Data visualization with charts
- 🎨 Professional UI components
- 📱 Fully responsive
- 🔐 Authentication pages (login/register)
- 📋 Sample pages for customization
- 🎛️ Customizable layouts

## 🎨 Customization Guide

### Portfolio Content

1. **Update Personal Information**
   - Edit `portfolio-frontend/src/components/HeroSection.tsx`
   - Edit `portfolio-frontend/src/components/AboutSection.tsx`

2. **Add Projects**
   - Update `portfolio-frontend/public/projects.json`
   - Or integrate with Supabase for dynamic content

3. **Customize Skills**
   - Edit `portfolio-frontend/src/components/SkillsSection.tsx`

4. **Add Certifications**
   - Edit `portfolio-frontend/src/components/CertificationsSection.tsx`

5. **Styling**
   - Modify `portfolio-frontend/tailwind.config.ts`
   - Edit component styles in respective files

### Dashboard Customization

1. **Navigation Menu**
   - Edit `admin-dashboard/src/menu-items.js`

2. **Dashboard Content**
   - Modify views in `admin-dashboard/src/views/dashboard/`

3. **Theme Colors**
   - Edit SCSS variables in `admin-dashboard/src/assets/scss/settings/`

## 🔗 Integration Ideas

### Connect Frontend & Backend
1. **Use Supabase** for backend services
   - User authentication
   - Project management
   - Blog posts
   - Contact form submissions

2. **Create API endpoints** for:
   - Fetching portfolio items
   - Managing projects
   - Handling contact submissions
   - Analytics tracking

3. **Admin Dashboard Integration**
   - Build admin pages to manage portfolio content
   - Connect to same Supabase instance
   - Create CRUD operations for projects, blogs, etc.

## 📝 Development Workflow

### Recommended Setup
1. Run both apps simultaneously during development
2. Use separate terminals for each app
3. Test responsive design on multiple devices
4. Use browser dev tools for debugging

### Build for Production

#### Portfolio Frontend
```bash
cd portfolio-frontend
npm run build
```
Output: `portfolio-frontend/dist/`

#### Admin Dashboard
```bash
cd admin-dashboard
npm run build
```
Output: `admin-dashboard/dist/`

## 🌐 Deployment Options

### Portfolio Frontend
- **Vercel** (Recommended for React/Vite)
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**

### Admin Dashboard
- **Vercel**
- **Netlify**
- **Heroku**
- **DigitalOcean App Platform**

### Deployment Tips
- Use environment variables for sensitive data
- Configure CORS for API calls
- Set up proper domain/subdomain structure:
  - `yourname.com` → Portfolio
  - `admin.yourname.com` → Dashboard

## 🎓 Learning Resources

### React & TypeScript
- [React Official Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Styling
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Bootstrap Docs](https://getbootstrap.com/)

### Backend
- [Supabase Docs](https://supabase.com/docs)

## 🤝 Next Steps

1. **Customize Your Portfolio**
   - Add your personal information
   - Update projects and certifications
   - Add your resume/CV

2. **Build Admin Features**
   - Create project management page
   - Add blog/article management
   - Implement contact form handler

3. **Add Advanced Features**
   - User authentication
   - Real-time updates
   - Analytics integration
   - SEO optimization

4. **Deploy**
   - Choose hosting platform
   - Set up CI/CD pipeline
   - Configure custom domain

## 📄 License

- Portfolio Template: Check `portfolio-frontend/` for license details
- Dashboard Template: MIT License (see `admin-dashboard/`)

## 🆘 Need Help?

- Portfolio Template: [Lovable Documentation](https://lovable.dev)
- Dashboard Template: [DashboardKit Docs](https://codedthemes.gitbook.io/dashboardkit-react)

---

**Happy Building! 🚀**

Start by customizing the portfolio with your information, then build out admin features to manage your content dynamically.
