# IT Portfolio Backend API

Local development server for IT Portfolio project.

## Quick Start

```bash
# Install dependencies
npm install

# Start server
npm start

# Or with auto-reload (Node 18+)
npm run dev
```

Server runs on: `http://localhost:3001`

## API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `PATCH /api/projects/reorder` - Reorder projects

### Skills
- `GET /api/skills` - Get all skills
- `GET /api/skills/by-category` - Get skills grouped by category
- `POST /api/skills` - Create skill
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill

### Certifications
- `GET /api/certifications` - Get all certifications
- `GET /api/certifications/:id` - Get single certification
- `POST /api/certifications` - Create certification
- `PUT /api/certifications/:id` - Update certification
- `DELETE /api/certifications/:id` - Delete certification

### Labs
- `GET /api/labs` - Get all labs
- `POST /api/labs` - Create lab
- `PUT /api/labs/:id` - Update lab
- `DELETE /api/labs/:id` - Delete lab

### Contact
- `GET /api/contact` - Get all contact submissions
- `POST /api/contact` - Submit contact form
- `PATCH /api/contact/:id/status` - Update submission status
- `DELETE /api/contact/:id` - Delete submission

### Personal Info
- `GET /api/personal` - Get personal info
- `PUT /api/personal` - Update personal info

### Health
- `GET /api/health` - Server health check

## Data Storage

All data stored in JSON files under `/data` directory.

## CORS

Configured for:
- http://localhost:5173 (Portfolio)
- http://localhost:5174 (Admin Dashboard)
- http://localhost:8080 (Alt port)
- http://localhost:3000 (Alt port)
