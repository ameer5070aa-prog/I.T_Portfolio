# 🚀 Deployment Guide

Complete guide to deploying your IT Portfolio to production.

## 🎯 Overview

You'll deploy two applications:
1. **Portfolio Frontend** - Public-facing portfolio
2. **Admin Dashboard** - Private admin panel

**Recommended Setup:**
- `yourname.com` → Portfolio Frontend
- `admin.yourname.com` → Admin Dashboard

---

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

**Best for:** React/Vite applications, fast deployment, automatic SSL

#### Portfolio Frontend

1. **Push to GitHub**
   ```bash
   cd portfolio-frontend
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Configure:
     - **Framework Preset:** Vite
     - **Root Directory:** `portfolio-frontend`
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`
   - Add Environment Variables:
     ```
     VITE_SUPABASE_URL=your-supabase-url
     VITE_SUPABASE_ANON_KEY=your-anon-key
     ```
   - Click "Deploy"

3. **Custom Domain**
   - Go to Project Settings → Domains
   - Add your domain: `yourname.com`
   - Update DNS records with your domain provider
   - Vercel handles SSL automatically

#### Admin Dashboard

1. **Push to GitHub** (separate repo or monorepo)
   ```bash
   cd admin-dashboard
   git init
   git add .
   git commit -m "Initial commit"
   git push
   ```

2. **Deploy on Vercel**
   - Import project
   - Configure:
     - **Root Directory:** `admin-dashboard`
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`
   - Add Environment Variables
   - Deploy

3. **Custom Subdomain**
   - Add domain: `admin.yourname.com`
   - Update DNS with CNAME record

---

### Option 2: Netlify

**Best for:** Static sites, great free tier

#### Deploy Portfolio

1. **Build locally**
   ```bash
   cd portfolio-frontend
   npm run build
   ```

2. **Deploy via Netlify CLI**
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify init
   netlify deploy --prod
   ```

3. **Or use Netlify UI**
   - Drag & drop `dist` folder
   - Or connect GitHub repo

4. **Configure**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Environment variables in Site settings

---

### Option 3: GitHub Pages

**Best for:** Simple static sites, free hosting

#### Portfolio Deployment

1. **Update vite.config.ts**
   ```typescript
   export default defineConfig({
     base: '/your-repo-name/', // Only if not using custom domain
     // ... rest of config
   })
   ```

2. **Build and deploy**
   ```bash
   npm run build
   cd dist
   git init
   git add .
   git commit -m "Deploy"
   git branch -M gh-pages
   git remote add origin https://github.com/yourusername/repo.git
   git push -f origin gh-pages
   ```

3. **Configure GitHub Pages**
   - Repo Settings → Pages
   - Source: gh-pages branch
   - Custom domain (optional)

**Note:** GitHub Pages is for static sites only, not ideal for admin dashboard with backend.

---

### Option 4: AWS (S3 + CloudFront)

**Best for:** Scalable hosting, full control

#### Setup

1. **Create S3 Bucket**
   - Bucket name: `yourname.com`
   - Enable static website hosting
   - Set bucket policy for public access

2. **Build and Upload**
   ```bash
   npm run build
   aws s3 sync dist/ s3://yourname.com
   ```

3. **Create CloudFront Distribution**
   - Origin: S3 bucket
   - Enable HTTPS
   - Add custom domain
   - Configure SSL certificate (ACM)

4. **Update DNS**
   - Add CNAME or ALIAS record
   - Point to CloudFront domain

---

## 🔐 Environment Variables Setup

### Portfolio Frontend (.env.production)
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_API_URL=https://api.yourname.com
```

### Admin Dashboard (.env.production)
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_API_URL=https://api.yourname.com
```

**Important:** Never commit `.env` files to Git!

---

## 🔒 Security Considerations

### Before Deployment

1. **Review CORS settings**
   - Configure allowed origins in Supabase/backend
   - Only allow your domains

2. **Enable RLS (Row Level Security)**
   - Supabase: Enable on all tables
   - Define proper policies

3. **Secure Admin Access**
   - Implement authentication
   - Use strong passwords
   - Enable 2FA if available
   - Restrict admin access by IP (optional)

4. **Environment Variables**
   - Never expose secrets in client code
   - Use server-side for sensitive operations
   - Rotate keys regularly

5. **HTTPS Only**
   - Force SSL redirect
   - Most platforms do this automatically

---

## 🧪 Pre-Deployment Checklist

