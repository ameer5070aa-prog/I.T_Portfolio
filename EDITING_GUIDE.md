# 📘 Complete IT Portfolio Editing Guide

## Table of Contents
1. [Understanding Your Portfolio Structure](#structure)
2. [Starting the Development Server](#dev-server)
3. [Navigation Guide: What You See vs What File Controls It](#navigation)
4. [How to Edit in VS Code](#editing)
5. [Common Editing Tasks](#common-tasks)
6. [How RovoDev Edits Your Files](#rovodev-method)
7. [Pro Tips & Troubleshooting](#pro-tips)
8. [Quick Reference Tables](#quick-reference)

---

## 📁 Understanding Your Portfolio Structure {#structure}

Your IT Portfolio is built with:
- **React** - Component-based UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Shadcn/ui** - Pre-built components

### Folder Structure:
```
Projects/IT-Portfolio/
├── src/
│   ├── pages/
│   │   └── Index.tsx          ← Main page (imports all sections)
│   ├── components/
│   │   ├── HeroSection.tsx    ← Top intro section
│   │   ├── AboutSection.tsx   ← About me
│   │   ├── ProjectsSection.tsx ← Projects showcase
│   │   ├── LabsSection.tsx    ← Homelab projects
│   │   ├── SkillsSection.tsx  ← Skills grid
│   │   ├── CertificationsSection.tsx ← Certifications
│   │   ├── ContactSection.tsx ← Contact form
│   │   ├── Navbar.tsx         ← Navigation bar
│   │   ├── Footer.tsx         ← Footer
│   │   └── ui/                ← Reusable UI components
│   ├── index.css              ← Global styles & theme colors
│   ├── App.tsx                ← App wrapper
│   └── main.tsx               ← Entry point
├── public/                    ← Static assets (images, etc.)
├── package.json               ← Project dependencies
├── tailwind.config.ts         ← Tailwind customization
└── vite.config.ts             ← Vite configuration
```

### How It Works:
1. **main.tsx** loads **App.tsx**
2. **App.tsx** loads **pages/Index.tsx**
3. **Index.tsx** imports all section components
4. Each section is self-contained and editable independently

---

## 🚀 Starting the Development Server {#dev-server}

### Step 1: Open Terminal/PowerShell
```powershell
# Navigate to your portfolio folder
cd C:\Users\ameer\Projects\IT-Portfolio
```

### Step 2: Install Dependencies (First Time Only)
```powershell
npm install
```

### Step 3: Start Development Server
```powershell
npm run dev
```

### Expected Output:
```
VITE v5.4.19  ready in 500 ms

➜  Local:   http://localhost:8080/
➜  Network: http://192.168.x.x:8080/
➜  press h + enter to show help
```

### Step 4: Open in Browser
- Click the link or go to: `http://localhost:8080/`
- **Hot Module Replacement (HMR) is enabled** - changes appear instantly!
- Keep this terminal running while editing

---

## 🔍 Navigation Guide: What You See vs What File Controls It {#navigation}

This is the most important section - it maps what you SEE on the website to which FILE controls it.

### Complete Visual Map:

| **What You See on Website** | **File to Edit** | **Specific Lines** | **What's There** |
|----------------------------|------------------|-------------------|------------------|
| **NAVIGATION BAR** | | | |
| Top navigation menu | `Navbar.tsx` | Lines 15-40 | Menu links (Home, About, Projects, etc.) |
| Logo/Name in navbar | `Navbar.tsx` | Line 17 | Your name/branding |
| Mobile menu hamburger | `Navbar.tsx` | Lines 42-55 | Mobile navigation |
| | | | |
| **HERO SECTION (Top of page)** | | | |
| Status badge "Actively Building..." | `HeroSection.tsx` | Lines 26-31 | Green pulsing badge |
| Main headline "Hey, I'm Ameer..." | `HeroSection.tsx` | Lines 34-37 | H1 heading with gradient |
| Description paragraph | `HeroSection.tsx` | Lines 40-44 | Subheading text |
| "View Projects" button | `HeroSection.tsx` | Lines 47-52 | Primary CTA button |
| "Get in Touch" button | `HeroSection.tsx` | Lines 53-58 | Secondary button |
| Skills bar (Windows, AD, etc.) | `HeroSection.tsx` | Lines 67-76 | Tech stack badges |
| Scroll indicator arrow | `HeroSection.tsx` | Lines 79-82 | Animated down arrow |
| Background particles/effects | `ParticleBackground.tsx` | Full file | Animated background |
| | | | |
| **ABOUT SECTION** | | | |
| "About Me" heading | `AboutSection.tsx` | Line 15 | Section title |
| Bio paragraph 1 | `AboutSection.tsx` | Lines 18-21 | Your story |
| Bio paragraph 2 | `AboutSection.tsx` | Lines 22-25 | Background info |
| Bio paragraph 3 | `AboutSection.tsx` | Lines 26-29 | Career goals |
| Professional photo | `AboutSection.tsx` | Line 35 | Image placeholder |
| Stats/numbers | `AboutSection.tsx` | Lines 38-52 | Projects count, etc. |
| | | | |
| **SKILLS SECTION** | | | |
| "Skills & Technologies" title | `SkillsSection.tsx` | Line 12 | Section heading |
| Skill categories | `SkillsSection.tsx` | Lines 20-90 | OS, Networking, Tools, etc. |
| Individual skill icons | `SkillIcon.tsx` | Full file | Reusable skill component |
| Skill names & proficiency | `SkillsSection.tsx` | Each skill object | Name, icon, level |
| | | | |
| **PROJECTS SECTION** | | | |
| "Featured Projects" title | `ProjectsSection.tsx` | Line 15 | Section heading |
| Project cards | `ProjectCard.tsx` | Full file | Reusable card component |
| Project titles | `ProjectsSection.tsx` | In projects array | Each project name |
| Project descriptions | `ProjectsSection.tsx` | In projects array | Each description |
| Project tags (Python, Flask, etc.) | `ProjectsSection.tsx` | In projects array | Technology tags |
| GitHub/Live demo links | `ProjectsSection.tsx` | In projects array | Project URLs |
| | | | |
| **LABS SECTION** | | | |
| "Homelab Projects" title | `LabsSection.tsx` | Line 12 | Section heading |
| Lab cards | `LabCard.tsx` | Full file | Reusable lab component |
| Lab names | `LabsSection.tsx` | In labs array | Each lab name |
| Lab descriptions | `LabsSection.tsx` | In labs array | Each description |
| Lab technologies | `LabsSection.tsx` | In labs array | Tech used |
| | | | |
| **CERTIFICATIONS SECTION** | | | |
| "Certifications" title | `CertificationsSection.tsx` | Line 12 | Section heading |
| Cert badges/cards | `CertificationsSection.tsx` | Lines 25-60 | Each certification |
| Cert names & issuers | `CertificationsSection.tsx` | In certs array | CompTIA, Google, etc. |
| Cert dates | `CertificationsSection.tsx` | In certs array | Completion dates |
| | | | |
| **CONTACT SECTION** | | | |
| "Get In Touch" title | `ContactSection.tsx` | Line 15 | Section heading |
| Contact form fields | `ContactSection.tsx` | Lines 30-70 | Name, email, message inputs |
| Submit button | `ContactSection.tsx` | Line 75 | Form submit |
| Social media links | `ContactSection.tsx` | Lines 80-95 | GitHub, LinkedIn, etc. |
| Email address | `ContactSection.tsx` | Line 22 | Your email |
| | | | |
| **FOOTER** | | | |
| Copyright text | `Footer.tsx` | Line 18 | © 2025 Ameer Omer |
| Footer links | `Footer.tsx` | Lines 22-35 | Social/nav links |
| Footer description | `Footer.tsx` | Line 15 | Tagline |

---

## ✏️ How to Edit in VS Code {#editing}

### Setup: Side-by-Side Workflow

**Windows Split Screen:**
1. Open browser with `http://localhost:8080/` - Press `Win + Left Arrow`
2. Open VS Code - Press `Win + Right Arrow`
3. Now you can see changes in real-time!

### Method 1: Visual Navigation (Best for Beginners)

**Step-by-Step Example:**

**Scenario:** You want to change "Hey, I'm Ameer" to "Hey, I'm John"

1. **Identify the section:**
   - Look at browser: Top of page, main headline
   - Check table above: "Main headline" → `HeroSection.tsx`, Lines 34-37

2. **Open the file in VS Code:**
   - Left sidebar → `src` → `components` → Click `HeroSection.tsx`
   - Or use Quick Open: `Ctrl+P` → Type "HeroSection" → Enter

3. **Find the exact line:**
   - `Ctrl+G` → Type `34` → Enter (jumps to line 34)
   - Or `Ctrl+F` → Search for "Hey, I'm Ameer"

4. **Edit the text:**
   ```tsx
   // OLD:
   Hey, I'm <span className="gradient-text">Ameer</span>
   
   // NEW:
   Hey, I'm <span className="gradient-text">John</span>
   ```

5. **Save:**
   - Press `Ctrl+S`
   - Watch browser update instantly! ✨

### Method 2: Search Across All Files

**Use when you don't know which file contains something:**

1. **Global search:** `Ctrl+Shift+F`
2. Type what you see on the website (e.g., "Actively Building")
3. VS Code shows all files containing that text
4. Click the result to open the file

### Method 3: Component Tree Navigation

**Understanding the hierarchy:**
```
Index.tsx (main page)
├── Navbar.tsx
├── HeroSection.tsx
│   └── ParticleBackground.tsx
├── AboutSection.tsx
├── SkillsSection.tsx
│   └── SkillIcon.tsx (multiple instances)
├── ProjectsSection.tsx
│   └── ProjectCard.tsx (multiple instances)
├── LabsSection.tsx
│   └── LabCard.tsx (multiple instances)
├── CertificationsSection.tsx
├── ContactSection.tsx
└── Footer.tsx
```

**To change layout/order:** Edit `Index.tsx`
**To change content:** Edit individual section files

---

## 🛠️ Common Editing Tasks {#common-tasks}

### Task 1: Change Text Content

**Example: Update the status badge**

**Find in `HeroSection.tsx` (line 29):**
```tsx
<span className="text-xs font-mono text-muted-foreground">
  Actively Building IT Systems & Operations
</span>
```

**Edit to:**
```tsx
<span className="text-xs font-mono text-muted-foreground">
  Your new status text here
</span>
```

**Save** → Browser updates immediately!

---

### Task 2: Add/Remove/Edit Skills

**Find in `HeroSection.tsx` (line 68):**
```tsx
{['Windows', 'Active Directory', 'Ticketing Systems', 'Remote Support', 'Networking'].map((tech) => (
  <span 
    key={tech}
    className="px-3 py-1.5 text-xs font-mono text-muted-foreground bg-muted/30 rounded-md border border-border/50"
  >
    {tech}
  </span>
))}
```

**To add a skill:**
```tsx
{['Windows', 'Active Directory', 'Ticketing Systems', 'Remote Support', 'Networking', 'Docker', 'Python'].map((tech) => (
  // ... rest stays the same
))}
```

**To remove a skill:** Delete it from the array
**To reorder:** Change the order in the array

---

### Task 3: Update Your Name/Branding

**Multiple locations to update:**

1. **Navbar** (`Navbar.tsx`, line 17):
   ```tsx
   <span className="text-xl font-semibold gradient-text">Ameer Omer</span>
   ```

2. **Hero Section** (`HeroSection.tsx`, line 35):
   ```tsx
   Hey, I'm <span className="gradient-text">Ameer</span>
   ```

3. **Footer** (`Footer.tsx`, line 18):
   ```tsx
   <p className="text-sm text-muted-foreground">
     © 2025 Ameer Omer. All rights reserved.
   </p>
   ```

4. **HTML Title** (`index.html`, line 7):
   ```html
   <title>Ameer Omer - IT Portfolio</title>
   ```

---

### Task 4: Change Colors/Theme

**Open:** `src/index.css` (lines 8-70)

**CSS Variables Control Everything:**
```css
:root {
  --background: 240 10% 3.9%;        /* Dark background */
  --foreground: 0 0% 98%;            /* Light text */
  --primary: 160 84% 45%;            /* Cyan - main accent */
  --secondary: 142 70% 45%;          /* Green - secondary accent */
  --accent: 142 70% 45%;             /* Same as secondary */
  --destructive: 0 62.8% 30.6%;     /* Red - errors */
  --muted: 240 3.7% 15.9%;          /* Gray backgrounds */
  --border: 240 3.7% 15.9%;         /* Border color */
  /* ... more variables ... */
}
```

**HSL Color Format:**
- **H** (Hue): 0-360 (color wheel - 0=red, 120=green, 240=blue)
- **S** (Saturation): 0-100% (color intensity)
- **L** (Lightness): 0-100% (0=black, 50=normal, 100=white)

**Example: Change primary color from cyan to purple:**
```css
/* OLD */
--primary: 160 84% 45%;    /* Cyan */

/* NEW */
--primary: 280 84% 45%;    /* Purple */
```

**Save** → Entire site updates with new color!

---

### Task 5: Add a New Project

**Open:** `src/components/ProjectsSection.tsx`

**Find the projects array (around line 20):**
```tsx
const projects = [
  {
    title: "ClarityPC AI",
    description: "AI-powered PC diagnostic tool...",
    tags: ["Python", "Flask", "OpenAI"],
    githubUrl: "https://github.com/yourusername/claritypc",
    liveUrl: "https://claritypc.com",
    image: "/placeholder.svg"
  },
  // ... more projects
];
```

**Add your new project:**
```tsx
const projects = [
  {
    title: "ClarityPC AI",
    description: "AI-powered PC diagnostic tool...",
    tags: ["Python", "Flask", "OpenAI"],
    githubUrl: "https://github.com/yourusername/claritypc",
    liveUrl: "https://claritypc.com",
    image: "/placeholder.svg"
  },
  {
    title: "Your New Project",
    description: "Brief description of what it does...",
    tags: ["React", "Node.js", "MongoDB"],
    githubUrl: "https://github.com/yourusername/newproject",
    liveUrl: "https://newproject.com",
    image: "/placeholder.svg"
  },
  // ... existing projects
];
```

**Note:** Projects appear in the order you list them!

---

### Task 6: Update Contact Information

**Open:** `src/components/ContactSection.tsx`

**Find your email (line 22):**
```tsx
const email = "ameer.omer30@yahoo.com";
```

**Find social links (lines 80-95):**
```tsx
const socialLinks = [
  { icon: Github, url: "https://github.com/yourusername", label: "GitHub" },
  { icon: Linkedin, url: "https://linkedin.com/in/yourprofile", label: "LinkedIn" },
  { icon: Mail, url: "mailto:ameer.omer30@yahoo.com", label: "Email" }
];
```

**Update with your real links!**

---

## 🤖 How RovoDev Edits Your Files {#rovodev-method}

Understanding my process helps you communicate changes better.

### My 3-Step Process:

#### Step 1: Open the File
```typescript
open_files(["Projects/IT-Portfolio/src/components/HeroSection.tsx"])
```
I read the entire file to understand the context.

#### Step 2: Find Exact Code Block
I locate the EXACT code to replace, including:
- All indentation (spaces/tabs)
- Complete multi-line blocks
- Surrounding context

#### Step 3: Replace Precisely
```typescript
find_and_replace_code(
  file_path: "Projects/IT-Portfolio/src/components/HeroSection.tsx",
  find: `          <span className="text-xs font-mono text-muted-foreground">
              Available for IT Support roles
            </span>`,
  replace: `          <span className="text-xs font-mono text-muted-foreground">
              Actively Building IT Systems & Operations
            </span>`
)
```

### Why I Use This Method:

**❌ I DON'T do:**
- Edit single words without context
- Guess at formatting
- Change unrelated code

**✅ I DO:**
- Match exact indentation
- Preserve code structure
- Replace complete logical blocks
- Maintain proper syntax

### How to Request Changes from Me:

**Good Request:**
> "Change the main headline to say 'Hey, I'm John, a System Administrator' and keep the gradient on 'John' and 'System Administrator'"

**Even Better Request:**
> "In HeroSection.tsx, change line 35 from 'Hey, I'm Ameer, an IT professional' to 'Hey, I'm John, a System Administrator' - keep the same gradient styling"

**Best Request:**
> "Update HeroSection.tsx:
> - Line 35: Change name from Ameer to John
> - Line 35: Change 'IT professional' to 'System Administrator'
> - Keep gradient classes on both terms"

---

## ⚡ Pro Tips & Troubleshooting {#pro-tips}

### VS Code Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+P` | Quick file open (type filename) |
| `Ctrl+Shift+P` | Command palette |
| `Ctrl+F` | Find in current file |
| `Ctrl+H` | Find and replace in current file |
| `Ctrl+Shift+F` | Find across all files |
| `Ctrl+G` | Go to line number |
| `Ctrl+/` | Comment/uncomment line |
| `Alt+Up/Down` | Move line up/down |
| `Shift+Alt+Down` | Copy line down |
| `Ctrl+D` | Select next occurrence |
| `Ctrl+Shift+L` | Select all occurrences |
| `F2` | Rename symbol |

### Multiple Cursors (Power Feature!)

**Example:** Change "IT Support" to "System Admin" in 5 places at once:

1. Select first "IT Support"
2. Press `Ctrl+D` repeatedly to select more
3. Type new text - all change together!

### Don't Break the Syntax!

**Common Mistakes:**

❌ **Missing closing tag:**
```tsx
<div>
  <h1>Hello
</div>
```

✅ **Correct:**
```tsx
<div>
  <h1>Hello</h1>
</div>
```

❌ **Missing quote:**
```tsx
<span className="text-lg>Text</span>
```

✅ **Correct:**
```tsx
<span className="text-lg">Text</span>
```

❌ **Missing comma in array:**
```tsx
['Windows' 'Linux', 'Docker']
```

✅ **Correct:**
```tsx
['Windows', 'Linux', 'Docker']
```

### If Browser Shows Error:

1. **Check browser console:**
   - Press `F12`
   - Click "Console" tab
   - Error message shows file and line number

2. **Common errors:**
   - `Unexpected token` = Missing bracket/quote
   - `Cannot find module` = Wrong import path
   - `undefined is not a function` = Typo in code

3. **Quick fix:**
   - `Ctrl+Z` in VS Code to undo
   - Save again
   - Browser reloads

### If Changes Don't Appear:

1. **Hard refresh browser:** `Ctrl+Shift+R`
2. **Check dev server is running** (terminal should show Vite output)
3. **Restart dev server:**
   ```powershell
   # In terminal: Ctrl+C to stop
   npm run dev  # Start again
   ```

### Git Version Control (Backup Your Work!)

**Before making big changes:**
```powershell
# Save current state
git add .
git commit -m "Before editing: saving current version"

# Make changes...

# If you mess up, restore:
git checkout .
```

---

## 📚 Quick Reference Tables {#quick-reference}

### File Purpose Quick Look

| File | Purpose | When to Edit |
|------|---------|--------------|
| `HeroSection.tsx` | Top intro with headline | Change name, title, intro text |
| `AboutSection.tsx` | About me biography | Update your story |
| `ProjectsSection.tsx` | Project showcase | Add/remove/edit projects |
| `SkillsSection.tsx` | Skills grid | Add/remove skills |
| `LabsSection.tsx` | Homelab projects | Document lab work |
| `CertificationsSection.tsx` | Certifications | Add new certs |
| `ContactSection.tsx` | Contact form | Update email/socials |
| `Navbar.tsx` | Navigation | Change menu items |
| `Footer.tsx` | Footer | Update copyright |
| `index.css` | Global styles | Change colors/theme |
| `Index.tsx` | Page layout | Reorder sections |

### Component Hierarchy

```
App.tsx
└── Index.tsx (Main Page)
    ├── Navbar.tsx
    ├── HeroSection.tsx
    │   ├── ParticleBackground.tsx
    │   └── TerminalText.tsx
    ├── AboutSection.tsx
    ├── SkillsSection.tsx
    │   └── SkillIcon.tsx (×many)
    ├── ProjectsSection.tsx
    │   └── ProjectCard.tsx (×many)
    ├── LabsSection.tsx
    │   └── LabCard.tsx (×many)
    ├── CertificationsSection.tsx
    ├── ContactSection.tsx
    └── Footer.tsx
```

### Tailwind CSS Classes Quick Reference

Common classes you'll see:

| Class | What It Does |
|-------|--------------|
| `text-lg` | Large text |
| `text-muted-foreground` | Gray text color |
| `bg-background` | Background color |
| `px-4` | Horizontal padding (1rem) |
| `py-2` | Vertical padding (0.5rem) |
| `mb-8` | Margin bottom (2rem) |
| `rounded-md` | Rounded corners |
| `border` | Add border |
| `flex` | Flexbox layout |
| `grid` | Grid layout |
| `opacity-0` | Invisible (for animations) |
| `animate-fade-in` | Fade in animation |
| `gradient-text` | Gradient text effect (custom) |

---

## 🎯 Complete Workflow Example

### Scenario: Update Everything for Job Application

**Goal:** Customize portfolio for a specific job posting

#### Step 1: Start Dev Server
```powershell
cd C:\Users\ameer\Projects\IT-Portfolio
npm run dev
```

#### Step 2: Update Hero Section
**File:** `HeroSection.tsx`

**Changes:**
- Line 29: Update status badge to match job
- Line 35: Emphasize relevant skills in headline
- Line 41: Mention job-specific experience

```tsx
// Status badge
<span className="text-xs font-mono text-muted-foreground">
  Open to System Administrator Roles
</span>

// Headline
Hey, I'm <span className="gradient-text">Ameer</span>, a{' '}
<span className="gradient-text">Windows System Administrator</span>{' '}
focused on Active Directory and automation.

// Description
I specialize in Active Directory administration, PowerShell automation,
and Windows Server infrastructure with hands-on experience in enterprise
environments.
```

#### Step 3: Highlight Relevant Skills
**File:** `HeroSection.tsx` (line 68)

```tsx
{['Active Directory', 'Windows Server', 'PowerShell', 'Group Policy', 'Azure AD'].map((tech) => (
  // ... component code
))}
```

#### Step 4: Reorder Projects
**File:** `ProjectsSection.tsx`

Move most relevant project to top of array:
```tsx
const projects = [
  {
    title: "Active Directory Lab",  // Most relevant - put first!
    // ...
  },
  {
    title: "PowerShell Automation Scripts",
    // ...
  },
  // ... other projects
];
```

#### Step 5: Update Contact
**File:** `ContactSection.tsx`

Ensure professional email is prominent.

#### Step 6: Test & Deploy
```powershell
# Build for production
npm run build

# Test production build
npm run preview
```

---

## 🆘 Getting Help

### If You're Stuck:

1. **Check this guide** - Search `Ctrl+F` for your question
2. **Check browser console** - `F12` for error messages
3. **Ask RovoDev:**
   - Be specific: "I want to change X to Y"
   - Show what you tried
   - Include error messages if any

### Questions to Ask RovoDev:

✅ "How do I add a new section between Skills and Projects?"
✅ "The gradient isn't showing on my new text, what class do I need?"
✅ "Can you help me change the color scheme to blue?"
✅ "I want to add a blog section, where should I start?"

---

## 🎓 Next Steps

### Beginner Path:
1. ✅ Read this guide
2. ✅ Start dev server
3. ✅ Make simple text changes
4. ✅ Practice saving and seeing updates
5. ✅ Edit skills array
6. ✅ Add a project

### Intermediate Path:
1. ✅ Change colors in `index.css`
2. ✅ Reorder sections in `Index.tsx`
3. ✅ Add new component
4. ✅ Customize animations
5. ✅ Add custom images

### Advanced Path:
1. ✅ Create new section from scratch
2. ✅ Modify Tailwind config
3. ✅ Add new routes/pages
4. ✅ Integrate backend API
5. ✅ Deploy to production

---

## 📖 Additional Resources

### Official Documentation:
- **React**: https://react.dev/
- **TypeScript**: https://www.typescriptlang.org/docs/
- **Vite**: https://vitejs.dev/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Shadcn/ui**: https://ui.shadcn.com/

### Helpful Tools:
- **Tailwind Cheat Sheet**: https://nerdcave.com/tailwind-cheat-sheet
- **Color Picker (HSL)**: https://hslpicker.com/
- **React DevTools**: Chrome extension for debugging

---

## ✨ You're Ready!

You now have everything you need to:
- ✅ Navigate the development server
- ✅ Find any component you want to edit
- ✅ Make changes confidently
- ✅ Troubleshoot issues
- ✅ Understand how RovoDev helps you

**Start small, experiment often, and don't be afraid to break things - that's how you learn!**

---

*Guide created: January 7, 2026*
*Last updated: January 7, 2026*
*Portfolio Version: 1.0.0*
