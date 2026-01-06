# 🧪 Manual Testing Instructions

**Status:** Backend is RUNNING ✅  
**Your Action Required:** Test the integration

---

## ✅ **Current Status**

### **Backend Server**
- ✅ Running on port 3001
- ✅ All endpoints tested and working
- ✅ Data loaded: 3 projects, 25 skills, 1 certification, 2 labs

### **Test Page**
- ✅ Created at: `C:\Users\ameer\Projects\IT-Portfolio\backend\test.html`
- ⚠️ Currently shows "Failed to fetch" (needs refresh after backend started)

### **React App**
- ✅ Running on port 8080
- ⚠️ Needs testing

---

## 🧪 **STEP-BY-STEP TESTING**

### **Step 1: Test Backend API (Verify it's working)**

Open PowerShell and run:

```powershell
# Test health
Invoke-RestMethod -Uri "http://localhost:3001/api/health"

# Test projects
Invoke-RestMethod -Uri "http://localhost:3001/api/projects"

# Test skills
Invoke-RestMethod -Uri "http://localhost:3001/api/skills/by-category"
```

**Expected Result:** You should see JSON data with projects, skills, etc.

---

### **Step 2: Test with Simple HTML Page**

1. **Open the test page:**
   - File path: `C:\Users\ameer\Projects\IT-Portfolio\backend\test.html`
   - Or just double-click it in Explorer

2. **Press F5 to refresh** (backend is now running)

3. **What you should see:**
   - ✅ **Projects section:** 3 projects listed
     - AI Clone Tool
     - Fitness Tracker
     - Chess Analyzer
   - ✅ **Skills section:** 5 categories with skills
     - IT Support & Troubleshooting
     - Operating Systems & Hardware
     - Networking Fundamentals
     - Tools & Practices
     - Communication & Process
   - ✅ **Certifications:** CompTIA A+ with description

4. **If you still see errors:**
   - Press Ctrl+Shift+J to open console
   - Look for CORS errors
   - Check if it says "Failed to fetch" or specific error

---

### **Step 3: Test React Portfolio App**

1. **Open your browser**

2. **Visit:** `http://localhost:8080`

3. **What you should see:**
   - ✨ Animated particle background
   - 👤 Hero section with name and title
   - 📊 **Projects section** with 3 project cards
   - 🛠️ **Skills section** with skill categories
   - 🎓 **Certifications section** with CompTIA A+
   - 🧪 **Labs section** with 2 labs
   - 📧 **Contact section**

4. **Check if data is loading:**
   - Press F12 to open DevTools
   - Go to **Network** tab
   - Refresh page (Ctrl+R)
   - Filter by "Fetch/XHR"
   - Look for these calls (should all be Status 200):
     - `GET /api/projects?status=published`
     - `GET /api/skills/by-category`
     - `GET /api/certifications`
     - `GET /api/labs`
     - `GET /api/personal`

---

## 📊 **Expected Results**

### **Test Page (Simple HTML)**
```
✅ Projects
   Found 3 projects
   • AI Clone Tool
   • Fitness Tracker  
   • Chess Analyzer

✅ Skills
   Found 5 skill categories
   • [All 25 skills displayed]

✅ Certifications
   Found 1 certifications
   • CompTIA A+
```

### **React App (http://localhost:8080)**
```
✅ Beautiful animated UI
✅ All sections populated with data
✅ No console errors
✅ Network requests all 200 OK
✅ Real-time updates every 10-30 seconds
```

---

## 🐛 **Troubleshooting**

### **Test Page Shows "Failed to fetch"**

**Cause:** Backend wasn't running when page loaded

**Fix:**
```powershell
# Check if backend is running
Get-NetTCPConnection -LocalPort 3001 -ErrorAction SilentlyContinue

# If not running, start it
cd C:\Users\ameer\Projects\IT-Portfolio\backend
node server.js

# Then refresh test page (F5)
```

---

### **React App Shows Blank Page**

**Possible causes:**

1. **Frontend not running**
   ```powershell
   cd C:\Users\ameer\Projects\IT-Portfolio\portfolio-frontend
   npm run dev
   # Opens at http://localhost:8080
   ```

2. **JavaScript errors in console**
   - Press F12 → Console tab
   - Look for red error messages
   - Copy error and check if it's import-related

3. **API calls failing**
   - F12 → Network tab
   - Refresh page
   - Check if API calls are failing (red status)
   - If CORS errors, backend CORS config needs adjustment

---

### **CORS Errors in Browser Console**

If you see: `Access-Control-Allow-Origin error`

**Fix:**
Check `backend/server.js` has this:
```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:8080',  // ← Should include this
    'http://localhost:3000'
  ],
  credentials: true
}));
```

---

## ✅ **Success Checklist**

Once you complete testing, check these off:

- [ ] Backend API responding to PowerShell test commands
- [ ] Test page displays all 3 projects
- [ ] Test page displays all 25 skills in 5 categories
- [ ] Test page displays CompTIA A+ certification
- [ ] React app loads at http://localhost:8080
- [ ] React app shows animated particle background
- [ ] React app displays all projects
- [ ] React app displays all skills
- [ ] React app displays certifications
- [ ] No errors in browser console
- [ ] Network tab shows successful API calls (200 OK)

---

## 📸 **What to Report Back**

Please tell me:

1. **Test Page (test.html):**
   - ✅ Works perfectly / ⚠️ Shows errors / ❌ Blank

2. **React App (localhost:8080):**
   - ✅ Displays all data / ⚠️ Partially working / ❌ Blank or errors

3. **Any errors you see:**
   - Copy from browser console (F12)
   - Or screenshot of the page

---

## 🎯 **Next Steps After Successful Test**

Once you confirm both are working:

1. ✅ **Phase 5 Complete** - Frontend integration successful
2. 🚀 **Move to Phase 4** - Build Admin Dashboard CRUD interface
3. 🎨 **Customize Content** - Update with your actual information

---

**Last Updated:** 2026-01-05 23:00 PM  
**Backend:** ✅ Running  
**Awaiting:** Your test results