### Testing
- [ ] Test all features locally
- [ ] Build production version
- [ ] Test production build locally (`npm run preview`)
- [ ] Check console for errors
- [ ] Test on different browsers
- [ ] Test on mobile devices
- [ ] Verify all links work
- [ ] Test contact form
- [ ] Check image loading
- [ ] Test admin CRUD operations

### Optimization
- [ ] Optimize images (compress, WebP format)
- [ ] Minify code (done automatically by Vite)
- [ ] Enable caching
- [ ] Run Lighthouse audit (score 90+)
- [ ] Check bundle size
- [ ] Remove unused dependencies

### SEO & Meta
- [ ] Add meta descriptions
- [ ] Configure Open Graph tags
- [ ] Add Twitter Card tags
- [ ] Create sitemap.xml
- [ ] Add robots.txt
- [ ] Verify favicon
- [ ] Test social sharing preview

### Content
- [ ] Remove all placeholder text
- [ ] Proofread all content
- [ ] Verify all personal information
- [ ] Check copyright year
- [ ] Update privacy policy (if needed)
- [ ] Add terms of service (if needed)

---

## 📊 Post-Deployment

### 1. Verify Deployment
- [ ] Visit live site
- [ ] Test all functionality
- [ ] Check mobile responsiveness
- [ ] Verify admin dashboard access
- [ ] Test authentication
- [ ] Check all external links

### 2. Set Up Monitoring

**Analytics:**
- Google Analytics 4
- Vercel Analytics (if using Vercel)
- Plausible (privacy-friendly alternative)

**Performance:**
- Google PageSpeed Insights
- GTmetrix
- WebPageTest

**Uptime:**
- UptimeRobot (free)
- Pingdom
- StatusCake

**Error Tracking:**
- Sentry
- LogRocket
- Rollbar

### 3. Submit to Search Engines

**Google:**
```bash
# Create sitemap.xml in public folder
# Submit to Google Search Console
https://search.google.com/search-console
```

**Bing:**
```bash
# Submit to Bing Webmaster Tools
https://www.bing.com/webmasters
```

### 4. Set Up Continuous Deployment

**Vercel/Netlify:**
- Automatic deployment on Git push
- Preview deployments for PRs
- Rollback capability

**GitHub Actions (if self-hosting):**
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm run build
      - run: npm run deploy
```

---

## 🌍 DNS Configuration

### For Custom Domain

**Portfolio (yourname.com):**
```
Type: A or ALIAS
Name: @
Value: [Hosting provider IP/domain]
```

**Admin (admin.yourname.com):**
```
Type: CNAME
Name: admin
Value: [Hosting provider domain]
```

**Wait for DNS propagation:** 24-48 hours (usually faster)

---

## 🔄 Updating Your Site

### Portfolio Changes
1. Make changes locally
2. Test thoroughly
3. Commit and push to main branch
4. Automatic deployment (if set up)
5. Verify live changes

### Manual Deployment
```bash
# Build
npm run build

# Deploy (varies by platform)
vercel --prod
# or
netlify deploy --prod
# or
aws s3 sync dist/ s3://your-bucket
```

---

## 🐛 Troubleshooting

### Build Fails
- Check Node version matches locally
- Verify all dependencies in package.json
- Check for TypeScript errors
- Review build logs

### Environment Variables Not Working
- Ensure variables prefixed with `VITE_`
- Rebuild after adding variables
- Check variable names (case-sensitive)

### 404 on Refresh
- Configure rewrite rules for SPA
- Vercel: automatic
- Netlify: add `_redirects` file:
  ```
  /*    /index.html   200
  ```

### CORS Errors
- Configure backend to allow your domain
- Check Supabase CORS settings
- Verify API URLs

### Images Not Loading
- Check image paths (relative vs absolute)
- Verify images are in public folder
- Check file extensions case

---

## 💰 Cost Estimate

### Free Tier (Good for Starting)
- **Hosting:** Vercel/Netlify Free
- **Backend:** Supabase Free (500MB database, 1GB file storage)
- **Domain:** $10-15/year
- **Total:** ~$10-15/year

### Upgraded (Production)
- **Hosting:** Vercel Pro $20/month
- **Backend:** Supabase Pro $25/month
- **Domain:** $10-15/year
- **Total:** ~$550/year

---

## 📚 Resources

- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com/)
- [Supabase Docs](https://supabase.com/docs)
- [GitHub Pages](https://pages.github.com/)
- [AWS S3 Static Hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)

---

**Ready to deploy?** Follow the steps for your chosen platform and launch your portfolio! 🚀
