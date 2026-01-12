import { ArrowDown, ChevronRight } from 'lucide-react';
import ParticleBackground from './ParticleBackground';
import { useState, useEffect } from 'react';
import { useTina, tinaField } from 'tinacms/dist/react';
import client from '../../tina/__generated__/client';

const HeroSection = () => {
  const [heroQuery, setHeroQuery] = useState<any>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const heroResponse = await client.queries.hero({
          relativePath: 'hero.json',
        });
        setHeroQuery(heroResponse);
      } catch (error) {
        console.error('Error fetching hero data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  const { data } = useTina({
    query: heroQuery?.query || '',
    variables: heroQuery?.variables || {},
    data: heroQuery?.data || {
      hero: {
        statusBadge: "Actively Building IT Systems & Operations",
        headline: "Hey, I'm Ameer, an IT professional focused on support and systems.",
        description: "I build and document deep, hands-on IT projects across support, networking, automation, and infrastructure—exploring everything from Tier-1 help desk operations to Docker-based labs, system administration, and AI-driven tooling.",
        skills: ['Windows', 'Active Directory', 'Ticketing Systems', 'Remote Support', 'Networking']
      }
    },
  });

  if (isLoading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ParticleBackground />
        <div className="relative z-10 text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </section>
    );
  }

  const hero = data?.hero;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <ParticleBackground />
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-20">
        {/* Status badge - centered above entire content */}
        <div className="flex justify-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card border border-primary/30">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-mono text-primary" data-tina-field={tinaField(hero, 'statusBadge')}>
              {hero.statusBadge}
            </span>
          </div>
        </div>

        {/* Main content - split layout with better centering */}
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center">
          {/* Left side - Text content */}
          <div className="space-y-8">
            {/* Main headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight" data-tina-field={tinaField(hero, 'headline')}>
              Hey, I'm{' '}
              <span className="gradient-text">Ameer</span>, an{' '}
              <span className="gradient-text">IT professional</span>{' '}
              focused on{' '}
              <span className="gradient-underline">support</span> and{' '}
              <span className="gradient-underline">systems</span>.
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl" data-tina-field={tinaField(hero, 'description')}>
              {hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="group inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                <span>View Projects</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="px-6 py-3 glass-card border border-border rounded-lg font-medium hover:border-primary/50 transition-colors"
              >
                Get in Touch
              </a>
            </div>

            {/* Skills tags with smooth animations */}
            <div className="flex flex-wrap gap-3 pt-4" data-tina-field={tinaField(hero, 'skills')}>
              {hero.skills?.map((skill: string, index: number) => (
                <span
                  key={skill}
                  data-tina-field={tinaField(hero.skills, index.toString())}
                  className="px-3 py-1.5 text-sm font-mono text-muted-foreground bg-muted/30 rounded-md border border-border/50 hover:border-primary/50 hover:text-primary hover:shadow-md hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Right side - Profile picture with enhanced pulsing glow */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-fit">
              {/* Subtle pulsing glow effect */}
              <div 
                className="absolute -inset-5 rounded-3xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(45, 212, 191, 0.3), rgba(34, 197, 94, 0.3))',
                  filter: 'blur(40px)',
                  animation: 'profileGlow 3s ease-in-out infinite',
                }}
              ></div>
              
              {/* Profile image with gradient border */}
              <div className="relative z-10">
                <div className="relative rounded-3xl p-1 bg-gradient-to-br from-primary via-secondary to-primary animate-gradient">
                  <img
                    src="/images/ameer-headshot.jpg"
                    alt="Ameer Omer - IT Professional"
                    className="w-80 h-96 lg:w-80 lg:h-96 md:w-70 md:h-84 sm:w-60 sm:h-72 object-cover rounded-3xl shadow-2xl transition-all duration-500 hover:scale-[1.02]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};

export default HeroSection;
