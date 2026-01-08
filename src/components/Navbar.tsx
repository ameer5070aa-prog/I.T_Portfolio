import { useState, useEffect } from 'react';
import { Menu, X, Terminal } from 'lucide-react';
const navLinks = [{
  href: '#home',
  label: 'Home'
}, {
  href: '#about',
  label: 'About'
}, {
  href: '#projects',
  label: 'Projects'
}, {
  href: '#labs',
  label: 'Labs'
}, {
  href: '#skills',
  label: 'Skills'
}, {
  href: '#certifications',
  label: 'Certifications'
}, {
  href: '#contact',
  label: 'Contact'
}];
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-lg border-b border-border/50' : 'bg-transparent'}`}>
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#home" onClick={e => {
          e.preventDefault();
          handleNavClick('#home');
        }} className="flex items-center gap-2 group">
            <Terminal className="w-6 h-6 text-primary group-hover:text-secondary transition-colors" />
            <span className="font-mono text-sm font-medium text-foreground">
              <span className="text-primary">&lt;</span>
              Ameer.Omer
              <span className="text-primary">/&gt;</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex md:items-center md:justify-center">
            {navLinks.map(link => <a key={link.href} href={link.href} onClick={e => {
            e.preventDefault();
            handleNavClick(link.href);
          }} className="text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-primary/5 text-base ml-[10px] px-[20px] py-[10px] text-right">
                {link.label}
              </a>)}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-muted-foreground hover:text-primary transition-colors">
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && <div className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border">
          <div className="section-container py-4 space-y-1">
            {navLinks.map(link => <a key={link.href} href={link.href} onClick={e => {
          e.preventDefault();
          handleNavClick(link.href);
        }} className="block px-4 py-3 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors">
                {link.label}
              </a>)}
          </div>
        </div>}
    </nav>;
};
export default Navbar;