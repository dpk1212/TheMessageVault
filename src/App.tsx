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

type AppState = 'landing' | 'revealing' | 'taking' | 'leaving' | 'wall' | 'thank-you' | 'transitioning';

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
    // Start dramatic transition
    setCurrentState('transitioning');
    
    // Get new message after dramatic pause
    setTimeout(() => {
      setCurrentMessage(getRandomMessage());
      setCurrentState('revealing');
      
      // Move to taking state after full reveal
      setTimeout(() => {
        setCurrentState('taking');
      }, 8000); // Extended for two-stage reveal
    }, 1500);
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

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Sophisticated background layers */}
      <div className="fixed inset-0 bg-gradient-to-b from-vault-deep-charcoal via-vault-deep-charcoal to-vault-deep-blue/20" />
      
      {/* Atmospheric texture with elegant overlay */}
      <div className="fixed inset-0 opacity-15">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1920&h=1080&fit=crop&auto=format"
          alt="Elegant paper texture"
          className="w-full h-full object-cover mix-blend-overlay"
        />
      </div>

      {/* Refined light effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Golden accent lights */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-vault-gold/5 rounded-full blur-xl" />
        <div className="absolute bottom-32 right-20 w-40 h-40 bg-vault-coral/8 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-vault-sage/4 rounded-full blur-3xl" />
        
        {/* Subtle floating elements */}
        <div className="absolute top-1/4 left-1/5 w-2 h-2 bg-vault-gold/20 rounded-full animate-pulse" style={{ animationDelay: '0s', animationDuration: '4s' }} />
        <div className="absolute top-3/5 right-1/4 w-1 h-1 bg-vault-coral/30 rounded-full animate-pulse" style={{ animationDelay: '2s', animationDuration: '6s' }} />
        <div className="absolute bottom-1/3 left-3/4 w-1.5 h-1.5 bg-vault-sage/25 rounded-full animate-pulse" style={{ animationDelay: '4s', animationDuration: '5s' }} />
      </div>

      {/* Elegant border frame */}
      <div className="fixed inset-4 border border-vault-coral/10 rounded-lg pointer-events-none z-10" />
      <div className="fixed inset-8 border border-vault-gold/5 rounded-md pointer-events-none z-10" />

      <div className="relative z-10">
        {/* Landing State - Mobile-Optimized Emotional Journey */}
        {currentState === 'landing' && (
          <div className="min-h-screen flex flex-col items-center justify-center px-4 md:px-6 text-center relative">
            {/* Mobile-first content container */}
            <div className="w-full max-w-5xl mx-auto space-y-8 md:space-y-12 fade-in">
              {/* Hero Title with mobile-responsive typography */}
              <div className="space-y-4 md:space-y-6">
                <h1 className="text-4xl md:text-6xl lg:text-7xl text-vault-bone text-shimmer font-light tracking-wide leading-tight px-2">
                  The Message Vault
                </h1>
                <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent via-vault-gold to-transparent mx-auto opacity-60" />
              </div>
              
              {/* Mobile-optimized tagline */}
              <div className="slide-up space-y-4 md:space-y-6">
                <p className="text-lg md:text-xl lg:text-2xl text-vault-violet max-w-4xl mx-auto leading-relaxed font-light px-4">
                  A sanctuary for anonymous kindness, where words become bridges between hearts.
                </p>
                <p className="text-base md:text-lg text-vault-violet/70 max-w-2xl mx-auto font-light leading-relaxed px-4">
                  Take a message when you need hope. Leave one when you have love to give.
                </p>
              </div>
              
              {/* Mobile-responsive counter */}
              <div className="slide-up py-6 md:py-8" style={{ animationDelay: '0.2s' }}>
                <VaultCounter messagesTaken={35491} messagesLeft={12202} />
              </div>
              
              {/* Mobile-optimized call-to-action */}
              <div className="pt-6 md:pt-8 slide-up space-y-6 md:space-y-8" style={{ animationDelay: '0.4s' }}>
                <Button
                  onClick={handleTakeMessage}
                  size="lg"
                  className="w-full max-w-sm md:max-w-md bg-gradient-to-r from-vault-coral to-vault-coral/90 hover:from-vault-coral/90 hover:to-vault-coral text-vault-charcoal px-8 md:px-12 py-4 md:py-6 text-lg md:text-xl group button-glow rounded-full font-light tracking-wide border border-vault-gold/20 mx-auto"
                >
                  Begin Your Journey
                  <ArrowDown className="ml-2 md:ml-3 w-5 h-5 md:w-6 md:h-6 group-hover:translate-y-1 transition-all duration-300" />
                </Button>
                
                {/* Mobile-friendly instruction */}
                <p className="text-xs md:text-sm text-vault-violet/60 font-light tracking-wider uppercase px-4">
                  Your healing awaits
                </p>
              </div>
            </div>

            {/* Mobile-optimized decorative elements */}
            <div className="absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 opacity-40">
              <div className="flex flex-col items-center space-y-2 md:space-y-3">
                <div className="w-px h-12 md:h-16 bg-gradient-to-b from-vault-gold/40 to-transparent"></div>
                <div className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-vault-gold/30 animate-pulse"></div>
              </div>
            </div>
          </div>
        )}

        {/* Transitioning State - Dramatic Pause */}
        {currentState === 'transitioning' && (
          <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
            {/* Intense dramatic background */}
            <div className="absolute inset-0 bg-gradient-to-b from-vault-deep-charcoal via-vault-deep-blue/40 to-vault-deep-charcoal">
              <div className="absolute inset-0 bg-gradient-radial from-vault-gold/5 via-transparent to-transparent animate-pulse" style={{ animationDuration: '3s' }} />
            </div>

            <div className="relative z-10 text-center px-4 md:px-6">
              <div className="space-y-8 md:space-y-12">
                <h2 className="text-2xl md:text-4xl lg:text-5xl text-vault-bone font-light tracking-wide fade-in">
                  Another soul is reaching out...
                </h2>
                
                {/* Dramatic anticipation elements */}
                <div className="flex items-center justify-center space-x-3 md:space-x-4">
                  <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent via-vault-coral to-transparent opacity-60" />
                  <div className="w-3 h-3 bg-vault-coral rounded-full animate-pulse" style={{ animationDuration: '1.5s' }} />
                  <div className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent via-vault-coral to-transparent opacity-60" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Revealing State - Two-Stage Dramatic Reveal */}
        {currentState === 'revealing' && (
          <div className="min-h-screen relative overflow-hidden">
            {/* Dramatic background with emotional depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-vault-deep-charcoal via-vault-deep-blue/30 to-vault-deep-charcoal">
              {/* Emotional light effects */}
              <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-vault-gold/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
              <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-vault-coral/8 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-vault-sage/6 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s', animationDelay: '1s' }} />
            </div>

            {/* Sacred moment container */}
            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 md:px-6">
              {/* Emotional buildup sequence */}
              <div className="w-full max-w-5xl mx-auto text-center space-y-8 md:space-y-12">
                
                {/* STAGE 1: Reveal who it's from (dramatic signoff reveal) */}
                <div className="text-reveal space-y-6 md:space-y-8" style={{ animationDelay: '0.5s' }}>
                  <div className="space-y-4">
                    <h2 className="text-xl md:text-3xl lg:text-4xl text-vault-sage/80 font-light tracking-wide leading-tight px-4">
                      This message comes
                    </h2>
                    <h2 className="text-2xl md:text-4xl lg:text-5xl text-vault-coral font-light tracking-wide leading-tight px-4">
                      {currentMessage.signoff}
                    </h2>
                  </div>
                  
                  {/* Sacred pause element */}
                  <div className="flex items-center justify-center space-x-3 md:space-x-4">
                    <div className="w-12 md:w-16 h-px bg-gradient-to-r from-transparent via-vault-gold to-transparent opacity-60" />
                    <div className="w-2 h-2 bg-vault-gold rounded-full animate-pulse" style={{ animationDuration: '2s' }} />
                    <div className="w-12 md:w-16 h-px bg-gradient-to-l from-transparent via-vault-gold to-transparent opacity-60" />
                  </div>
                  
                  <p className="text-base md:text-xl text-vault-violet/80 max-w-2xl mx-auto leading-relaxed font-light px-4">
                    They chose to share these words with your heart
                  </p>
                </div>

                {/* Extended emotional breathing space */}
                <div className="h-16 md:h-24" />

                {/* STAGE 2: The sacred message reveal */}
                <div className="text-reveal space-y-6 md:space-y-8" style={{ animationDelay: '4s' }}>
                  <div className="space-y-4">
                    <h3 className="text-lg md:text-2xl text-vault-bone/90 font-light tracking-wide px-4">
                      Their message for you:
                    </h3>
                  </div>
                  
                  {/* Extended anticipation dots */}
                  <div className="flex items-center justify-center space-x-2 md:space-x-3">
                    <div className="w-3 h-3 bg-vault-coral rounded-full animate-pulse" style={{ animationDuration: '2s' }} />
                    <div className="w-3 h-3 bg-vault-coral rounded-full animate-pulse" style={{ animationDuration: '2s', animationDelay: '0.7s' }} />
                    <div className="w-3 h-3 bg-vault-coral rounded-full animate-pulse" style={{ animationDuration: '2s', animationDelay: '1.4s' }} />
                  </div>
                  
                  {/* The moment of revelation */}
                  <div className="ethereal-glow" style={{ animationDelay: '6s' }}>
                    <MessageCard 
                      message={currentMessage} 
                      onTakeAnother={handleTakeAnother}
                    />
                  </div>
                </div>

                {/* Sacred closing */}
                <div className="text-reveal pt-8 md:pt-12" style={{ animationDelay: '7.5s' }}>
                  <p className="text-sm md:text-base text-vault-sage/70 max-w-lg mx-auto font-light italic leading-relaxed px-4">
                    "In the depths of winter, I finally learned that within me there lay an invincible summer." — Camus
                  </p>
                </div>
              </div>
            </div>

            {/* Floating elements for emotional atmosphere - mobile optimized */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-20 left-4 w-1 h-1 bg-vault-gold/30 rounded-full animate-pulse floating" style={{ animationDelay: '1s', animationDuration: '8s' }} />
              <div className="absolute top-1/3 right-8 w-1.5 h-1.5 bg-vault-coral/20 rounded-full animate-pulse floating" style={{ animationDelay: '3s', animationDuration: '10s' }} />
              <div className="absolute bottom-1/4 left-8 w-0.5 h-0.5 bg-vault-sage/40 rounded-full animate-pulse floating" style={{ animationDelay: '5s', animationDuration: '12s' }} />
              <div className="absolute bottom-20 right-4 w-1 h-1 bg-vault-violet/25 rounded-full animate-pulse floating" style={{ animationDelay: '2s', animationDuration: '9s' }} />
            </div>
          </div>
        )}

        {/* Taking State - Focus on Message */}
        {currentState === 'taking' && (
          <>
            {/* Minimal Header - No Counter */}
            <header className="text-center py-8 px-4">
              <h1 className="text-vault-bone mb-4">The Message Vault</h1>
              <p className="tagline text-vault-violet max-w-md mx-auto">
                Take a message. Leave a message. Heal each other, quietly.
              </p>
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
      />
    </div>
  );
} 