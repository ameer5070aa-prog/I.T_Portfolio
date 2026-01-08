import TerminalText from './TerminalText';

const skillCategories = [
  {
    title: 'IT Support & Troubleshooting',
    skills: [
      'Structured problem diagnosis and isolation',
      'Root cause analysis using repeatable steps',
      'Remote troubleshooting and guided user support',
      'Hardware and software issue resolution',
      'System setup, repair, and reconfiguration',
    ],
  },
  {
    title: 'Operating Systems & Hardware',
    skills: [
      'Windows 10/11 configuration and troubleshooting',
      'macOS fundamentals and user support',
      'PC hardware assembly and component-level identification',
      'Driver, peripheral, and device setup',
      'Virtual machines for testing and experimentation',
    ],
  },
  {
    title: 'Networking Fundamentals',
    skills: [
      'Core networking concepts (TCP/IP, OSI model)',
      'DNS and DHCP behavior and troubleshooting',
      'Network diagnostic tools and commands',
      'VPN usage, configuration awareness, and support',
      'Basic switch and router concepts',
    ],
  },
  {
    title: 'Tools & Practices',
    skills: [
      'User and account management concepts (Active Directory)',
      'Ticketing systems and issue lifecycle tracking',
      'Remote support tools (RDP, TeamViewer)',
      'PowerShell fundamentals for basic automation',
      'Documentation, internal wikis, and knowledge bases',
    ],
  },
  {
    title: 'Communication & Process',
    skills: [
      'Clear, structured technical documentation',
      'Explaining technical issues to non-technical users',
      'Writing actionable ticket notes and resolution steps',
      'Understanding escalation paths and handoffs',
      'Calm, user-focused problem handling',
    ],
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/3 to-transparent" />
      
      <div className="section-container relative z-10">
        {/* Section header */}
        <div className="mb-12">
          <TerminalText command="cat skills.conf" output="Loading skill matrix..." />
          <h2 className="text-3xl sm:text-4xl font-semibold mt-2 mb-4">
            Technical Skills
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Core competencies aligned with entry-level IT support roles. 
            Each skill is reinforced through hands-on projects and labs.
          </p>
        </div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <div 
              key={index}
              className="glass-card rounded-xl p-6 hover:border-primary/30 transition-all"
            >
              <h3 className="text-sm font-semibold mb-4 text-foreground">
                {category.title}
              </h3>
              <ul className="space-y-2.5">
                {category.skills.map((skill, skillIndex) => (
                  <li 
                    key={skillIndex}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="text-primary mt-0.5">›</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;