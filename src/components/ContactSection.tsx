import { Mail, Linkedin, Github, ArrowUpRight } from 'lucide-react';
import TerminalText from './TerminalText';

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
      
      <div className="section-container relative z-10">
        {/* Section header */}
        <div className="mb-12 text-center max-w-md mx-auto">
          <TerminalText command="ping recruiter" output="Connection established!" />
          <h2 className="text-3xl sm:text-4xl font-semibold mt-2 mb-4">
            Let's Connect
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            I'm actively seeking IT support opportunities. 
            Reach out to discuss how I can contribute to your team.
          </p>
        </div>

        {/* Contact links */}
        <div className="max-w-lg mx-auto">
          <div className="grid gap-4">
            {/* Email */}
            <a 
              href="mailto:ameeromer202@gmail.com"
              className="glass-card rounded-xl p-5 flex items-center justify-between group hover:border-primary/30 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-sm group-hover:text-primary transition-colors">
                    Email
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    ameeromer202@gmail.com
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>

            {/* LinkedIn */}
            <a 
              href="https://www.linkedin.com/in/ameer-omer-992143386"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card rounded-xl p-5 flex items-center justify-between group hover:border-primary/30 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                  <Linkedin className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-medium text-sm group-hover:text-primary transition-colors">
                    LinkedIn
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Connect with me
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>

            {/* GitHub */}
            <a 
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card rounded-xl p-5 flex items-center justify-between group hover:border-primary/30 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-muted group-hover:bg-muted/80 transition-colors">
                  <Github className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <h3 className="font-medium text-sm group-hover:text-primary transition-colors">
                    GitHub
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    View my repositories
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
