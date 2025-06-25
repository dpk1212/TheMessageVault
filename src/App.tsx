import { useState, useEffect } from 'react';
import { MessageCard } from './components/MessageCard';
import { LeaveMessageForm } from './components/LeaveMessageForm';
import { SupporterModal } from './components/SupporterModal';
import { VaultCounter } from './components/VaultCounter';
import { SupporterWall } from './components/SupporterWall';
import { Button } from './components/ui/button';
import { PenTool, MessageCircle, Heart, ArrowDown } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

interface Message {
  id: string;
  text: string;
  signoff: string;
  tag: string;
  hearts: number;
}

// Mock messages data
const mockMessages: Message[] = [
  {
    id: '1',
    text: "You are not broken. You are breaking open, and that's how the light gets in. Every crack in your heart is a place where love can enter.",
    signoff: "From someone who survived the darkness",
    tag: "Hope",
    hearts: 127
  },
  {
    id: '2', 
    text: "Starting over isn't giving up. It's having the courage to begin again, with all the wisdom your scars have taught you.",
    signoff: "From a fellow traveler",
    tag: "Starting over",
    hearts: 89
  },
  {
    id: '3',
    text: "Your feelings are valid. Your pain is real. And you deserve all the gentleness you're afraid to give yourself.",
    signoff: "From someone learning to be kind to themselves",
    tag: "Self-love",
    hearts: 203
  },
  {
    id: '4',
    text: "The person you're becoming is someone worth fighting for. Don't give up on them.",
    signoff: "From someone who believes in you",
    tag: "Encouragement", 
    hearts: 156
  },
  {
    id: '5',
    text: "Grief doesn't have a timeline. Take all the time you need to honor what you've lost and who you're becoming.",
    signoff: "From someone who knows",
    tag: "Loss",
    hearts: 94
  }
];

type AppState = 'landing' | 'revealing' | 'taking' | 'leaving' | 'wall' | 'thank-you';

