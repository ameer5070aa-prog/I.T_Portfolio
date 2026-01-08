import { User, BookOpen, Wrench } from 'lucide-react';
import TerminalText from './TerminalText';

const AboutSection = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="section-container">
        {/* Section header */}
        <div className="mb-12">
          <TerminalText command="whoami" output="Entry-Level IT Specialist" />
          <h2 className="text-3xl sm:text-4xl font-semibold mt-2">
            Building a Foundation in IT Support
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              I build and document hands-on IT systems with a focus on operations, automation, and 
              real-world support workflows. My work spans help desk processes, system 
              troubleshooting, networking labs, containerized environments, and automation projects 
              designed to reduce friction and improve reliability.
            </p>
            <p className="text-muted-foreground leading-relaxed">
               I approach IT by building first and learning through implementation—setting up systems, 
               testing assumptions, breaking things, and refining them until they behave the way real 
               environments demand. That mindset has pushed me beyond theory and into practical 
               labs that reflect how IT actually functions day to day.
            </p>
            <p className="text-muted-foreground leading-relaxed">
             Alongside this work, I'm an Advanced Information Technology major studying through Northern Virginia 
             Community College and George Mason University. This portfolio is a living record of how I translate formal 
             education and certifications into working systems.
            </p>
          </div>

          {/* Quick facts */}
          <div className="space-y-4">
            <div className="glass-card rounded-lg p-5">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-md bg-primary/10">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-sm mb-1">Focus Areas</h3>
                  <p className="text-xs text-muted-foreground">
                     IT Operations, Systems & Operations,
                     and Support Automation Workflows
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-lg p-5">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-md bg-secondary/10">
                  <BookOpen className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-medium text-sm mb-1">Currently Building & Studying</h3>
                  <p className="text-xs text-muted-foreground">
                    CompTIA A+ (In Progress)   
                   </p>
                  <p className="text-xs text-muted-foreground">
                      Hands-On Systems & Networking Labs</p>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-lg p-5">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-md bg-terminal/10">
                  <Wrench className="w-5 h-5 text-terminal-foreground" />
                </div>
                <div>
                  <h3 className="font-medium text-sm mb-1">Approach</h3>
                  <p className="text-xs text-muted-foreground">
                    Project-Based Learning: Build, break, fix, then document.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
