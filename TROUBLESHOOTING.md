# 🔧 Troubleshooting Guide

Common issues and their solutions.

## ✅ Issue: "Failed to load url /src/main.tsx"

**Problem:** The `src` folder was missing from the portfolio-frontend.

**Solution:** ✅ **FIXED!** The src and public folders have been copied.

If you still see this error:
```bash
cd Projects\IT-Portfolio\portfolio-frontend
# Verify src folder exists
dir src
# Restart the dev server
npm run dev
```

---

## 🔧 Common Issues

### 1. Port Already in Use

**Error:**
```
Error: Port 5173 is already in use
```

**Solution:**
```powershell
# Find and kill process on port 5173
Get-Process -Id (Get-NetTCPConnection -LocalPort 5173).OwningProcess | Stop-Process -Force

# Or use a different port
npm run dev -- --port 3000
```

### 2. Module Not Found

**Error:**
```
Cannot find module 'react' or its corresponding type declarations
```

**Solution:**
```bash
# Delete node_modules and reinstall
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### 3. Node Version Issues

**Error:**
```
The engine "node" is incompatible with this module
```

**Solution:**
```bash
# Check your Node version
node --version

# Need Node.js v18 or higher
# Download from: https://nodejs.org/
```

### 4. TypeScript Errors

**Error:**
```
TS2307: Cannot find module '@/components/...'
```

**Solution:**
- Ensure `tsconfig.json` has proper path aliases
- Restart VS Code / your editor
- Run `npm install` again

### 5. Tailwind Styles Not Loading

**Problem:** Styles not applying in portfolio.

**Solution:**
```bash
# Verify tailwind.config.ts exists
# Check that index.css imports Tailwind:
# @tailwind base;
# @tailwind components;
# @tailwind utilities;

# Restart dev server
npm run dev
```

### 6. Supabase Connection Issues

**Error:**
```
supabaseUrl is required
```

**Solution:**
1. Create `.env` file in portfolio-frontend or admin-dashboard
2. Add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your-project-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
3. Restart dev server

### 7. Build Fails

**Error:**
```
Build failed with errors
```

**Solution:**
```bash
# Clear cache and rebuild
npm run build -- --force

# Check for TypeScript errors
npm run lint

# Fix any reported issues
```

### 8. Images Not Loading

**Problem:** Project images or assets not showing.

**Solution:**
- Images should be in `public/` folder
- Reference them as `/image.jpg` not `./image.jpg`
- Check file extensions match exactly (case-sensitive)
- Verify images exist in the public folder

### 9. Admin Dashboard Not Starting

**Error:**
```
Failed to compile
```

**Solution:**
```bash
cd Projects\IT-Portfolio\admin-dashboard

# Clean install
Remove-Item -Recurse -Force node_modules
npm install

# Start
npm start
```

### 10. Git Issues

**Problem:** Can't commit or push changes.

**Solution:**
```bash
# Check git status
git status

# If .env files are being tracked:
git rm --cached .env
git rm --cached portfolio-frontend/.env
git rm --cached admin-dashboard/.env

# Ensure .gitignore includes .env files
```

---

## 🚀 Quick Fixes

### Reset Everything
```powershell
# Stop all dev servers (Ctrl+C in terminals)

# Portfolio Frontend - Clean reinstall
cd Projects\IT-Portfolio\portfolio-frontend
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
npm run dev

# Admin Dashboard - Clean reinstall
cd Projects\IT-Portfolio\admin-dashboard
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
npm start
```

### Clear Browser Cache
```
1. Open browser DevTools (F12)
2. Right-click refresh button
3. Select "Empty Cache and Hard Reload"
```

### Restart VS Code
```
Sometimes TypeScript/ESLint need a restart:
1. Close VS Code
2. Reopen the project folder
3. Wait for TypeScript server to initialize
```

---

## 📝 Verification Checklist

Before asking for help, verify:

- [ ] Node.js version is 18 or higher (`node --version`)
- [ ] npm is installed (`npm --version`)
- [ ] You're in the correct directory
- [ ] `node_modules` folder exists
- [ ] `package.json` exists
- [ ] `src` folder exists with `main.tsx` (portfolio) or `index.jsx` (dashboard)
- [ ] No other processes using the same port
- [ ] `.env` file configured (if using Supabase)
- [ ] Internet connection working (for installing packages)

---

## 🆘 Still Having Issues?

### Check the Logs
Look for specific error messages in:
- Terminal output
- Browser console (F12)
- Network tab in DevTools

### Common Error Keywords
- **ENOENT** = File not found
- **EADDRINUSE** = Port already in use
- **MODULE_NOT_FOUND** = Missing dependency
- **TS2307** = TypeScript import error
- **CORS** = Cross-origin request blocked

### Get Help
1. Read the error message carefully
2. Google the exact error message
3. Check Stack Overflow
4. Review official documentation:
   - [Vite Docs](https://vite.dev/)
   - [React Docs](https://react.dev/)
   - [Supabase Docs](https://supabase.com/docs)

---

## 💡 Prevention Tips

1. **Always commit working code** to Git
2. **Don't modify node_modules** directly
3. **Keep dependencies updated** regularly
4. **Use .env for secrets**, never commit them
5. **Test changes** in development before building
6. **Keep backups** of important customizations

---

**Most common fix:** Delete `node_modules`, run `npm install`, restart dev server! 🔄