export default function App() {
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [currentMessage, setCurrentMessage] = useState<Message>(mockMessages[0]);
  const [showSupporterModal, setShowSupporterModal] = useState(false);

  // Simulate visit tracking
  useEffect(() => {
    const visits = parseInt(localStorage.getItem('vaultVisits') || '0');
    localStorage.setItem('vaultVisits', String(visits + 1));

    // Show supporter modal after 2-3 visits
    if (visits >= 1 && visits <= 2 && !localStorage.getItem('hasSeenSupporterModal')) {
      setTimeout(() => {
        setShowSupporterModal(true);
        localStorage.setItem('hasSeenSupporterModal', 'true');
      }, 3000);
    }

    // For returning visitors, skip landing and go straight to taking
    if (visits > 1) {
      setCurrentState('taking');
    }
  }, []);

  const getRandomMessage = () => {
    const availableMessages = mockMessages.filter(m => m.id !== currentMessage.id);
    return availableMessages[Math.floor(Math.random() * availableMessages.length)];
  };

  const handleTakeMessage = () => {
    setCurrentMessage(getRandomMessage());
    setCurrentState('revealing');
    
    // Transition to taking state after reveal animation
    setTimeout(() => {
      setCurrentState('taking');
    }, 1500);
  };

  const handleTakeAnother = () => {
    setCurrentMessage(getRandomMessage());
  };

  const handleLeaveMessage = (newMessage: { text: string; tag: string; signoff: string }) => {
    console.log('New message submitted:', newMessage);
    setCurrentState('thank-you');
    
    // Auto redirect after thank you
    setTimeout(() => {
      setCurrentState('taking');
      setCurrentMessage(getRandomMessage());
    }, 3000);
  };

  const handleBecomeSponsor = (tier: string) => {
    console.log('Becoming sponsor with tier:', tier);
    // In real app, integrate with Stripe/LemonSqueezy
    alert(`Thank you for becoming a ${tier} supporter! In a real app, this would redirect to payment.`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Enhanced background with depth */}
      <div className="fixed inset-0 bg-gradient-to-br from-vault-deep-charcoal via-vault-deep-charcoal to-black" />
      
      {/* Atmospheric texture overlay */}
      <div className="fixed inset-0 opacity-20">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=1920&h=1080&fit=crop&auto=format"
          alt="Rain on glass texture"
          className="w-full h-full object-cover mix-blend-soft-light"
        />
      </div>

      {/* Floating particles effect */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-vault-coral/20 rounded-full animate-pulse" style={{ animationDelay: '0s', animationDuration: '3s' }} />
        <div className="absolute top-3/4 right-1/3 w-0.5 h-0.5 bg-vault-violet/30 rounded-full animate-pulse" style={{ animationDelay: '1s', animationDuration: '4s' }} />
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-vault-rosewood/15 rounded-full animate-pulse" style={{ animationDelay: '2s', animationDuration: '5s' }} />
        <div className="absolute top-1/3 right-1/4 w-0.5 h-0.5 bg-vault-coral/25 rounded-full animate-pulse" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }} />
      </div>

      <div className="relative z-10">
        {/* Landing State */}
        {currentState === 'landing' && (
          <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
            <div className="max-w-2xl mx-auto space-y-8 fade-in">
              <h1 className="text-vault-bone mb-6 text-shimmer">The Message Vault</h1>
              <p className="tagline text-vault-violet text-lg max-w-lg mx-auto mb-12 slide-up">
                Take a message. Leave a message. Heal each other, quietly.
              </p>
              
              <div className="slide-up" style={{ animationDelay: '0.2s' }}>
                <VaultCounter messagesTaken={35491} messagesLeft={12202} />
              </div>
              
              <div className="pt-12 slide-up" style={{ animationDelay: '0.4s' }}>
                <Button
                  onClick={handleTakeMessage}
                  size="lg"
                  className="bg-vault-coral hover:bg-vault-coral/90 text-vault-charcoal px-8 py-4 text-lg group button-glow"
                >
                  Need a kind word?
                  <ArrowDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
                </Button>
                <p className="text-sm text-vault-violet mt-4 opacity-80 pulse-gentle">
                  Take one — and leave one for someone else.
                </p>
              </div>
            </div>

            {/* Subtle scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="flex flex-col items-center space-y-2 text-vault-violet/60">
                <div className="w-px h-8 bg-vault-violet/30"></div>
                <div className="w-1 h-1 bg-vault-violet/30 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        )}

        {/* Revealing State */}
        {currentState === 'revealing' && (
          <div className="min-h-screen flex flex-col items-center justify-center px-4">
            <div className="max-w-2xl mx-auto text-center space-y-8">
              <div className="animate-in fade-in duration-1000 slide-in-from-bottom-4">
                <h2 className="text-vault-bone mb-4">Someone left this for you...</h2>
                <div className="flex items-center justify-center space-x-2 text-vault-coral">
                  <div className="w-2 h-2 bg-current rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
                  <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
                </div>
              </div>
              
              <div className="animate-in fade-in duration-1000 delay-500 slide-in-from-bottom-8">
                <MessageCard 
                  message={currentMessage} 
                  onTakeAnother={handleTakeAnother}
                />
              </div>
            </div>
          </div>
        )}

        {/* Taking State */}
        {currentState === 'taking' && (
          <>
            {/* Header */}
            <header className="text-center py-12 px-4">
              <h1 className="text-vault-bone mb-4">The Message Vault</h1>
              <p className="tagline text-vault-violet max-w-md mx-auto mb-8">
                Take a message. Leave a message. Heal each other, quietly.
              </p>
              
              <VaultCounter messagesTaken={35491} messagesLeft={12202} />
            </header>

            <main className="pb-12">
              <div className="space-y-12">
                <MessageCard 
                  message={currentMessage} 
                  onTakeAnother={handleTakeAnother}
                />
                
                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
                  <Button
                    onClick={() => setCurrentState('leaving')}
                    variant="outline"
                    className="border-vault-coral/30 text-vault-coral hover:bg-vault-coral/10 flex items-center gap-2"
                  >
                    <PenTool className="w-4 h-4" />
                    Leave a message
                  </Button>
                  
                  <Button
                    onClick={() => setCurrentState('wall')}
                    variant="ghost"
                    className="text-vault-violet hover:bg-vault-violet/10 flex items-center gap-2"
                  >
                    <Heart className="w-4 h-4" />
                    Supporter Wall
                  </Button>
                </div>
              </div>
            </main>
          </>
        )}

        {/* Other States */}
        {currentState === 'leaving' && (
          <>
            <header className="text-center py-8 px-4">
              <h1 className="text-vault-bone mb-2">The Message Vault</h1>
            </header>
            <main className="pb-12">
              <LeaveMessageForm
                onSubmit={handleLeaveMessage}
                onCancel={() => setCurrentState('taking')}
              />
            </main>
          </>
        )}

        {currentState === 'wall' && (
          <>
            <header className="text-center py-8 px-4">
              <h1 className="text-vault-bone mb-2">The Message Vault</h1>
            </header>
            <main className="pb-12">
              <div className="space-y-12">
                <SupporterWall />
                
                <div className="text-center px-4">
                  <Button
                    onClick={() => setCurrentState('taking')}
                    className="bg-vault-coral hover:bg-vault-coral/90 text-vault-charcoal flex items-center gap-2 mx-auto"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Back to messages
                  </Button>
                </div>
              </div>
            </main>
          </>
        )}

        {currentState === 'thank-you' && (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center px-4 py-12">
              <div className="max-w-lg mx-auto">
                <div className="w-16 h-16 bg-gradient-to-br from-vault-coral to-vault-rosewood rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-vault-bone" />
                </div>
                
                <h2 className="text-vault-bone mb-4">Your message has been added to the vault</h2>
                <p className="text-vault-violet mb-8">
                  Someone, somewhere, needed to hear exactly what you wrote. Thank you for making the world a little kinder.
                </p>
                
                <div className="flex items-center justify-center space-x-2 text-vault-coral">
                  <div className="w-2 h-2 bg-current rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
                  <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer - only show on taking, leaving, and wall states */}
        {(currentState === 'taking' || currentState === 'leaving' || currentState === 'wall') && (
          <footer className="border-t border-border/20 py-8 px-4 text-center space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-vault-violet">
              <a href="#" className="hover:text-vault-coral transition-colors">About</a>
              <a href="#" className="hover:text-vault-coral transition-colors">Contact</a>
              <button 
                onClick={() => setShowSupporterModal(true)}
                className="hover:text-vault-coral transition-colors"
              >
                Sponsor this space
              </button>
            </div>
            
            <p className="text-xs text-vault-violet/60">
              The Message Vault exists because of kind strangers like you
            </p>
          </footer>
        )}
      </div>

      {/* Supporter Modal */}
      <SupporterModal
        isOpen={showSupporterModal}
        onClose={() => setShowSupporterModal(false)}
        onBecomeSponsor={handleBecomeSponsor}
      />
    </div>
  );
} 