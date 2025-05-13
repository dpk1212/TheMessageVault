import { useEffect, useState } from 'react';

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const testimonials = [
    {
      id: 1,
      quote: "My sister was diagnosed with cancer last year. Even though I wanted to be there for her every day, I struggled with finding the right words. The Message Vault sends her encouraging texts three times a week, and she told me receiving them has been a lifeline during her treatment.",
      author: "James K.",
      role: "Supporting his sister during cancer treatment",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
    },
    {
      id: 2,
      quote: "After my friend lost her husband, I sent flowers and checked in occasionally. But grief doesn't end after a few weeks. The Message Vault has been sending her supportive texts for 8 months now. She says these consistent reminders that someone cares have helped her through the darkest days.",
      author: "Samantha J.",
      role: "Supporting a friend through grief",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
    },
    {
      id: 3,
      quote: "My son battles depression and anxiety at college. I signed up for The Message Vault to send him daily encouragement. He's told me receiving these texts feels like a steady hand on his shoulder during his lowest moments. It's made a profound difference in our relationship.",
      author: "David L.",
      role: "Supporting his son with depression",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
    },
  ];
  
  // Auto rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [testimonials.length]);
  
  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl opacity-70"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl opacity-70"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="bg-accent inline-flex rounded-full px-3 py-1 text-sm mb-4 text-primary">
            <span>Real Stories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-6">When Words Matter Most</h2>
          <p className="text-muted-foreground text-lg">
            Our subscribers share how The Message Vault has helped them provide meaningful support during difficult times.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          {/* Testimonial cards */}
          <div className="relative h-[480px] sm:h-[380px]">
            {testimonials.map((testimonial, idx) => (
              <div 
                key={testimonial.id}
                className={`absolute inset-0 transition-all duration-700 ${
                  idx === activeIndex 
                    ? 'opacity-100 translate-x-0' 
                    : idx < activeIndex 
                      ? 'opacity-0 -translate-x-full' 
                      : 'opacity-0 translate-x-full'
                }`}
              >
                <div className="bg-card rounded-2xl p-8 md:p-10 shadow-xl border border-primary/10 h-full">
                  <div className="flex flex-col h-full">
                    {/* Quote */}
                    <div className="mb-8">
                      <svg 
                        className="h-10 w-10 text-primary/30 mb-4" 
                        fill="currentColor" 
                        viewBox="0 0 32 32"
                      >
                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                      </svg>
                      <p className="text-lg md:text-xl italic">{testimonial.quote}</p>
                    </div>
                    
                    {/* Author */}
                    <div className="mt-auto flex items-center">
                      <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                        <img 
                          src={testimonial.image}
                          alt={testimonial.author}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{testimonial.author}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                className={`h-2.5 w-2.5 rounded-full transition-all ${
                  idx === activeIndex ? 'bg-primary w-6' : 'bg-primary/30'
                }`}
                onClick={() => setActiveIndex(idx)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}