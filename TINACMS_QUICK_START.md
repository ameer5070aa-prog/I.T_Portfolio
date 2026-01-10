# TinaCMS Quick Start Guide

## ✅ Setup Complete!

Your TinaCMS is configured and ready to use with **TinaCMS Cloud**.

### Project Details:
- **Project Name**: I.TPortfolio
- **Client ID**: `d09c9da7-7a30-401b-a916-19cf41496921`
- **Dashboard**: https://app.tina.io/projects/d09c9da7-7a30-401b-a916-19cf41496921/

## 🚀 How to Use TinaCMS

### Step 1: Start the Development Server
```bash
cd Projects/IT-Portfolio
npm run dev:tina
```

This will start both:
- Vite dev server (your website)
- TinaCMS server (the CMS backend)

### Step 2: Access the CMS Admin
Open your browser and go to:
```
http://localhost:3000/admin
```

### Step 3: Log In
- Click "Login with TinaCMS Cloud"
- Authenticate with your GitHub account (same one connected to TinaCMS)
- You'll be redirected back to your site

### Step 4: Start Editing!
Once logged in, you can:
- Edit the **Hero Section** (headline, description, status badge)
- Update the **About Section** (bio, stats)
- Manage **Projects** (create, edit, delete)
- Update **Contact Information**

## 📝 Content Collections

TinaCMS is configured to manage these collections:

### 1. Hero Section (`src/content/hero.json`)
- Status Badge
- Headline
- Description
- Skills list

### 2. About Section (`src/content/about.json`)
- Section Title
- Bio (rich text)
- Stats (label/value pairs)

### 3. Projects (`src/content/projects/*.json`)
- Title
- Summary
- What it covers (list)
- Skills demonstrated (list)
- Why it matters
- YouTube video URL
- Display order

### 4. Contact Info (`src/content/contact.json`)
- Email
- LinkedIn URL
- GitHub URL
- Twitter/X URL

## 🔧 Configuration Files

### Environment Variables (`.env.local`)
```env
NEXT_PUBLIC_TINA_CLIENT_ID=d09c9da7-7a30-401b-a916-19cf41496921
TINA_TOKEN=
NEXT_PUBLIC_TINA_BRANCH=main
```

### TinaCMS Config (`tina/config.ts`)
- Defines all content collections
- Sets up field types and validation
- Configures media handling
- All ready to go!

## 🎨 Tips & Tricks

### Editing Content
1. **Save Changes**: Click the "Save" button to commit changes to GitHub
2. **Preview**: Changes appear in real-time as you edit
3. **Discard**: Click "Reset" to undo unsaved changes

### Managing Projects
- Projects are stored as individual JSON files in `src/content/projects/`
- Use the "order" field to control display order
- Video URLs should be full YouTube URLs

### Media Files
- Images are stored in `public/images/`
- Use the media manager to upload new images
- Reference images with relative paths: `/images/filename.jpg`

## 🚨 Troubleshooting

### Can't Access Admin Panel
- Make sure the dev server is running: `npm run dev:tina`
- Check the URL: `http://localhost:3000/admin` (not `/admin/`)
- Clear browser cache and try again

### Login Issues
- Ensure you're using the GitHub account connected to TinaCMS
- Check your TinaCMS dashboard: https://app.tina.io/
- Verify the Client ID is correct in `.env.local`

### Changes Not Saving
- Make sure you're logged in
- Check browser console for errors
- Verify GitHub repository is connected in TinaCMS dashboard

### Dev Server Won't Start
- Check if port 3000 is already in use
- Try: `npm install` to ensure all dependencies are installed
- Check for errors in the terminal

## 📚 Next Steps

### 1. Test TinaCMS (Now)
```bash
npm run dev:tina
```
Visit http://localhost:3000/admin and try editing content!

### 2. Configure GitHub Integration
In your TinaCMS dashboard:
- Verify GitHub repository is connected
- Check branch settings (should be "main")
- Test committing changes

### 3. Deploy to Production
When ready to deploy:
1. Add environment variables to Vercel/Netlify
2. Push changes to GitHub
3. TinaCMS will work in production automatically!

## 🎉 You're All Set!

TinaCMS is now configured and ready to use. The setup uses TinaCMS Cloud, which means:
- ✅ No local database needed
- ✅ No build tool requirements
- ✅ Works with Node.js v24
- ✅ Easy to deploy to production

**Ready to start editing?**
```bash
npm run dev:tina
```

Then visit: http://localhost:3000/admin

Happy editing! 🚀
