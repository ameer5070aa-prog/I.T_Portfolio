import { Play, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  summary: string;
  covers: string[];
  skills: string[];
  importance: string;
}

const ProjectCard = ({ title, summary, covers, skills, importance }: ProjectCardProps) => {
  return (
    <div className="glass-card rounded-xl overflow-hidden group">
      {/* Video embed area - 16:9 aspect ratio */}
      <div className="relative w-full aspect-video bg-gradient-to-br from-primary/5 to-secondary/5 border-b border-border/50 flex-shrink-0">
        {/* Placeholder for YouTube embed */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-muted/50 flex items-center justify-center border border-border group-hover:border-primary/30 transition-colors">
              <Play className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <span className="text-xs font-mono text-muted-foreground">
              YouTube video placeholder
            </span>
          </div>
        </div>
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content - static, compact */}
      <div className="p-4 space-y-3 flex-grow flex flex-col">
        {/* Title and summary */}
        <div>
          <h3 className="text-base font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-3">
            {summary}
          </p>
        </div>

        {/* What this covers - show top 3 items */}
        <div className="flex-grow">
          <h4 className="text-xs font-mono text-primary mb-1.5 uppercase tracking-wider">
            Covers
          </h4>
          <ul className="space-y-1">
            {covers.slice(0, 3).map((item, index) => (
              <li key={index} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                <span className="text-primary mt-0.5">•</span>
                <span className="line-clamp-2">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Skills demonstrated - show all on 2 lines max */}
        <div>
          <h4 className="text-xs font-mono text-secondary mb-1.5 uppercase tracking-wider">
            Skills
          </h4>
          <div className="flex flex-wrap gap-1.5 max-h-[3rem] overflow-hidden">
            {skills.map((skill, index) => (
              <span 
                key={index}
                className="px-2 py-0.5 text-xs font-mono text-muted-foreground bg-muted/30 rounded border border-border/50 whitespace-nowrap"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
