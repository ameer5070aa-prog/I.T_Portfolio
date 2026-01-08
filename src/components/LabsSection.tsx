import LabCard from './LabCard';
import TerminalText from './TerminalText';

const labCategories = [
  {
    category: 'Ticketing & Service Desk Labs',
    labs: [
      {
        title: 'Ticket Triage Exercise',
        description: 'Practice categorizing and prioritizing incoming tickets based on urgency, impact, and user context.',
        tools: ['Ticket Categories', 'Priority Matrix', 'SLA Rules'],
      },
      {
        title: 'Knowledge Base Article Creation',
        description: 'Transform resolved tickets into searchable KB articles with proper formatting and keywords.',
        tools: ['Documentation', 'KB Systems', 'Search Optimization'],
      },
    ],
  },
  {
    category: 'Operating System Labs',
    labs: [
      {
        title: 'Windows Safe Mode Recovery',
        description: 'Boot into various safe mode options and perform system recovery operations.',
        tools: ['Windows Recovery', 'msconfig', 'System Restore'],
      },
      {
        title: 'User Profile Migration',
        description: 'Migrate user data and settings between profiles or machines using built-in tools.',
        tools: ['USMT', 'Profile Copy', 'Data Backup'],
      },
    ],
  },
  {
    category: 'Networking Labs',
    labs: [
      {
        title: 'IP Configuration Diagnostics',
        description: 'Use command-line tools to diagnose and fix common IP configuration issues.',
        tools: ['ipconfig', 'netstat', 'arp'],
      },
      {
        title: 'DNS Troubleshooting',
        description: 'Identify and resolve DNS resolution failures using systematic testing.',
        tools: ['nslookup', 'DNS Cache', 'Hosts File'],
      },
    ],
  },
  {
    category: 'Automation & Scripting Labs',
    labs: [
      {
        title: 'Batch File Basics',
        description: 'Create simple batch scripts for repetitive help desk tasks like clearing caches or mapping drives.',
        tools: ['CMD', 'Batch Scripts', 'Task Automation'],
      },
      {
        title: 'PowerShell One-Liners',
        description: 'Learn essential PowerShell commands for AD queries and system information gathering.',
        tools: ['PowerShell', 'Get-ADUser', 'Get-WmiObject'],
      },
    ],
  },
  {
    category: 'Security & Permissions Labs',
    labs: [
      {
        title: 'NTFS Permissions Audit',
        description: 'Review and document file/folder permissions to identify access issues.',
        tools: ['icacls', 'Security Tab', 'Effective Access'],
      },
      {
        title: 'Account Lockout Investigation',
        description: 'Trace the source of account lockouts using event logs and lockout tools.',
        tools: ['Event Viewer', 'LockoutStatus', 'Account Policies'],
      },
    ],
  },
];

const LabsSection = () => {
  return (
    <section id="labs" className="py-24 relative">
      <div className="section-container">
        {/* Section header */}
        <div className="mb-12">
          <TerminalText command="./run-labs.sh" output="Initializing lab environment..." />
          <h2 className="text-3xl sm:text-4xl font-semibold mt-2 mb-4">
            Labs & Exercises
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Smaller, focused exercises that build specific skills. Each lab targets 
            a practical scenario you'd encounter in daily IT support work.
          </p>
        </div>

        {/* Lab categories */}
        <div className="space-y-10">
          {labCategories.map((category, catIndex) => (
            <div key={catIndex}>
              <h3 className="text-sm font-mono text-secondary mb-4 uppercase tracking-wider">
                {category.category}
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {category.labs.map((lab, labIndex) => (
                  <LabCard key={labIndex} {...lab} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LabsSection;
