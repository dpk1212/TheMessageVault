import { useState, useEffect } from 'react';
import { Card, CardContent } from "./ui/card";

export function InspirationStories() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const inspirationStories = [
    {
      id: 1,
      situation: "Supporting Through Cancer Treatment",
      story: "When someone we love is going through cancer treatment, we often want to be there for them every day. But finding the right words can be difficult, especially over months of treatment. The Message Vault was inspired by seeing how consistent, thoughtful messages could provide a lifeline during these challenging times.",
      impact: "Our goal is to help people provide meaningful support during long-term medical treatments when words matter most.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      )
    },
    {
      id: 2,
      situation: "Being Present Through Grief",
      story: "Grief doesn't end after the funeral or when the casseroles stop coming. The hardest times often come weeks or months later when support has dwindled. We created The Message Vault after seeing how people struggle to maintain support for grieving friends and family over time.",
      impact: "We aim to help people be a consistent presence for someone experiencing loss, even when they don't know what to say.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      )
    },
    {
      id: 3,
      situation: "Supporting Mental Health Struggles",
      story: "Depression and anxiety can make someone feel isolated and alone. Regular, thoughtful messages can serve as a reminder that someone cares. This service was partly inspired by mental health professionals who emphasized how important consistent connection is for those struggling.",
      impact: "Our hope is to give people a way to provide reliable support for loved ones with depression, anxiety, or other mental health challenges.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
          <line x1="9" x2="9.01" y1="9" y2="9" />
          <line x1="15" x2="15.01" y1="9" y2="9" />
        </svg>
      )
    }
  ];
  
  // Auto rotate stories
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % inspirationStories.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [inspirationStories.length]);
  
  return (
    <section id="inspiration" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl opacity-70"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl opacity-70"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="bg-accent inline-flex rounded-full px-3 py-1 text-sm mb-4 text-primary">
            <span>Stories That Inspired Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-6">Why We Created The Message Vault</h2>
          <p className="text-muted-foreground text-lg">
            These are the situations that motivated us to build a service that helps people provide meaningful, consistent support.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          {/* Story cards */}
          <div className="relative h-[480px] sm:h-[420px] md:h-[380px]">
            {inspirationStories.map((story, idx) => (
              <div 
                key={story.id}
                className={`absolute inset-0 transition-all duration-700 ${
                  idx === activeIndex 
                    ? 'opacity-100 translate-x-0' 
                    : idx < activeIndex 
                      ? 'opacity-0 -translate-x-full' 
                      : 'opacity-0 translate-x-full'
                }`}
              >
                <Card className="h-full border border-primary/10 shadow-xl overflow-hidden">
                  <CardContent className="p-6 md:p-12 h-full flex flex-col">
                    <div className="flex flex-col md:flex-row gap-8 h-full">
                      {/* Icon column */}
                      <div className="flex justify-center md:justify-start">
                        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                          {story.icon}
                        </div>
                      </div>
                      
                      {/* Content column */}
                      <div className="flex-1 flex flex-col">
                        <h3 className="text-2xl mb-4">{story.situation}</h3>
                        <p className="mb-6 text-muted-foreground flex-grow">{story.story}</p>
                        
                        <div className="bg-muted p-5 md:p-6 rounded-lg mt-auto">
                          <div className="flex gap-3 items-start">
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
                              className="text-primary mt-1 shrink-0"
                            >
                              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                              <path d="m9 12 2 2 4-4"></path>
                            </svg>
                            <p className="text-foreground">{story.impact}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          
          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-8">
            {inspirationStories.map((_, idx) => (
              <button
                key={idx}
                className={`h-2.5 w-2.5 rounded-full transition-all ${
                  idx === activeIndex ? 'bg-primary w-6' : 'bg-primary/30'
                }`}
                onClick={() => setActiveIndex(idx)}
                aria-label={`View story ${idx + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* CTA instead of waitlist */}
        <div className="mt-16 max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full text-sm">
            <span>Ready to start supporting someone? <a href="#pricing" className="text-primary font-medium hover:underline">View our plans</a></span>
          </div>
        </div>
      </div>
    </section>
  );
}