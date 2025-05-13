export function StepProcess() {
  const steps = [
    {
      id: 1,
      title: "Choose who needs support",
      description: "Select someone going through a difficult time—whether it's illness, grief, depression, or any challenging period.",
      icon: "👤",
      color: "from-primary/70 to-primary",
    },
    {
      id: 2,
      title: "We craft meaningful messages",
      description: "Our writers create personalized texts that sound authentic to your relationship—providing comfort when words feel hard to find.",
      icon: "✏️",
      color: "from-purple-400 to-primary",
    },
    {
      id: 3,
      title: "They receive ongoing support",
      description: "Your loved one receives consistent, heartfelt messages via text or email—a quiet presence reminding them they're not alone.",
      icon: "💌",
      color: "from-indigo-400 to-primary/80",
    }
  ];

  return (
    <section id="how-it-works" className="py-20 relative">
      {/* Background elements */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-background to-secondary/20 pointer-events-none"></div>
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="bg-accent inline-flex rounded-full px-3 py-1 text-sm mb-4 text-primary">
            <span>How It Works</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-6">A Trusted Voice in Hard Times</h2>
          <p className="text-muted-foreground text-lg">
            When someone's going through a difficult period, what they need most is ongoing support—not just a one-time gesture.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className="relative group"
            >
              {/* Connection lines between steps (desktop only) */}
              {step.id < 3 && (
                <div className="absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary/40 to-transparent hidden md:block z-0" />
              )}
              
              {/* Card */}
              <div className="bg-card border border-primary/10 rounded-2xl p-8 shadow-lg shadow-primary/5 h-full flex flex-col relative z-10 transition-all duration-300 group-hover:translate-y-[-8px] group-hover:shadow-xl">
                {/* Step number badge */}
                <div className="absolute -top-4 -right-4 w-10 h-10 bg-card rounded-full border border-primary/10 shadow-md flex items-center justify-center">
                  <span className="text-sm font-medium">{step.id}</span>
                </div>
                
                {/* Icon */}
                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr ${step.color} mb-6 text-2xl`}>
                  {step.icon}
                </div>
                
                <h3 className="text-xl mb-4">{step.title}</h3>
                <p className="text-muted-foreground mb-6 flex-grow">{step.description}</p>
                
                {/* Additional details based on step */}
                {step.id === 1 && (
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs text-primary">Illness</span>
                    <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs text-primary">Depression</span>
                    <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs text-primary">Grief</span>
                    <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs text-primary">Recovery</span>
                  </div>
                )}
                
                {step.id === 2 && (
                  <div className="flex items-center gap-2 text-sm text-primary mt-auto">
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
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                    <span>Words that feel like they came from you</span>
                  </div>
                )}
                
                {step.id === 3 && (
                  <div className="flex flex-col gap-3 mt-auto">
                    <div className="rounded-lg bg-muted p-2.5 text-xs">
                      <p className="italic">"Your message arrived just when I was feeling most alone. It meant everything to know someone was thinking of me."</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-primary">
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
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                        <path d="m9 12 2 2 4-4"></path>
                      </svg>
                      <span>Choice of text message or email delivery</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}