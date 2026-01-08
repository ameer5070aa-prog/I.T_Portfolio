import { Terminal } from 'lucide-react';

interface LabCardProps {
  title: string;
  description: string;
  tools: string[];
}

const LabCard = ({ title, description, tools }: LabCardProps) => {
  return (
    <div className="glass-card rounded-lg p-5 group hover:border-primary/30 transition-all">
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors">
          <Terminal className="w-4 h-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm mb-1.5 group-hover:text-primary transition-colors">
            {title}
          </h4>
          <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
            {description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {tools.map((tool, index) => (
              <span 
                key={index}
                className="px-2 py-0.5 text-[10px] font-mono text-terminal-foreground bg-terminal/10 rounded"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabCard;
