import express from 'express';
import cors from 'cors';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images and PDFs allowed.'));
    }
  }
});

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:8080',
    'http://localhost:3000'
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Utility function to read JSON file
async function readJSONFile(filename) {
  try {
    const filePath = path.join(__dirname, 'data', filename);
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    throw error;
  }
}

// Utility function to write JSON file
async function writeJSONFile(filename, data) {
  try {
    const filePath = path.join(__dirname, 'data', filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    throw error;
  }
}

// ==================== PROJECTS ROUTES ====================

// GET all projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await readJSONFile('projects.json');
    const { status } = req.query;
    
    let filtered = projects;
    if (status) {
      filtered = projects.filter(p => p.status === status);
    }
    
    // Sort by order
    filtered.sort((a, b) => a.order - b.order);
    
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// GET single project
app.get('/api/projects/:id', async (req, res) => {
  try {
    const projects = await readJSONFile('projects.json');
    const project = projects.find(p => p.id === req.params.id);
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// POST create project
app.post('/api/projects', async (req, res) => {
  try {
    const projects = await readJSONFile('projects.json');
    
    const newProject = {
      id: `project-${Date.now()}`,
      ...req.body,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    // Set order if not provided
    if (!newProject.order) {
      newProject.order = projects.length + 1;
    }
    
    projects.push(newProject);
    await writeJSONFile('projects.json', projects);
    
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// PUT update project
app.put('/api/projects/:id', async (req, res) => {
  try {
    const projects = await readJSONFile('projects.json');
    const index = projects.findIndex(p => p.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    projects[index] = {
      ...projects[index],
      ...req.body,
      id: req.params.id, // Preserve ID
      updated_at: new Date().toISOString()
    };
    
    await writeJSONFile('projects.json', projects);
    res.json(projects[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// DELETE project
app.delete('/api/projects/:id', async (req, res) => {
  try {
    const projects = await readJSONFile('projects.json');
    const filtered = projects.filter(p => p.id !== req.params.id);
    
    if (filtered.length === projects.length) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    await writeJSONFile('projects.json', filtered);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// PATCH reorder projects
app.patch('/api/projects/reorder', async (req, res) => {
  try {
    const projects = await readJSONFile('projects.json');
    const { projectIds } = req.body; // Array of IDs in new order
    
    // Update order field for each project
    projectIds.forEach((id, index) => {
      const project = projects.find(p => p.id === id);
      if (project) {
        project.order = index + 1;
        project.updated_at = new Date().toISOString();
      }
    });
    
    await writeJSONFile('projects.json', projects);
    res.json({ message: 'Projects reordered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reorder projects' });
  }
});

// ==================== SKILLS ROUTES ====================

// GET all skills
app.get('/api/skills', async (req, res) => {
  try {
    const skills = await readJSONFile('skills.json');
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
});

// GET skills by category
app.get('/api/skills/by-category', async (req, res) => {
  try {
    const skills = await readJSONFile('skills.json');
    
    // Group by category
    const grouped = skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {});
    
    // Sort skills within each category by order
    Object.keys(grouped).forEach(category => {
      grouped[category].sort((a, b) => a.order - b.order);
    });
    
    res.json(grouped);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch skills by category' });
  }
});

// POST create skill
app.post('/api/skills', async (req, res) => {
  try {
    const skills = await readJSONFile('skills.json');
    
    const newSkill = {
      id: `skill-${Date.now()}`,
      ...req.body,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    skills.push(newSkill);
    await writeJSONFile('skills.json', skills);
    
    res.status(201).json(newSkill);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create skill' });
  }
});

// PUT update skill
app.put('/api/skills/:id', async (req, res) => {
  try {
    const skills = await readJSONFile('skills.json');
    const index = skills.findIndex(s => s.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    
    skills[index] = {
      ...skills[index],
      ...req.body,
      id: req.params.id,
      updated_at: new Date().toISOString()
    };
    
    await writeJSONFile('skills.json', skills);
    res.json(skills[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update skill' });
  }
});

// DELETE skill
app.delete('/api/skills/:id', async (req, res) => {
  try {
    const skills = await readJSONFile('skills.json');
    const filtered = skills.filter(s => s.id !== req.params.id);
    
    if (filtered.length === skills.length) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    
    await writeJSONFile('skills.json', filtered);
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete skill' });
  }
});

// ==================== CERTIFICATIONS ROUTES ====================

// GET all certifications
app.get('/api/certifications', async (req, res) => {
  try {
    const certifications = await readJSONFile('certifications.json');
    certifications.sort((a, b) => a.order - b.order);
    res.json(certifications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch certifications' });
  }
});

// GET single certification
app.get('/api/certifications/:id', async (req, res) => {
  try {
    const certifications = await readJSONFile('certifications.json');
    const cert = certifications.find(c => c.id === req.params.id);
    
    if (!cert) {
      return res.status(404).json({ error: 'Certification not found' });
    }
    
    res.json(cert);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch certification' });
  }
});

// POST create certification
app.post('/api/certifications', async (req, res) => {
  try {
    const certifications = await readJSONFile('certifications.json');
    
    const newCert = {
      id: `cert-${Date.now()}`,
      ...req.body,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    if (!newCert.order) {
      newCert.order = certifications.length + 1;
    }
    
    certifications.push(newCert);
    await writeJSONFile('certifications.json', certifications);
    
    res.status(201).json(newCert);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create certification' });
  }
});

// PUT update certification
app.put('/api/certifications/:id', async (req, res) => {
  try {
    const certifications = await readJSONFile('certifications.json');
    const index = certifications.findIndex(c => c.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Certification not found' });
    }
    
    certifications[index] = {
      ...certifications[index],
      ...req.body,
      id: req.params.id,
      updated_at: new Date().toISOString()
    };
    
    await writeJSONFile('certifications.json', certifications);
    res.json(certifications[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update certification' });
  }
});

// DELETE certification
app.delete('/api/certifications/:id', async (req, res) => {
  try {
    const certifications = await readJSONFile('certifications.json');
    const filtered = certifications.filter(c => c.id !== req.params.id);
    
    if (filtered.length === certifications.length) {
      return res.status(404).json({ error: 'Certification not found' });
    }
    
    await writeJSONFile('certifications.json', filtered);
    res.json({ message: 'Certification deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete certification' });
  }
});

// ==================== LABS ROUTES ====================

// GET all labs
app.get('/api/labs', async (req, res) => {
  try {
    const labs = await readJSONFile('labs.json');
    labs.sort((a, b) => a.order - b.order);
    res.json(labs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch labs' });
  }
});

// POST create lab
app.post('/api/labs', async (req, res) => {
  try {
    const labs = await readJSONFile('labs.json');
    
    const newLab = {
      id: `lab-${Date.now()}`,
      ...req.body,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    if (!newLab.order) {
      newLab.order = labs.length + 1;
    }
    
    labs.push(newLab);
    await writeJSONFile('labs.json', labs);
    
    res.status(201).json(newLab);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create lab' });
  }
});

// PUT update lab
app.put('/api/labs/:id', async (req, res) => {
  try {
    const labs = await readJSONFile('labs.json');
    const index = labs.findIndex(l => l.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Lab not found' });
    }
    
    labs[index] = {
      ...labs[index],
      ...req.body,
      id: req.params.id,
      updated_at: new Date().toISOString()
    };
    
    await writeJSONFile('labs.json', labs);
    res.json(labs[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update lab' });
  }
});

// DELETE lab
app.delete('/api/labs/:id', async (req, res) => {
  try {
    const labs = await readJSONFile('labs.json');
    const filtered = labs.filter(l => l.id !== req.params.id);
    
    if (filtered.length === labs.length) {
      return res.status(404).json({ error: 'Lab not found' });
    }
    
    await writeJSONFile('labs.json', filtered);
    res.json({ message: 'Lab deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete lab' });
  }
});

// ==================== CONTACT ROUTES ====================

// GET all contact submissions
app.get('/api/contact', async (req, res) => {
  try {
    const contacts = await readJSONFile('contact.json');
    // Sort by created_at descending (newest first)
    contacts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contact submissions' });
  }
});

// POST create contact submission
app.post('/api/contact', async (req, res) => {
  try {
    const contacts = await readJSONFile('contact.json');
    
    const newContact = {
      id: `contact-${Date.now()}`,
      ...req.body,
      status: 'new',
      created_at: new Date().toISOString(),
      replied_at: null
    };
    
    contacts.push(newContact);
    await writeJSONFile('contact.json', contacts);
    
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create contact submission' });
  }
});

// PATCH update contact status
app.patch('/api/contact/:id/status', async (req, res) => {
  try {
    const contacts = await readJSONFile('contact.json');
    const index = contacts.findIndex(c => c.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Contact submission not found' });
    }
    
    contacts[index].status = req.body.status;
    if (req.body.status === 'replied') {
      contacts[index].replied_at = new Date().toISOString();
    }
    
    await writeJSONFile('contact.json', contacts);
    res.json(contacts[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update contact status' });
  }
});

// DELETE contact submission
app.delete('/api/contact/:id', async (req, res) => {
  try {
    const contacts = await readJSONFile('contact.json');
    const filtered = contacts.filter(c => c.id !== req.params.id);
    
    if (filtered.length === contacts.length) {
      return res.status(404).json({ error: 'Contact submission not found' });
    }
    
    await writeJSONFile('contact.json', filtered);
    res.json({ message: 'Contact submission deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete contact submission' });
  }
});

// ==================== PERSONAL INFO ROUTES ====================

// GET personal info
app.get('/api/personal', async (req, res) => {
  try {
    const personal = await readJSONFile('personal.json');
    res.json(personal);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch personal info' });
  }
});

// PUT update personal info
app.put('/api/personal', async (req, res) => {
  try {
    const personal = {
      ...req.body,
      updated_at: new Date().toISOString()
    };
    
    await writeJSONFile('personal.json', personal);
    res.json(personal);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update personal info' });
  }
});

// ==================== FILE UPLOAD ROUTES ====================

// Upload single file
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    
    // If it's an image, optimize it
    if (req.file.mimetype.startsWith('image/')) {
      try {
        const inputPath = path.join(__dirname, 'uploads', req.file.filename);
        const optimizedFilename = `opt-${req.file.filename}`;
        const outputPath = path.join(__dirname, 'uploads', optimizedFilename);
        
        // Optimize and resize image
        await sharp(inputPath)
          .resize(1920, 1920, { // Max 1920px, maintain aspect ratio
            fit: 'inside',
            withoutEnlargement: true
          })
          .webp({ quality: 85 })
          .toFile(outputPath.replace(path.extname(outputPath), '.webp'));
        
        // Return optimized version
        const optimizedUrl = `/uploads/opt-${req.file.filename.replace(path.extname(req.file.filename), '.webp')}`;
        
        res.json({
          url: optimizedUrl,
          originalUrl: fileUrl,
          filename: req.file.filename,
          size: req.file.size,
          mimetype: req.file.mimetype,
          optimized: true
        });
      } catch (optimizeError) {
        // If optimization fails, return original
        console.error('Image optimization failed:', optimizeError);
        res.json({
          url: fileUrl,
          filename: req.file.filename,
          size: req.file.size,
          mimetype: req.file.mimetype,
          optimized: false
        });
      }
    } else {
      // For PDFs and other files
      res.json({
        url: fileUrl,
        filename: req.file.filename,
        size: req.file.size,
        mimetype: req.file.mimetype
      });
    }
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

// Delete file
app.delete('/api/upload/:filename', async (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'uploads', filename);
    
    // Check if file exists
    try {
      await fs.access(filePath);
      await fs.unlink(filePath);
      res.json({ message: 'File deleted successfully' });
    } catch (error) {
      res.status(404).json({ error: 'File not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete file' });
  }
});

// ==================== HEALTH CHECK ====================

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'IT Portfolio Backend API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 IT Portfolio Backend API running on http://localhost:${PORT}`);
  console.log(`📊 API Base URL: http://localhost:${PORT}/api`);
  console.log(`✅ Health Check: http://localhost:${PORT}/api/health\n`);
});
