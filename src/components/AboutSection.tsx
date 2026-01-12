import { User, BookOpen, Wrench } from 'lucide-react';
import TerminalText from './TerminalText';
import { useTina, tinaField } from 'tinacms/dist/react';
import aboutData from '../content/about.json';

const AboutSection = () => {
  // useTina hook for visual editing
  const { data } = useTina({
    query: `query About($relativePath: String!) {
      about(relativePath: $relativePath) {
        title
        bio
        stats {
          label
          value
        }
      }
    }`,
    variables: { relativePath: 'about.json' },
    data: { about: aboutData },
  });

  const about = data?.about;

  return (
    <section id="about" className="py-24 relative">
      <div className="section-container">
        {/* Section header */}
        <div className="mb-12">
          <TerminalText command="whoami" output="Entry-Level IT Specialist" />
          <h2 className="text-3xl sm:text-4xl font-semibold mt-2" data-tina-field={tinaField(about, 'title')}>
            {about.title}
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6" data-tina-field={tinaField(about, 'bio')}>
            <div dangerouslySetInnerHTML={{ __html: about.bio.replace(/\n/g, '</p><p className="text-muted-foreground leading-relaxed">') }} />
          </div>

          {/* Quick facts */}
          <div className="space-y-4" data-tina-field={tinaField(about, 'stats')}>
            {about.stats?.map((stat: any, index: number) => (
              <div key={index} className="glass-card rounded-lg p-5" data-tina-field={tinaField(about.stats, index.toString())}>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-md bg-primary/10">
                    {index === 0 && <User className="w-5 h-5 text-primary" />}
                    {index === 1 && <BookOpen className="w-5 h-5 text-secondary" />}
                    {index === 2 && <Wrench className="w-5 h-5 text-terminal-foreground" />}
                  </div>
                  <div>
                    <h3 className="font-medium text-sm mb-1" data-tina-field={tinaField(stat, 'label')}>
                      {stat.label}
                    </h3>
                    <p className="text-xs text-muted-foreground" data-tina-field={tinaField(stat, 'value')}>
                      {stat.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
