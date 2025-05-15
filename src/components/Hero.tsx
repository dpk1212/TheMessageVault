import { Button } from "./ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24">
      {/* Background gradient elements */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl opacity-30 animate-pulse-slow"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/30 rounded-full filter blur-3xl opacity-30"></div>
      
      {/* Our Promise Banner */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-secondary/50 rounded-3xl p-8 text-center">
          <div className="bg-primary text-white inline-flex rounded-full px-5 py-1.5 text-sm font-medium mb-4">
            <span>OUR PROMISE</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">
            Flowers fade. Support doesn't have to.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Send a stream of strength, not just a single card.
          </p>
        </div>
      </div>
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
          {/* Left side content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-accent text-primary px-3 py-1 rounded-full mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <span className="flex h-2 w-2 rounded-full bg-primary"></span>
              <span className="text-sm">More meaningful than flowers</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl mb-6 max-w-3xl mx-auto lg:mx-0 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <span className="block bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                Be there for someone
              </span>
              when they need it most.
            </h1>
            
            <p className="text-lg mb-8 text-muted-foreground max-w-2xl mx-auto lg:mx-0 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              The Message Vault delivers consistent, heartfelt messages to someone going through a hard time—so they feel supported, even when you don't know what to say.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 sm:mb-12 animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <Button
                className="h-14 px-8 rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all"
                size="lg"
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Send Support Now →
              </Button>
              <Button
                variant="outline"
                className="h-14 px-8 rounded-full border-primary/20 text-primary hover:bg-primary/5 transition-all"
                size="lg"
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              >
                How It Works
              </Button>
            </div>
            
            {/* Trust badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-4 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
                <span>Human-written messages</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
                <span>Text or email delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
                <span>A quiet presence</span>
              </div>
            </div>
          </div>
          
          {/* Right side visualization */}
          <div className="flex-1 mt-12 lg:mt-0 flex justify-center lg:justify-end animate-float">
            <div className="relative max-w-xs md:max-w-sm">
              {/* Glowing effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary to-purple-400 opacity-30 blur-xl"></div>
              
              {/* Phone & Email mockup */}
              <div className="relative bg-card rounded-3xl overflow-hidden border border-primary/10 shadow-2xl shadow-primary/20">
                {/* Two device mockups showing delivery options */}
                <div className="flex items-center justify-center relative">
                  {/* Email mockup (slightly visible in background) */}
                  <div className="absolute -right-16 top-2 w-48 h-[500px] bg-card rounded-3xl border border-primary/5 shadow-xl opacity-40 rotate-6">
                    <div className="h-6 bg-gradient-to-r from-primary/60 to-purple-400/60 flex items-center justify-center">
                      <div className="w-20 h-1 bg-white/50 rounded-full"></div>
                    </div>
                    <div className="p-4">
                      <div className="h-6 w-3/4 bg-muted rounded-md mb-2"></div>
                      <div className="h-4 w-1/2 bg-muted/60 rounded-md mb-4"></div>
                      <div className="space-y-2">
                        <div className="h-4 w-full bg-muted/40 rounded-md"></div>
                        <div className="h-4 w-full bg-muted/40 rounded-md"></div>
                        <div className="h-4 w-3/4 bg-muted/40 rounded-md"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Main phone mockup */}
                  <div className="relative z-10 w-full">
                    {/* Phone header */}
                    <div className="h-6 bg-gradient-to-r from-primary/90 to-purple-500/90 flex items-center justify-center">
                      <div className="w-20 h-1 bg-white/30 rounded-full mt-0.5"></div>
                    </div>
                    
                    {/* Person receiving care illustration */}
                    <div className="pt-4 px-4 bg-white">
                      <div className="rounded-xl bg-secondary/50 p-4 mb-4 flex items-center gap-3">
                        <div className="flex-shrink-0 h-14 w-14 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="32" 
                            height="32" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="1.5" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="text-primary"
                          >
                            <path d="M18 20a6 6 0 0 0-12 0" />
                            <circle cx="12" cy="10" r="4" />
                            <circle cx="12" cy="12" r="10" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-sm">Sarah's Recovery Journey</h4>
                          <p className="text-xs text-muted-foreground">Receiving daily support</p>
                        </div>
                      </div>
                      
                      {/* Delivery method toggle */}
                      <div className="flex mb-2 bg-muted rounded-lg p-1">
                        <div className="flex-1 bg-white rounded-md py-1.5 text-center text-sm font-medium shadow-sm">Text</div>
                        <div className="flex-1 py-1.5 text-center text-sm text-muted-foreground">Email</div>
                      </div>
                    </div>
                    
                    {/* Message timeline with days */}
                    <div className="p-4 pb-6 bg-card">
                      {/* Timeline of consistent messages */}
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="h-px bg-muted-foreground/20 flex-grow"></div>
                          <span className="text-xs text-muted-foreground">Monday</span>
                          <div className="h-px bg-muted-foreground/20 flex-grow"></div>
                        </div>
                        
                        <div className="flex gap-3 items-start">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary to-purple-400 flex items-center justify-center text-white">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                            </svg>
                          </div>
                          <div className="bg-muted p-3 rounded-2xl rounded-tl-none flex-1 shadow-sm">
                            <p className="text-sm">I know today might be tough with the treatment. I'm thinking of you. Just remember—this moment will pass, but my support won't. I'm here.</p>
                            <p className="mt-1 text-xs text-muted-foreground">8:42 AM</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-1 mt-2">
                          <div className="h-px bg-muted-foreground/20 flex-grow"></div>
                          <span className="text-xs text-muted-foreground">Wednesday</span>
                          <div className="h-px bg-muted-foreground/20 flex-grow"></div>
                        </div>
                        
                        <div className="flex gap-3 items-start">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary to-purple-400 flex items-center justify-center text-white">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                            </svg>
                          </div>
                          <div className="bg-muted p-3 rounded-2xl rounded-tl-none flex-1 shadow-sm">
                            <p className="text-sm">Just wanted you to know you're on my mind today. One day at a time. Your strength through this has been incredible, even when you don't feel strong.</p>
                            <p className="mt-1 text-xs text-muted-foreground">9:15 AM</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-1 mt-2">
                          <div className="h-px bg-muted-foreground/20 flex-grow"></div>
                          <span className="text-xs text-muted-foreground">Friday</span>
                          <div className="h-px bg-muted-foreground/20 flex-grow"></div>
                        </div>
                        
                        <div className="flex gap-3 items-start">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary to-purple-400 flex items-center justify-center text-white">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                            </svg>
                          </div>
                          <div className="bg-muted p-3 rounded-2xl rounded-tl-none flex-1 shadow-sm">
                            <p className="text-sm">Heading into the weekend just wanting to remind you that you're not facing this alone. I'm here for the long haul. ❤️</p>
                            <p className="mt-1 text-xs text-muted-foreground">8:30 AM</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Calendar indicator showing consistency */}
                      <div className="mt-6 bg-muted/50 p-3 rounded-xl">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-medium">May 2025</span>
                          <div className="flex gap-1">
                            <span className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m15 18-6-6 6-6" />
                              </svg>
                            </span>
                            <span className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m9 18 6-6-6-6" />
                              </svg>
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                            <div key={i} className="text-center text-xs text-muted-foreground">
                              {day}
                            </div>
                          ))}
                          {[...Array(31)].map((_, i) => (
                            <div 
                              key={i} 
                              className={`text-center text-xs h-6 w-6 rounded-full flex items-center justify-center mx-auto ${
                                [1, 3, 5, 8, 10, 12, 15, 17, 19, 22, 24, 26, 29].includes(i+1) 
                                  ? 'bg-primary text-white' 
                                  : ''
                              }`}
                            >
                              {i+1}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Flowers vs Ongoing Support Comparison */}
        <div className="mt-20 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-md flex items-center gap-4 w-full md:w-auto">
            <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 10c3.314 0 6-2.686 6-6 0 3.314 2.686 6 6 6-3.314 0-6 2.686-6 6 0-3.314-2.686-6-6-6 3.314 0 6-2.686 6-6 0 3.314 2.686 6 6 6-3.314 0-6 2.686-6 6 0-3.314-2.686-6-6-6z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium">One-time flowers</h3>
              <p className="text-muted-foreground">Last 5-7 days then wither</p>
            </div>
          </div>
          
          <div className="flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </div>
          
          <div className="bg-secondary/60 rounded-2xl p-6 shadow-md flex items-center gap-4 w-full md:w-auto">
            <div className="h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium">Stream of support</h3>
              <p className="text-muted-foreground">Consistent care for weeks & months</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}