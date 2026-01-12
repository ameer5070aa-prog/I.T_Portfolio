import { Award, BookOpen, ExternalLink } from 'lucide-react';
import TerminalText from './TerminalText';
import { useTina, tinaField } from 'tinacms/dist/react';
import certificationsData from '../content/certifications.json';

const CertificationsSection = () => {
  // Load certifications with TinaCMS support
  const { data } = useTina({
    query: `query Certifications($relativePath: String!) {
      certifications(relativePath: $relativePath) {
        certifications {
          name
          status
          description
          details
          url
          studyFocus
        }
      }
    }`,
    variables: { relativePath: 'certifications.json' },
    data: { certifications: certificationsData },
  });

  const certs = data?.certifications?.certifications || [];
  return (
    <section id="certifications" className="py-24 relative">
      <div className="section-container">
        {/* Section header */}
        <div className="mb-12">
          <TerminalText command="certutil -status" output="1 credential in progress..." />
          <h2 className="text-3xl sm:text-4xl font-semibold mt-2 mb-4">
            Certifications & Learning
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Active pursuit of industry-recognized credentials, 
            reinforced through practical application.
          </p>
        </div>

        {/* Certification cards */}
        <div className="max-w-2xl space-y-6" data-tina-field={tinaField(data.certifications, 'certifications')}>
          {certs.map((cert: any, index: number) => (
            <div key={index} className="glass-card rounded-xl p-8 relative overflow-hidden group" data-tina-field={tinaField(cert, 'name')}>
              {/* Accent gradient */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-glow opacity-50 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex items-start gap-6">
                {/* Icon */}
                <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold" data-tina-field={tinaField(cert, 'name')}>
                      {cert.name}
                    </h3>
                    <span className="px-2 py-0.5 text-xs font-mono text-primary bg-primary/10 rounded-full border border-primary/20" data-tina-field={tinaField(cert, 'status')}>
                      {cert.status}
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed" data-tina-field={tinaField(cert, 'description')}>
                    {cert.description}
                  </p>
                  
                  <div className="flex items-center gap-6 text-sm">
                    {cert.details && (
                      <div className="flex items-center gap-2 text-muted-foreground" data-tina-field={tinaField(cert, 'details')}>
                        <BookOpen className="w-4 h-4 text-secondary" />
                        <span>{cert.details}</span>
                      </div>
                    )}
                    {cert.url && (
                      <a 
                        href={cert.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-primary hover:underline"
                        data-tina-field={tinaField(cert, 'url')}
                      >
                        <span>Learn more</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Study focus areas */}
              {cert.studyFocus && cert.studyFocus.length > 0 && (
                <div className="mt-8 pt-6 border-t border-border/50">
                  <h4 className="text-xs font-mono text-muted-foreground mb-3 uppercase tracking-wider">
                    Current Study Focus
                  </h4>
                  <div className="flex flex-wrap gap-2" data-tina-field={tinaField(cert, 'studyFocus')}>
                    {cert.studyFocus.map((topic: string, topicIndex: number) => (
                      <span 
                        key={topicIndex}
                        className="px-3 py-1.5 text-xs text-muted-foreground bg-muted/30 rounded-md border border-border/50"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
