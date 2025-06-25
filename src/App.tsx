import { useState, useEffect } from 'react';
import { MessageCard } from './components/MessageCard';
import { LeaveMessageForm } from './components/LeaveMessageForm';
import { SupporterModal } from './components/SupporterModal';
import { VaultCounter } from './components/VaultCounter';
import { SupporterWall } from './components/SupporterWall';
import { Button } from './components/ui/button';
import { PenTool, MessageCircle, Heart, ArrowDown } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { messageService, statsService, seedService, type Message as FirebaseMessage } from './services/firebase';

// Convert Firebase message to component message format
const convertFirebaseMessage = (fbMessage: FirebaseMessage) => ({
  id: fbMessage.id,
  text: fbMessage.text,
  signoff: fbMessage.signoff,
  tag: fbMessage.tag,
  hearts: fbMessage.hearts
});

type AppState = 'landing' | 'revealing' | 'taking' | 'leaving' | 'wall' | 'thank-you' | 'transitioning';

export default function App() {
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [currentMessage, setCurrentMessage] = useState<any>(null);
  const [showSupporterModal, setShowSupporterModal] = useState(false);
  const [vaultStats, setVaultStats] = useState({ messagesTaken: 0, messagesLeft: 0 });

  // Load initial vault stats and seed data
  useEffect(() => {
    const loadStats = async () => {
      try {
        // Add seed messages if database is empty
        await seedService.addInitialMessages();
        
        // Load stats
        const stats = await statsService.getVaultStats();
        setVaultStats({
          messagesTaken: stats.messagesTaken,
          messagesLeft: stats.messagesLeft
        });
      } catch (error) {
        console.error('Error loading vault stats:', error);
      }
    };
    loadStats();
  }, []);

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
      handleTakeMessage();
    }
  }, []);

  const loadRandomMessage = async () => {
    try {
      const fbMessage = await messageService.getRandomMessage();
      if (fbMessage) {
        const message = convertFirebaseMessage(fbMessage);
        setCurrentMessage(message);
        // Increment messages taken counter
        await statsService.incrementMessagesTaken();
        // Update local stats
        setVaultStats(prev => ({
          ...prev,
          messagesTaken: prev.messagesTaken + 1
        }));
        return message;
      } else {
        // Fallback to a default message if Firebase is empty
        const fallbackMessage = {
          id: 'fallback',
          text: "You are stronger than you know, braver than you feel, and more loved than you can imagine.",
          signoff: "From the Message Vault team",
          tag: "Encouragement",
          hearts: 0
        };
        setCurrentMessage(fallbackMessage);
        return fallbackMessage;
      }
    } catch (error) {
      console.error('Error loading message:', error);
      // Fallback message on error
      const errorMessage = {
        id: 'error',
        text: "Even when technology fails us, human kindness endures. You matter, and your story isn't over.",
        signoff: "From someone who believes in resilience",
        tag: "Hope",
        hearts: 0
      };
      setCurrentMessage(errorMessage);
      return errorMessage;
    }
  };

  const handleTakeMessage = async () => {
    await loadRandomMessage();
    setCurrentState('revealing');
    
    // Transition to taking state after 3 simple phases (5s total)
    setTimeout(() => {
      setCurrentState('taking');
    }, 5000);
  };

  const handleTakeAnother = () => {
    // Start dramatic transition
    setCurrentState('transitioning');
    
    // Get new message after dramatic pause
    setTimeout(async () => {
      await loadRandomMessage();
      setCurrentState('revealing');
      
      // Move to taking state after simple 3 phases
      setTimeout(() => {
        setCurrentState('taking');
      }, 5000);
    }, 1500);
  };

  const handleLeaveMessage = async (newMessage: { text: string; tag: string; signoff: string }) => {
    try {
      const messageId = await messageService.addMessage(newMessage);
      if (messageId) {
        console.log('Message saved to Firebase with ID:', messageId);
        setCurrentState('thank-you');
        
        // Update local stats
        setVaultStats(prev => ({
          ...prev,
          messagesLeft: prev.messagesLeft + 1
        }));
        
        // Auto redirect after thank you
        setTimeout(async () => {
          await loadRandomMessage();
          setCurrentState('taking');
        }, 3000);
      } else {
        throw new Error('Failed to save message');
      }
    } catch (error) {
      console.error('Error saving message:', error);
      // Could add error state/notification here
      alert('Sorry, there was an error saving your message. Please try again.');
    }
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
                <VaultCounter messagesTaken={vaultStats.messagesTaken} messagesLeft={vaultStats.messagesLeft} />
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

        {/* Revealing State - Simple 3 Phases */}
        {currentState === 'revealing' && (
          <div className="min-h-screen relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-vault-deep-charcoal via-vault-deep-blue/40 to-vault-deep-charcoal" />

            {/* PHASE 1: Soul reaching out (0-2s) */}
            <div className="absolute inset-0 flex items-center justify-center z-30" style={{ animation: 'fadeInOut 2s ease-in-out forwards' }}>
              <div className="text-center px-4">
                <h2 className="text-2xl md:text-4xl lg:text-5xl text-vault-bone font-light tracking-wide">
                  Another soul is reaching out...
                </h2>
              </div>
            </div>

            {/* PHASE 2: Who it's from (2s-4s) */}
            <div className="absolute inset-0 flex items-center justify-center z-20" style={{ animation: 'fadeInOut 2s ease-in-out forwards', animationDelay: '2s' }}>
              <div className="text-center px-4">
                <div className="space-y-6">
                  <h2 className="text-2xl md:text-4xl lg:text-5xl text-vault-bone font-light tracking-wide">
                    This message comes from
                  </h2>
                  <h2 className="text-2xl md:text-4xl lg:text-5xl text-vault-coral font-light tracking-wide">
                    {currentMessage?.signoff}
                  </h2>
                </div>
              </div>
            </div>

            {/* PHASE 3: Message card (4s+) */}
            <div className="absolute inset-0 flex items-center justify-center z-10" style={{ animation: 'fadeIn 1s ease-out forwards', animationDelay: '4s', opacity: 0 }}>
              <div className="w-full max-w-5xl mx-auto px-4">
                <MessageCard 
                  message={currentMessage} 
                  onTakeAnother={handleTakeAnother}
                />
              </div>
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
              <a 
                href="https://billing.stripe.com/p/login/14kfZ49IJg8letOfYY" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-vault-coral transition-colors"
              >
                Manage subscription
              </a>
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