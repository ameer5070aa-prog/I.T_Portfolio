import { 
  Monitor, 
  Wrench, 
  Network, 
  Shield, 
  MessageSquare,
  Server,
  HardDrive,
  Users,
  FileText,
  Headphones,
  Settings,
  Cpu
} from 'lucide-react';

const iconMap: { [key: string]: React.ElementType } = {
  monitor: Monitor,
  wrench: Wrench,
  network: Network,
  shield: Shield,
  message: MessageSquare,
  server: Server,
  harddrive: HardDrive,
  users: Users,
  file: FileText,
  headphones: Headphones,
  settings: Settings,
  cpu: Cpu,
};

interface SkillIconProps {
  icon: string;
  label: string;
}

const SkillIcon = ({ icon, label }: SkillIconProps) => {
  const IconComponent = iconMap[icon] || Settings;
  
  return (
    <div className="flex flex-col items-center gap-2 group">
      {/* SVG gradient definition */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="gradient-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" />
          </linearGradient>
        </defs>
      </svg>
      
      <div className="skill-icon">
        <IconComponent 
          className="w-full h-full" 
          style={{ 
            stroke: 'url(#gradient-stroke)',
            strokeWidth: 1.5,
            fill: 'none'
          }} 
        />
      </div>
      <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors text-center">
        {label}
      </span>
    </div>
  );
};

export default SkillIcon;
