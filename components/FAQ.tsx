import { useState } from 'react';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How do messages get delivered to my loved one?",
      answer: "You choose whether messages are delivered via text message or email. For text messages, they're sent directly to your loved one's phone from a dedicated support number that remains consistent over time. For email, they'll receive messages through a dedicated email address that they can easily recognize. You can select your preferred delivery method during sign-up."
    },
    {
      question: "How do you make messages sound personal and authentic?",
      answer: "During sign-up, we ask about your relationship with the recipient, their situation, and your communication style. Our writers then craft messages that reflect your voice while offering meaningful support. You can also provide example messages you've sent in the past to help capture your tone."
    },
    {
      question: "What kinds of difficult situations do you support?",
      answer: "We craft messages for people going through many challenging situations, including: illness and medical treatment, grief and loss, depression and anxiety, recovery, divorce or breakups, job loss, caregiving stress, and other difficult transitions. Each situation receives carefully tailored support."
    },
    {
      question: "Will my loved one know I'm using a service?",
      answer: "That's entirely up to you. Many subscribers choose to tell their loved one they've arranged ongoing support messages as a way of showing they care. Others prefer to keep it private. Our messages never reference The Message Vault service, so they can simply be received as thoughtful texts or emails."
    },
    {
      question: "Can I review messages before they're sent?",
      answer: "Yes! With our Steady Echo and Daily Glow plans, you can opt to review messages before they're sent. You'll receive them 24 hours in advance and can approve, edit, or request a new message. The Weekly Whisper plan offers this feature as an add-on."
    },
    {
      question: "How is this different from sending texts myself?",
      answer: "Finding the right words during difficult times can be challenging, and it's hard to maintain consistency when you have your own life demands. Our service ensures your loved one receives thoughtful, well-crafted messages regularly—even when you're busy, emotionally drained, or struggling to find the right words."
    },
    {
      question: "Can I get messages for more than one person?",
      answer: "Each subscription covers one message recipient. If you'd like to support multiple people, you'll need a separate subscription for each person. This ensures that each person receives messages specifically tailored to their unique situation and your relationship with them."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="bg-accent inline-flex rounded-full px-3 py-1 text-sm mb-4 text-primary">
            <span>Common Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-6">Frequently Asked Questions</h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about supporting someone through The Message Vault
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="mb-5"
            >
              <button
                className={`w-full flex items-center justify-between p-5 text-left rounded-xl border transition-all ${
                  openIndex === idx 
                    ? 'bg-card border-primary/20 shadow-lg' 
                    : 'bg-card/50 border-border hover:border-primary/10'
                }`}
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
              >
                <h3 className="text-lg">{faq.question}</h3>
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
                  className={`transform transition-transform ${openIndex === idx ? 'rotate-180' : ''}`}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-5 pt-4 text-muted-foreground">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}