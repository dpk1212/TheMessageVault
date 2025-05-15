import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";

export function Pricing() {
  const plans = [
    {
      id: "weekly",
      name: "The Weekly Whisper",
      description: "Gentle reminders of support during challenging times.",
      price: "$7",
      period: "month",
      features: [
        "1 message per week",
        "Human-written messages",
        "Personalized to your relationship",
        "Email or text delivery",
        "Message history",
        "1 recipient"
      ],
      popular: false,
      cta: "Send Weekly Support",
      color: "from-indigo-400/40 to-transparent",
      paymentLink: "https://buy.stripe.com/3cs6s236wfFU3ZK8ww"
    },
    {
      id: "steady",
      name: "The Steady Echo",
      description: "Our most popular plan for consistent presence.",
      price: "$14",
      period: "month",
      features: [
        "2 messages per week",
        "Human-written messages",
        "Personalized to your relationship",
        "Email or text delivery",
        "Message preview option",
        "Priority support",
        "Message history",
        "1 recipient"
      ],
      popular: true,
      cta: "Send Steady Support",
      color: "from-primary/40 to-transparent",
      paymentLink: "https://buy.stripe.com/cN29Ee36w8ds2VGbIJ"
    },
    {
      id: "daily",
      name: "The Daily Glow",
      description: "Daily comfort for those facing significant challenges.",
      price: "$19",
      period: "month",
      features: [
        "1 message per day",
        "Human-written messages",
        "Personalized to your relationship",
        "Email or text delivery",
        "Message preview option",
        "Custom scheduling",
        "Priority support",
        "Message history",
        "1 recipient"
      ],
      popular: false,
      bestValue: true,
      cta: "Send Daily Support",
      color: "from-purple-400/40 to-transparent",
      paymentLink: "https://buy.stripe.com/9AQ2bMePeeBQbsceUW"
    },
  ];

  return (
    <section id="pricing" className="py-24 relative">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="bg-accent inline-flex rounded-full px-3 py-1 text-sm mb-4 text-primary">
            <span>Support Plans</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-6">Meaningful Support, Not One-Time Gestures</h2>
          <p className="text-muted-foreground text-lg">
            Choose how often your loved one receives support messages. Unlike flowers that fade or a single card, your support will be ongoing.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative flex flex-col border overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                plan.popular 
                  ? 'border-primary shadow-lg shadow-primary/10' 
                  : 'border-border'
              }`}
            >
              {/* Background gradient */}
              <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-br ${plan.color} opacity-50`}></div>
              
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-3 inset-x-0 flex justify-center z-20 mt-1">
                  <Badge variant="secondary" className="bg-primary text-white shadow-md px-5 py-1.5 text-xs font-medium">
                    MOST POPULAR
                  </Badge>
                </div>
              )}
              
              {/* Best Value badge */}
              {plan.bestValue && (
                <div className="absolute -top-3 inset-x-0 flex justify-center z-20 mt-1">
                  <Badge variant="secondary" className="bg-purple-600 text-white shadow-md px-5 py-1.5 text-xs font-medium">
                    BEST VALUE
                  </Badge>
                </div>
              )}
              
              <CardHeader className={`relative z-10 ${plan.popular || plan.bestValue ? 'pt-8' : 'pt-6'}`}>
                <div className="mb-2">
                  <CardTitle>{plan.name}</CardTitle>
                  <p className="text-muted-foreground text-sm mt-1">{plan.description}</p>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl font-medium">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
              </CardHeader>
              
              <CardContent className="relative z-10 flex-grow">
                <p className="text-sm text-muted-foreground mb-4">Your support includes:</p>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
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
                        className="text-primary mt-0.5"
                      >
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                        <path d="m9 12 2 2 4-4"></path>
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter className="relative z-10">
                <Button 
                  className={`w-full h-12 rounded-full shadow-lg transition-all ${
                    plan.popular 
                      ? 'bg-primary hover:bg-primary/90 shadow-primary/20' 
                      : 'bg-card border border-primary/40 text-primary hover:bg-primary/5'
                  }`}
                  onClick={() => window.location.href = plan.paymentLink}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* Cost comparison */}
        <div className="mt-16 max-w-2xl mx-auto bg-card rounded-2xl p-8 border shadow-lg">
          <h3 className="text-center mb-6">How We Compare to Other Gestures</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="border rounded-xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
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
                    <path d="M12 2a10 10 0 1 0 10 10 10 10 0 0 0-10-10zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"></path>
                    <path d="M12 6v6l4 2"></path>
                  </svg>
                </div>
                <h4>One-Time Gestures</h4>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>• Flowers: $60-$100 (last 5-7 days)</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>• Gift basket: $50-$150 (one-time)</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>• Card: $5-$10 (one message)</span>
                </li>
              </ul>
            </div>
            <div className="border rounded-xl p-5 bg-primary/5 border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
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
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                </div>
                <h4>The Message Vault</h4>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <span>• Weekly: $1.75/week (4-5 messages/month)</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <span>• Twice Weekly: $3.50/week (8-9 messages/month)</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <span>• Daily: $0.63/day (30-31 messages/month)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Subscription clarification */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full text-sm">
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
              className="text-primary"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
            <span>Each subscription covers 1 message recipient. You decide if messages are sent via text or email.</span>
          </div>
        </div>
        
        {/* Money back guarantee */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full text-sm">
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
              className="text-primary"
            >
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
              <path d="m9 12 2 2 4-4"></path>
            </svg>
            <span className="font-medium">30-day money-back guarantee. No questions asked.</span>
          </div>
        </div>
      </div>
    </section>
  );
}