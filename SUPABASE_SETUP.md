# 🗄️ Supabase Setup Guide

**Complete guide to migrating from local JSON to Supabase**

---

## 📋 Prerequisites

- Supabase account (free tier available)
- Node.js installed
- Project files at `C:\Users\ameer\Projects\IT-Portfolio\`

---

## 🚀 Step-by-Step Setup

### **Step 1: Create Supabase Account**

1. Visit **https://supabase.com**
2. Click **"Start your project"**
3. Sign up with GitHub or email
4. Verify your email

### **Step 2: Create New Project**

1. Click **"New Project"**
2. Select your organization
3. Fill in project details:
   - **Name:** `it-portfolio` (or your choice)
   - **Database Password:** Generate strong password (save it!)
   - **Region:** Choose closest to you
   - **Pricing Plan:** Free (sufficient for portfolio)
4. Click **"Create new project"**
5. Wait 2-3 minutes for project to initialize

### **Step 3: Get API Credentials**

1. In Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL:** `https://xxxxx.supabase.co`
   - **anon/public key:** `eyJhbGc...` (long token)
   - **service_role key:** (keep secret, for admin only)

3. Save credentials securely (you'll need them in Step 6)

### **Step 4: Run SQL Schema**

1. In Supabase dashboard, go to **SQL Editor**
2. Open the file: `C:\Users\ameer\Projects\IT-Portfolio\supabase\schema.sql`
3. Copy entire SQL content
4. Paste into Supabase SQL Editor
5. Click **"Run"** button
6. Wait for success message: "Success. No rows returned"

**Expected Result:**
- 6 tables created: projects, skills, certifications, labs, contact_submissions, personal_info
- Row Level Security (RLS) enabled
- Policies created for public read, admin write
- Storage bucket created for uploads

**Verify Tables:**
- Go to **Table Editor**
- You should see all 6 tables listed
- Each table should show column names

### **Step 5: Migrate Existing Data**

Open PowerShell and run:

```powershell
cd C:\Users\ameer\Projects\IT-Portfolio\supabase
node migrate.js
```

**What it does:**
- Reads your JSON files (projects, skills, etc.)
- Uploads to Supabase tables
- Preserves all data
- Shows progress

**Expected output:**
```
✓ Migrated 3 projects
✓ Migrated 25 skills
✓ Migrated 1 certification
✓ Migrated 2 labs
✓ Migrated personal info
Migration complete!
```

### **Step 6: Update Environment Variables**

#### **Portfolio Frontend**

Create/update: `portfolio-frontend/.env.local`

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

#### **Admin Dashboard**

Create/update: `admin-dashboard/.env.local`

```env
REACT_APP_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your_anon_key_here
```

**Replace:**
- `YOUR_PROJECT_ID` with your actual project ID
- `your_anon_key_here` with your anon/public key

### **Step 7: Test Connection**

#### **Test in Supabase Dashboard**

1. Go to **Table Editor** → **projects**
2. You should see your 3 projects
3. Go to **skills** → see 25 skills
4. All data should be present

#### **Test Portfolio Frontend**

```powershell
cd Projects\IT-Portfolio\portfolio-frontend
npm run dev
```

Visit `http://localhost:8080` - data should load from Supabase!

#### **Test Admin Dashboard**

```powershell
cd Projects\IT-Portfolio\admin-dashboard
npm start
```

Visit `http://localhost:3000` - should connect to Supabase!

---

## 🎯 Verification Checklist

- [ ] Supabase project created
- [ ] SQL schema executed successfully
- [ ] All 6 tables visible in Table Editor
- [ ] Migration script completed without errors
- [ ] Data visible in Supabase tables
- [ ] Environment variables updated in both apps
- [ ] Portfolio frontend loads data from Supabase
- [ ] Admin dashboard connects to Supabase
- [ ] Can create/edit/delete items in admin
- [ ] Changes appear on frontend

---

## 🔒 Security Notes

**API Keys:**
- ✅ **anon/public key** - Safe for frontend (has RLS protection)
- ❌ **service_role key** - NEVER expose in frontend! Server-side only

**Row Level Security (RLS):**
- ✅ Public can READ published content
- ❌ Public CANNOT modify data
- ✅ Authenticated users can do everything (when you add auth)

---

## 🐛 Troubleshooting

### **"Migration failed" Error**

**Solution:**
1. Check Supabase credentials in `.env` files
2. Verify SQL schema ran successfully
3. Check console for specific error
4. Ensure internet connection

### **"No data displaying"**

**Solution:**
1. Check browser console (F12) for errors
2. Verify environment variables are correct
3. Restart dev servers after updating `.env`
4. Check Supabase dashboard - is data there?

### **"RLS policy error"**

**Solution:**
1. Verify SQL schema included RLS policies
2. Check Table Editor → table → Policies tab
3. Should see policies for SELECT, INSERT, etc.

### **"Storage bucket not found"**

**Solution:**
1. Go to Storage in Supabase dashboard
2. Click "Create bucket"
3. Name: `portfolio-uploads`
4. Public: Yes
5. Run storage policies from schema.sql

---

## 📚 Next Steps

After Supabase is working:

1. **Add Authentication** (optional but recommended)
   - Enable Email/Password in Supabase Auth
   - Protect admin dashboard with login
   - Secure RLS policies with auth.uid()

2. **Optimize Performance**
   - Add indexes for frequently queried fields
   - Enable Postgres caching
   - Use CDN for images

3. **Deploy to Production** (See DEPLOYMENT_GUIDE.md)
   - Deploy frontends to Vercel
   - Update environment variables
   - Test production deployment

---

## 🆘 Need Help?

- **Supabase Docs:** https://supabase.com/docs
- **SQL Editor:** https://supabase.com/docs/guides/database
- **Row Level Security:** https://supabase.com/docs/guides/auth/row-level-security

---

**Status:** Ready for migration! Follow steps 1-7 above.
