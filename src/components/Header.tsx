import { useState, useEffect } from 'react';
import { Button } from "./ui/button";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <>
      <header 
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled 
            ? 'bg-white/90 dark:bg-card/90 shadow-sm backdrop-blur-md' 
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-primary to-primary/70 flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              </svg>
            </div>
            <span className="font-medium text-lg tracking-tight hidden sm:block">The Message Vault</span>
            <span className="font-medium text-lg tracking-tight sm:hidden">TMV</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#how-it-works" className="text-foreground/80 hover:text-primary transition-colors">How It Works</a>
            <a href="#pricing" className="text-foreground/80 hover:text-primary transition-colors">Support Plans</a>
            <a href="#faq" className="text-foreground/80 hover:text-primary transition-colors">FAQ</a>
          </nav>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              className="rounded-full hidden sm:flex hover:bg-primary/5 hover:text-primary"
              onClick={() => window.open("https://billing.stripe.com/p/login/14kfZ49IJg8letOfYY", "_blank")}
            >
              Manage Subscription
            </Button>
            <Button 
              className="rounded-full shadow-md shadow-primary/20 bg-primary hover:bg-primary/90 transition-all"
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Send Support
            </Button>
          </div>
        </div>
      </header>
      
      {/* Floating CTA button (mobile) */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden animate-float">
        <Button 
          className="rounded-full h-14 px-6 shadow-lg shadow-primary/30 bg-primary hover:bg-primary/90 transition-all"
          onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Send Support
        </Button>
      </div>
    </>
  );
}