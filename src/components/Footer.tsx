import { Terminal } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-8 border-t border-border/50">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-primary" />
            <span className="font-mono text-xs text-muted-foreground">
              <span className="text-primary">&lt;</span>
              Ameer.Omer
              <span className="text-primary">/&gt;</span>
            </span>
          </div>
          
          {/* Copyright */}
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} · Ameer Omer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
