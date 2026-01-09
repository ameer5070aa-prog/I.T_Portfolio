# Decap CMS Setup Instructions

## 🎯 Overview
Your IT Portfolio uses Decap CMS for content management, deployed on Vercel with Netlify Identity for authentication.

## ✅ What's Already Done
- ✅ Decap CMS installed and configured
- ✅ Admin panel at `/admin/`
- ✅ Netlify Identity widget added
- ✅ Code pushed to GitHub
- ✅ Local testing working

## 🚀 Production Setup Steps

### 1. Vercel Deployment (Hosting)
Your site is already deployed to Vercel at: https://i-t-portfolio.vercel.app

### 2. Netlify Setup (Authentication Only)

#### A. Create Netlify Site
1. Go to https://app.netlify.com/
2. Click "Add new site" → "Import an existing project"
3. Choose GitHub and select `I.T_Portfolio` repository
4. Build settings (won't be used, but fill in):
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click "Deploy site"

#### B. Enable Identity
1. In your Netlify site, go to **Site Settings** → **Identity**
2. Click **"Enable Identity"**

#### C. Enable Git Gateway
1. In Identity settings, scroll to **"Services"**
2. Click **"Enable Git Gateway"**
3. This allows Decap CMS to commit changes to GitHub

#### D. Configure Registration
1. In Identity → **"Registration"**
2. Set to **"Invite only"** (recommended)
3. Under "External providers", you can enable GitHub/Google login (optional)

#### E. Invite Yourself
1. Go to **Identity** tab (top menu)
2. Click **"Invite users"**
3. Enter your email: `ameer5070aa@gmail.com`
4. Check your email and accept the invitation
5. Set your password

### 3. Update Site URL (if needed)
If Netlify gives you a different site name, you may need to configure it in your Vercel environment variables (though this shouldn't be necessary for Git Gateway).

## 🧪 Testing Production CMS

1. Go to your Vercel site: https://i-t-portfolio.vercel.app/admin/
2. Click "Login with Netlify Identity"
3. Enter your Netlify Identity credentials
4. You should see the Decap CMS dashboard
5. Try editing content - it will commit changes to GitHub
6. Vercel will auto-deploy the changes

## 🔧 Local Development

To work locally:
1. Uncomment `local_backend: true` in `public/admin/config.yml`
2. Run `npx decap-server` in one terminal
3. Run `npm run dev` in another terminal
4. Access CMS at http://localhost:8080/admin/

## 📝 Notes

- **Hosting**: Vercel (fast, free, auto-deploys from GitHub)
- **CMS Backend**: GitHub (via Netlify Git Gateway)
- **Authentication**: Netlify Identity (free tier: 1000 users)
- **Content Storage**: JSON files in `src/content/` committed to GitHub

## 🆘 Troubleshooting

### "Error loading config.yml"
- Check that file exists at `/public/admin/config.yml`
- Verify YAML syntax is valid

### "Authentication failed"
- Verify Netlify Identity is enabled
- Check that Git Gateway is enabled
- Make sure you've accepted the invite email

### "Can't save content"
- Verify Git Gateway has GitHub permissions
- Check that branch name in config.yml matches your repo (currently: `master`)

## 🔄 Next Steps: Adding TinaCMS

After Decap CMS is working in production, we'll add TinaCMS for visual editing at `/tina/`.
