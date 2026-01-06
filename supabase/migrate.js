// Supabase Data Migration Script
// Migrates data from local JSON files to Supabase

import { createClient } from '@supabase/supabase-js';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get credentials from environment or prompt
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://YOUR_PROJECT.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || 'YOUR_ANON_KEY';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function readJSONFile(filename) {
  const filePath = path.join(__dirname, '..', 'backend', 'data', filename);
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
}

async function migrateProjects() {
  console.log('\n📊 Migrating projects...');
  const projects = await readJSONFile('projects.json');
  
  // Transform data to match Supabase schema
  const transformed = projects.map(p => ({
    title: p.title,
    description: p.description,
    summary: p.summary,
    color: p.color,
    image_url: p.image_url,
    video_url: p.video_url,
    github_url: p.github_url,
    live_url: p.live_url,
    technologies: p.technologies || [],
    features: p.features || [],
    category: p.category,
    featured: p.featured,
    order_num: p.order,
    status: p.status,
    created_at: p.created_at,
    updated_at: p.updated_at
  }));

  const { data, error } = await supabase
    .from('projects')
    .insert(transformed);

  if (error) {
    console.error('❌ Projects migration failed:', error.message);
    return false;
  }
  
  console.log(`✅ Migrated ${projects.length} projects`);
  return true;
}

async function migrateSkills() {
  console.log('\n🛠️ Migrating skills...');
  const skills = await readJSONFile('skills.json');
  
  const transformed = skills.map(s => ({
    name: s.name,
    category: s.category,
    proficiency: s.proficiency,
    icon: s.icon,
    description: s.description,
    order_num: s.order,
    created_at: s.created_at,
    updated_at: s.updated_at
  }));

  const { data, error } = await supabase
    .from('skills')
    .insert(transformed);

  if (error) {
    console.error('❌ Skills migration failed:', error.message);
    return false;
  }
  
  console.log(`✅ Migrated ${skills.length} skills`);
  return true;
}

async function migrateCertifications() {
  console.log('\n🎓 Migrating certifications...');
  const certs = await readJSONFile('certifications.json');
  
  const transformed = certs.map(c => ({
    title: c.title,
    issuer: c.issuer,
    status: c.status,
    issue_date: c.issue_date,
    expiry_date: c.expiry_date,
    credential_id: c.credential_id,
    credential_url: c.credential_url,
    image_url: c.image_url,
    description: c.description,
    study_topics: c.study_topics || [],
    order_num: c.order,
    created_at: c.created_at,
    updated_at: c.updated_at
  }));

  const { data, error } = await supabase
    .from('certifications')
    .insert(transformed);

  if (error) {
    console.error('❌ Certifications migration failed:', error.message);
    return false;
  }
  
  console.log(`✅ Migrated ${certs.length} certifications`);
  return true;
}

async function migrateLabs() {
  console.log('\n🧪 Migrating labs...');
  const labs = await readJSONFile('labs.json');
  
  const transformed = labs.map(l => ({
    title: l.title,
    description: l.description,
    technologies: l.technologies || [],
    date_completed: l.date_completed,
    image_url: l.image_url,
    repository_url: l.repository_url,
    notes: l.notes,
    order_num: l.order,
    created_at: l.created_at,
    updated_at: l.updated_at
  }));

  const { data, error} = await supabase
    .from('labs')
    .insert(transformed);

  if (error) {
    console.error('❌ Labs migration failed:', error.message);
    return false;
  }
  
  console.log(`✅ Migrated ${labs.length} labs`);
  return true;
}

async function migratePersonalInfo() {
  console.log('\n👤 Migrating personal info...');
  const personal = await readJSONFile('personal.json');
  
  const transformed = {
    full_name: personal.full_name,
    title: personal.title,
    bio: personal.bio,
    tagline: personal.tagline,
    email: personal.email,
    phone: personal.phone,
    location: personal.location,
    avatar_url: personal.avatar_url,
    resume_url: personal.resume_url,
    social_links: personal.social_links || {},
    updated_at: personal.updated_at
  };

  const { data, error } = await supabase
    .from('personal_info')
    .insert([transformed]);

  if (error) {
    console.error('❌ Personal info migration failed:', error.message);
    return false;
  }
  
  console.log(`✅ Migrated personal info`);
  return true;
}

async function main() {
  console.log('========================================');
  console.log('  📦 SUPABASE DATA MIGRATION');
  console.log('========================================');

  if (SUPABASE_URL.includes('YOUR_PROJECT')) {
    console.error('\n❌ Please set SUPABASE_URL and SUPABASE_ANON_KEY environment variables');
    console.log('\nExample:');
    console.log('$env:SUPABASE_URL="https://xxxxx.supabase.co"');
    console.log('$env:SUPABASE_ANON_KEY="eyJhbGc..."');
    console.log('node migrate.js');
    process.exit(1);
  }

  console.log(`\n🔗 Connecting to: ${SUPABASE_URL}`);

  try {
    const results = await Promise.all([
      migrateProjects(),
      migrateSkills(),
      migrateCertifications(),
      migrateLabs(),
      migratePersonalInfo()
    ]);

    const allSuccess = results.every(r => r === true);

    console.log('\n========================================');
    if (allSuccess) {
      console.log('  ✅ MIGRATION COMPLETE!');
    } else {
      console.log('  ⚠️ MIGRATION COMPLETED WITH ERRORS');
    }
    console.log('========================================\n');

  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  }
}

main();
