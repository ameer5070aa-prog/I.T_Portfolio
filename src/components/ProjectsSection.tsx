import ProjectCard from './ProjectCard';
import TerminalText from './TerminalText';

// Hardcoded projects for now - TinaCMS editing will be added later
const projects = [
  {
    title: 'Enterprise IT Infrastructure Simulation (Flagship Homelab)',
    summary: 'A comprehensive homelab environment simulating a small-to-midsize organization with integrated identity, networking, and automation.',
    covers: [
      'Active Directory domain with structured OUs and user lifecycle workflows',
      'Segmented network design with firewall rules',
      'Automation for onboarding and administrative tasks',
      'Monitoring dashboards and operational documentation',
    ],
    skills: ['Systems Administration', 'Networking', 'Automation', 'Monitoring'],
  },
  {
    title: 'Help Desk Ticketing System Simulation',
    summary: 'A modeled support ticketing system focused on how issues are reported, prioritized, escalated, and resolved.',
    covers: [
      'Ticket creation, categorization, and prioritization',
      'Escalation tiers and routing logic',
      'SLA tracking and resolution timing',
      'Knowledge base articles from resolved tickets',
    ],
    skills: ['Ticketing Systems', 'ITIL Fundamentals', 'SLA Management'],
  },
  {
    title: 'Active Directory User Management Lab',
    summary: 'Hands-on AD administration covering daily identity and access tasks in enterprise environments.',
    covers: [
      'User and group creation and management',
      'Password resets and account unlocks',
      'OU structure and Group Policy basics',
      'Bulk operations using PowerShell',
    ],
    skills: ['Active Directory', 'Group Policy', 'PowerShell'],
  },
  {
    title: 'Windows Workstation Troubleshooting Lab',
    summary: 'Structured diagnosis of common Windows 10/11 issues with emphasis on methodical problem-solving.',
    covers: [
      'Blue screen analysis and crash dump review',
      'Performance tuning and startup optimization',
      'Driver conflicts and hardware diagnostics',
      'Event Viewer and registry troubleshooting',
    ],
    skills: ['Windows 10/11', 'Event Viewer', 'System Tools'],
  },
  {
    title: 'ClarityPC.AI – Systems Metrics Dashboard',
    summary: 'An internal dashboard for visualizing system metrics and operational data to support decision-making.',
    covers: [
      'System metrics collection and visualization',
      'Backend to frontend data flow',
      'Dashboard design focused on signal over noise',
      'Monitoring tied to operational awareness',
    ],
    skills: ['System Monitoring', 'Dashboards', 'Data Flow'],
  },
  {
    title: 'Majlis AI – Multi-Agent System',
    summary: 'Multi-agent AI system with coordinated workflows, focusing on orchestration and reliability.',
    covers: [
      'Multi-agent role design and coordination',
      'Session handling and state persistence',
      'API integrations and message flow debugging',
      'Logging, verification, and reliability tuning',
    ],
    skills: ['Systems Design', 'Automation', 'API Integration', 'Debugging'],
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
      
      <div className="section-container relative z-10">
        {/* Section header */}
        <div className="mb-12">
          <TerminalText command="ls -la ~/projects" output="6 directories, 0 files" />
          <h2 className="text-3xl sm:text-4xl font-semibold mt-2 mb-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            These projects are built around real IT workflows, with an emphasis on troubleshooting, automation, networking, and hands-on iteration. Each one started with a problem
            and built with a hands-on tinkering!
          </p>
        </div>

        {/* Project grid - 3 columns on large screens */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;