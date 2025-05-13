export function TrustSection() {
  const trustPoints = [
    {
      title: "Human-written, never AI",
      description: "Every message is thoughtfully crafted by compassionate writers who understand the delicacy of supporting someone through hard times.",
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
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    {
      title: "Not just a one-time gesture",
      description: "Unlike flowers or a single card, we provide ongoing, consistent support—because difficult times don't resolve in a day.",
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
        >
          <path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
        </svg>
      )
    },
    {
      title: "A trusted voice when needed most",
      description: "Our messages offer comfort, hope, and a gentle reminder that they're not alone—arriving exactly when they need support.",
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
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      )
    }
  ];

  return (
    <section className="bg-gradient-to-br from-secondary/80 to-secondary py-20 px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full filter blur-2xl"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/5 rounded-full filter blur-2xl"></div>
      
      <div className="container mx-auto max-w-5xl relative">
        <div className="text-center mb-16">
          <div className="bg-white inline-flex rounded-full px-3 py-1 text-sm mb-4 text-primary shadow-sm">
            <span>Our Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-6">It's Not a One-Time Gesture. It's a Quiet Presence.</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We founded The Message Vault because we believe in the power of consistent, compassionate communication to help people through life's hardest moments.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trustPoints.map((point, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-xl border border-primary/10 h-full flex flex-col items-center text-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
                {point.icon}
              </div>
              <h3 className="text-xl mb-4">{point.title}</h3>
              <p className="text-muted-foreground">{point.description}</p>
            </div>
          ))}
        </div>
        
        {/* Message example */}
        <div className="mt-20">
          <div className="bg-white rounded-2xl shadow-xl border border-primary/10 p-6 md:p-8 max-w-3xl mx-auto">
            <h3 className="text-center mb-6">What Our Messages Sound Like</h3>
            <div className="space-y-4">
              <div className="rounded-xl bg-muted p-4 shadow-sm">
                <p className="italic text-foreground">
                  "I know grief comes in waves. Some days feel impossible, others more manageable. No matter what kind of day today is for you, I wanted you to know I'm thinking of you. Your strength amazes me, even when you don't feel strong."
                </p>
                <p className="text-sm text-muted-foreground mt-2">Example message for someone grieving a loss</p>
              </div>
              <div className="rounded-xl bg-muted p-4 shadow-sm">
                <p className="italic text-foreground">
                  "Remember that recovery isn't linear. Having a setback doesn't erase all your progress. I believe in you today just as much as I did yesterday. Take it one moment at a time—that's all any of us can do."
                </p>
                <p className="text-sm text-muted-foreground mt-2">Example message for someone in recovery</p>
              </div>
              <div className="rounded-xl bg-muted p-4 shadow-sm">
                <p className="italic text-foreground">
                  "Just a reminder that depression lies. It tells you you're alone, that things won't get better. I'm here to tell you neither is true. I'm with you in this, even on the days when it's hard to feel anything at all."
                </p>
                <p className="text-sm text-muted-foreground mt-2">Example message for someone with depression</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Our commitment section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl mb-6">Our Commitment to You</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/80 rounded-xl p-6 shadow-lg border border-primary/10">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto mb-4">
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
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <line x1="9" x2="15" y1="15" y2="15" />
                  <line x1="12" x2="12" y1="9" y2="15" />
                </svg>
              </div>
              <h4 className="text-lg mb-2">100% Satisfaction Guarantee</h4>
              <p className="text-sm text-muted-foreground">
                If you're not satisfied with our service, we'll refund your purchase within 30 days.
              </p>
            </div>
            <div className="bg-white/80 rounded-xl p-6 shadow-lg border border-primary/10">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto mb-4">
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
                  <circle cx="12" cy="12" r="10" />
                  <path d="m4.93 4.93 4.24 4.24" />
                  <path d="m14.83 9.17 4.24-4.24" />
                  <path d="m14.83 14.83 4.24 4.24" />
                  <path d="m9.17 14.83-4.24 4.24" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              </div>
              <h4 className="text-lg mb-2">Cancel Anytime</h4>
              <p className="text-sm text-muted-foreground">
                No long-term contracts. You can cancel your subscription at any time.
              </p>
            </div>
            <div className="bg-white/80 rounded-xl p-6 shadow-lg border border-primary/10">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto mb-4">
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
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h4 className="text-lg mb-2">Privacy Protected</h4>
              <p className="text-sm text-muted-foreground">
                We take privacy seriously. Your personal information and message content are never shared or sold.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}