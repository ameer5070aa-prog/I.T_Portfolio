# 🚀 Quick Start Guide

Get your IT Portfolio up and running in minutes!

## ⚡ Fast Setup (5 Minutes)

### Step 1: Install Dependencies

Open **two separate terminal windows**:

**Terminal 1 - Portfolio Frontend:**
```bash
cd C:\Users\ameer\Projects\IT-Portfolio\portfolio-frontend
npm install
```

**Terminal 2 - Admin Dashboard:**
```bash
cd C:\Users\ameer\Projects\IT-Portfolio\admin-dashboard
npm install
```

### Step 2: Start Development Servers

**Terminal 1 - Portfolio Frontend:**
```bash
npm run dev
```
Opens at: `http://localhost:5173`

**Terminal 2 - Admin Dashboard:**
```bash
npm start
```
Opens at: `http://localhost:5174`

### Step 3: View Your Portfolio

- **Portfolio**: Open browser to `http://localhost:5173`
- **Dashboard**: Open browser to `http://localhost:5174`

## ✅ You're Ready!

Both apps should now be running. You can:
- View the portfolio in your browser
- Explore the admin dashboard
- Start customizing the content

---

## 🎨 First Customizations (10 Minutes)

### 1. Update Your Name & Info

**File:** `portfolio-frontend/src/components/HeroSection.tsx`

Look for and update:
```typescript
<h1>Your Name</h1>
<p>Your Title/Role</p>
```

### 2. Add Your Projects

**File:** `portfolio-frontend/public/projects.json`

Add your projects in this format:
```json
{
  "id": 1,
  "title": "Your Project Name",
  "description": "Brief description",
  "image": "/path-to-image.jpg",
  "technologies": ["React", "Node.js"],
  "github": "https://github.com/yourusername/repo",
  "live": "https://yourproject.com"
}
```

### 3. Update Skills

**File:** `portfolio-frontend/src/components/SkillsSection.tsx`

Add your technical skills with icons from [Lucide Icons](https://lucide.dev/).

---

## 🔧 Common Commands

### Portfolio Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Check code quality
```

### Admin Dashboard
```bash
npm start            # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
yarn lint            # Check code quality
```

---

## 🐛 Troubleshooting

### Port Already in Use?
If you see "Port already in use" error:

```bash
# For Portfolio (port 5173)
# Find and kill the process
Get-Process -Id (Get-NetTCPConnection -LocalPort 5173).OwningProcess | Stop-Process

# For Dashboard (port 5174)
Get-Process -Id (Get-NetTCPConnection -LocalPort 5174).OwningProcess | Stop-Process
```

### Dependencies Not Installing?
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
Remove-Item -Recurse -Force node_modules
npm install
```

### Module Not Found?
```bash
# Reinstall dependencies
npm install
```

---

## 📚 Next Steps

1. ✅ **Customize Content** - Add your info, projects, skills
2. ✅ **Choose Color Scheme** - Update theme colors
3. ✅ **Add Images** - Replace placeholder images with yours
4. ✅ **Test Responsive** - Check on mobile/tablet views
5. ✅ **Deploy** - Push to Vercel/Netlify when ready

---

## 💡 Pro Tips

- **Save Time**: Keep both terminals open while developing
- **Live Reload**: Both apps auto-refresh when you save files
- **Browser DevTools**: Use F12 to inspect and debug
- **Git**: Initialize git repo to track your changes
  ```bash
  cd C:\Users\ameer\Projects\IT-Portfolio
  git init
  git add .
  git commit -m "Initial IT Portfolio setup"
  ```

---

**Need more help?** Check the main `README.md` for detailed documentation!
