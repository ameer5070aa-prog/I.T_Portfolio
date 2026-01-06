# 🚀 Deploy to Vercel - Complete Guide

**Deploy your IT Portfolio to production in 15 minutes**

---

## 📋 Prerequisites

- ✅ Git repository with all code
- ✅ GitHub account
- ✅ Vercel account (free tier)
- ✅ Supabase project set up

---

## 🎯 Deployment Strategy

You'll deploy **TWO applications:**

1. **Portfolio Frontend** → `yourname.com` or `yourname.vercel.app`
2. **Admin Dashboard** → `admin-yourname.vercel.app` or subdomain

**Backend:** No need to deploy! Using Supabase directly.

---

## 📤 Step 1: Push to GitHub

### **Option A: Create New Repository via GitHub.com**

1. Go to https://github.com
2. Click **"New repository"**
3. Repository name: `it-portfolio`
4. Description: "My IT Portfolio with Admin Dashboard"
5. Public or Private (your choice)
6. **DO NOT** initialize with README (you already have one)
7. Click **"Create repository"**

### **Option B: Push to Existing Repository**

If you already have a repo, use that URL.

### **Push Your Code**

```powershell
cd C:\Users\ameer\Projects\IT-Portfolio

# Add remote (replace with YOUR GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/it-portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Verify:** Visit your GitHub repo - all files should be there!

---

## 🚀 Step 2: Deploy Portfolio Frontend to Vercel

### **2.1: Import Project**

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click **"Add New Project"**
4. Click **"Import"** next to your `it-portfolio` repository
5. Vercel will detect it has multiple apps

### **2.2: Configure Portfolio Frontend**

- **Project Name:** `my-it-portfolio` (or your choice)
- **Framework Preset:** Vite
- **Root Directory:** `portfolio-frontend` ← **IMPORTANT!**
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### **2.3: Environment Variables**

Click **"Environment Variables"** and add:

| Name | Value |
|------|-------|
| `VITE_SUPABASE_URL` | `https://YOUR_PROJECT.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `your-anon-key` |

**Important:** Use your actual Supabase credentials!

### **2.4: Deploy**

1. Click **"Deploy"**
2. Wait 2-3 minutes
3. You'll get a URL like: `my-it-portfolio.vercel.app`

**Test it:** Visit your Vercel URL - portfolio should work!

---

## 🎛️ Step 3: Deploy Admin Dashboard to Vercel

### **3.1: Add Second Project**

1. In Vercel dashboard, click **"Add New Project"**
2. Import the **SAME GitHub repository**
3. This time, configure for admin dashboard

### **3.2: Configure Admin Dashboard**

- **Project Name:** `my-it-portfolio-admin`
- **Framework Preset:** Vite
- **Root Directory:** `admin-dashboard` ← **IMPORTANT!**
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### **3.3: Environment Variables**

| Name | Value |
|------|-------|
| `REACT_APP_SUPABASE_URL` | `https://YOUR_PROJECT.supabase.co` |
| `REACT_APP_SUPABASE_ANON_KEY` | `your-anon-key` |

### **3.4: Deploy**

1. Click **"Deploy"**
2. Wait 2-3 minutes
3. You'll get: `my-it-portfolio-admin.vercel.app`

---

## 🌐 Step 4: Custom Domains (Optional)

### **Portfolio Domain**

1. Buy domain (Namecheap, Google Domains, etc.)
2. In Vercel project settings → **Domains**
3. Add: `yourname.com`
4. Follow DNS instructions
5. Wait for DNS propagation (5-60 minutes)

### **Admin Subdomain**

1. Add domain: `admin.yourname.com`
2. Create CNAME record pointing to Vercel
3. Vercel handles SSL automatically

---

## 🔒 Step 5: Secure Admin Dashboard (Important!)

### **Option A: Add Authentication**

Use Supabase Auth:

1. Enable Email/Password in Supabase → Authentication
2. Update admin dashboard to require login
3. Protect routes with auth check

### **Option B: Use Vercel Password Protection**

1. In Vercel project → Settings → Deployment Protection
2. Enable "Password Protection"
3. Set password
4. Only you can access admin

**Recommended:** Implement proper authentication (Option A)

---

## ✅ Step 6: Verify Deployment

### **Test Portfolio**
- Visit your Vercel URL
- All sections should load
- Data from Supabase displays
- Images load correctly
- Contact form works

### **Test Admin**
- Visit admin Vercel URL
- Login if authentication enabled
- Navigate to Portfolio Management
- Try creating a project
- Check if it appears on portfolio (may need refresh)

---

## 📊 Post-Deployment Checklist

- [ ] Portfolio deployed and accessible
- [ ] Admin dashboard deployed
- [ ] Both apps connect to Supabase
- [ ] All data displays correctly
- [ ] CRUD operations work in admin
- [ ] Changes in admin reflect on portfolio
- [ ] Images upload and display
- [ ] Contact form submissions reach Supabase
- [ ] Mobile responsive on both apps
- [ ] No console errors
- [ ] Custom domain configured (if using)
- [ ] SSL certificate active (automatic with Vercel)

---

## 🎯 URLs Summary

After deployment:

| Service | URL | Purpose |
|---------|-----|---------|
| **Portfolio** | `yourname.vercel.app` | Public portfolio |
| **Admin** | `yourname-admin.vercel.app` | Content management |
| **Supabase** | `xxxxx.supabase.co` | Database & API |
| **GitHub** | `github.com/you/repo` | Source code |

---

## 🔄 Continuous Deployment

**Automatic Deployments:**
- Push to `main` branch → Auto-deploys to production
- Push to other branches → Creates preview deployment
- Pull requests → Preview deployments

**Workflow:**
```bash
# Make changes locally
# Test locally
git add .
git commit -m "Update content"
git push

# Vercel auto-deploys in 2-3 minutes!
```

---

## 💰 Cost Estimate

**Free Tier (Perfect for portfolio):**
- ✅ Vercel: Free (2 projects, unlimited bandwidth)
- ✅ Supabase: Free (500MB database, 1GB storage)
- ✅ GitHub: Free (public repos)
- ✅ Total: $0/month

**With Custom Domain:**
- Domain: $10-15/year
- Total: ~$1-2/month

---

## 🐛 Troubleshooting

### **"Build failed" on Vercel**

**Solution:**
1. Check Vercel build logs
2. Verify `Root Directory` is set correctly
3. Ensure environment variables are added
4. Check package.json scripts

### **"Data not loading" in production**

**Solution:**
1. Check browser console for errors
2. Verify Supabase credentials in Vercel
3. Check Supabase RLS policies allow public read
4. Verify CORS settings in Supabase

### **"Images not displaying"**

**Solution:**
1. Upload images via admin dashboard
2. Store in Supabase Storage bucket
3. Use full URLs in image_url fields
4. Check storage bucket is public

---

## 🎉 Success!

Your IT Portfolio is now LIVE on the internet!

**Share your portfolio:**
- Add to LinkedIn profile
- Include in resume
- Share on social media
- Use in job applications

---

## 📚 Additional Resources

- **Vercel Docs:** https://vercel.com/docs
- **Supabase Docs:** https://supabase.com/docs
- **Custom Domains:** https://vercel.com/docs/concepts/projects/domains

---

**🎊 Congratulations on deploying your IT Portfolio!**
