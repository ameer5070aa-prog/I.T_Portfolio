import { useState, useEffect, useRef } from 'react';

interface TerminalTextProps {
  command: string;
  output: string;
  typingSpeed?: number;
  startDelay?: number;
}

const TerminalText = ({ 
  command, 
  output, 
  typingSpeed = 70, 
  startDelay = 300 
}: TerminalTextProps) => {
  const [displayedCommand, setDisplayedCommand] = useState('');
  const [displayedOutput, setDisplayedOutput] = useState('');
  const [phase, setPhase] = useState<'idle' | 'command' | 'output' | 'done'>('idle');
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer to trigger animation when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  // Start animation when visible
  useEffect(() => {
    if (isVisible && phase === 'idle') {
      const timer = setTimeout(() => setPhase('command'), startDelay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, phase, startDelay]);

  // Type command
  useEffect(() => {
    if (phase !== 'command') return;

    if (displayedCommand.length < command.length) {
      const timer = setTimeout(() => {
        setDisplayedCommand(command.slice(0, displayedCommand.length + 1));
      }, typingSpeed);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setPhase('output'), 200);
      return () => clearTimeout(timer);
    }
  }, [phase, displayedCommand, command, typingSpeed]);

  // Type output
  useEffect(() => {
    if (phase !== 'output') return;

    if (displayedOutput.length < output.length) {
      const timer = setTimeout(() => {
        setDisplayedOutput(output.slice(0, displayedOutput.length + 1));
      }, typingSpeed * 0.8);
      return () => clearTimeout(timer);
    } else {
      setPhase('done');
    }
  }, [phase, displayedOutput, output, typingSpeed]);

  return (
    <div 
      ref={containerRef}
      className="font-mono text-xs sm:text-sm bg-black/60 border border-terminal/30 rounded-md p-3 mb-4 backdrop-blur-sm"
    >
      {/* Command line */}
      <div className="flex items-center gap-2 text-terminal-foreground">
        <span className="text-primary">$</span>
        <span className="text-muted-foreground">{displayedCommand}</span>
        {phase === 'command' && (
          <span className="animate-pulse text-primary">▊</span>
        )}
      </div>
      
      {/* Output line */}
      {(phase === 'output' || phase === 'done') && (
        <div className="mt-1 flex items-center">
          <span className="text-foreground">{displayedOutput}</span>
          {phase === 'output' && (
            <span className="animate-pulse text-primary ml-0.5">▊</span>
          )}
          {phase === 'done' && (
            <span className="text-primary ml-1 animate-pulse">|</span>
          )}
        </div>
      )}
    </div>
  );
};

export default TerminalText;
