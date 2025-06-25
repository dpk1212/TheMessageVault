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
    
    // Transition to taking state after just 2 phases (4.5s total)
    setTimeout(() => {
      setCurrentState('taking');
    }, 4500);
  };

  const handleTakeAnother = () => {
    // Start dramatic transition
    setCurrentState('transitioning');
    
    // Get new message after dramatic pause
    setTimeout(async () => {
      await loadRandomMessage();
      setCurrentState('revealing');
      
      // Move to taking state after just 2 phases
      setTimeout(() => {
        setCurrentState('taking');
      }, 4500);
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
        
        {/* Much more subtle floating elements - no constant blinking */}
        <div className="absolute top-1/4 left-1/5 w-1 h-1 bg-vault-gold/10 rounded-full" />
        <div className="absolute top-3/5 right-1/4 w-0.5 h-0.5 bg-vault-coral/15 rounded-full" />
        <div className="absolute bottom-1/3 left-3/4 w-1 h-1 bg-vault-sage/10 rounded-full" />
      </div>

      {/* Elegant border frame */}
      <div className="fixed inset-4 border border-vault-coral/10 rounded-lg pointer-events-none z-10" />
      <div className="fixed inset-8 border border-vault-gold/5 rounded-md pointer-events-none z-10" />

      <div className="relative z-10">
        {/* Landing State - STUNNING PROFESSIONAL DESIGN */}
        {currentState === 'landing' && (
          <div className="min-h-screen flex flex-col justify-center px-4 md:px-6 text-center relative">
            {/* WORLD-CLASS HERO SECTION */}
            <div className="w-full max-w-7xl mx-auto space-y-16 md:space-y-20 pt-8 md:pt-16">
              
              {/* MAGNIFICENT TITLE SECTION */}
              <div className="space-y-8 md:space-y-12">
                <div className="relative">
                  <h1 className="text-6xl md:text-8xl lg:text-9xl text-vault-bone font-extralight tracking-widest leading-none px-2 relative z-10">
                    The Message Vault
                  </h1>
                  {/* Elegant golden glow */}
                  <div className="absolute inset-0 text-6xl md:text-8xl lg:text-9xl text-vault-gold/15 font-extralight tracking-widest leading-none px-2 blur-md">
                    The Message Vault
                  </div>
                </div>
                
                {/* Refined golden accent line */}
                <div className="flex items-center justify-center space-x-6">
                  <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-vault-gold/70"></div>
                  <div className="w-3 h-3 rounded-full bg-vault-gold/70"></div>
                  <div className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-vault-gold/70"></div>
                </div>
              </div>
              
              {/* ELEVATED MESSAGING */}
              <div className="space-y-8 md:space-y-12">
                <p className="text-2xl md:text-3xl lg:text-4xl text-vault-bone font-light max-w-5xl mx-auto leading-relaxed px-4">
                  A sanctuary for anonymous kindness, where words become bridges between hearts.
                </p>
                <p className="text-xl md:text-2xl text-vault-violet/90 max-w-4xl mx-auto font-light leading-relaxed px-4">
                  Take a message when you need hope. Leave one when you have love to give.
                </p>
              </div>
              
              {/* PREMIUM COUNTER SECTION */}
              <div className="py-12 md:py-16">
                <VaultCounter messagesTaken={vaultStats.messagesTaken} messagesLeft={vaultStats.messagesLeft} />
              </div>
              
              {/* PROMINENT DUAL ACTION BUTTONS */}
              <div className="space-y-12 md:space-y-16 pb-16 md:pb-24">
                <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
                  {/* TAKE A MESSAGE BUTTON */}
                  <Button
                    onClick={handleTakeMessage}
                    size="lg"
                    className="w-full bg-gradient-to-r from-vault-coral via-vault-coral to-vault-coral/90 hover:from-vault-coral/95 hover:to-vault-coral text-vault-charcoal px-12 md:px-16 py-6 md:py-8 text-xl md:text-2xl group rounded-full font-light tracking-wide border-2 border-vault-gold/40 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500"
                  >
                    Take a Message
                    <ArrowDown className="ml-4 w-6 h-6 md:w-7 md:h-7 group-hover:translate-y-2 transition-all duration-500" />
                  </Button>
                  
                  {/* LEAVE A MESSAGE BUTTON */}
                  <Button
                    onClick={() => setCurrentState('leaving')}
                    size="lg"
                    variant="outline"
                    className="w-full bg-gradient-to-r from-vault-deep-charcoal/80 to-vault-deep-charcoal/60 hover:from-vault-deep-charcoal/90 hover:to-vault-deep-charcoal/70 text-vault-bone hover:text-vault-bone px-12 md:px-16 py-6 md:py-8 text-xl md:text-2xl group rounded-full font-light tracking-wide border-2 border-vault-sage/60 hover:border-vault-sage/80 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500"
                  >
                    Leave a Message
                    <Heart className="ml-4 w-6 h-6 md:w-7 md:h-7 group-hover:scale-110 transition-all duration-500" />
                  </Button>
                </div>
                
                {/* Refined instruction */}
                <p className="text-lg md:text-xl text-vault-violet/80 font-light tracking-wide">
                  Choose your path to healing
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Transitioning State - Simple Dark Pause */}
        {currentState === 'transitioning' && (
          <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
            {/* Simple dark background */}
            <div className="absolute inset-0 bg-gradient-to-b from-vault-deep-charcoal via-vault-deep-charcoal to-vault-deep-charcoal" />
            
            {/* Just a simple loading indicator */}
            <div className="relative z-10 text-center px-4">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-vault-coral rounded-full animate-pulse" style={{ animationDuration: '1.5s' }} />
                <div className="w-2 h-2 bg-vault-coral rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationDelay: '0.5s' }} />
                <div className="w-2 h-2 bg-vault-coral rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationDelay: '1s' }} />
              </div>
            </div>
          </div>
        )}

        {/* Revealing State - Simple 3 Phases */}
        {currentState === 'revealing' && (
          <div className="min-h-screen relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-vault-deep-charcoal via-vault-deep-blue/40 to-vault-deep-charcoal" />

            {/* PHASE 1: Soul reaching out (0-2s) - COMPLETELY FADES OUT */}
            <div className="absolute inset-0 flex items-center justify-center z-30" style={{ animation: 'fadeInOut 2s ease-in-out forwards' }}>
              <div className="text-center px-4">
                <h2 className="text-2xl md:text-4xl lg:text-5xl text-vault-bone font-light tracking-wide">
                  Another soul is reaching out...
                </h2>
              </div>
            </div>

            {/* PHASE 2: Who it's from (2.5s-4.5s) - STARTS AFTER PHASE 1 IS GONE */}
            <div className="absolute inset-0 flex items-center justify-center z-20" style={{ animation: 'fadeInOut 2s ease-in-out forwards', animationDelay: '2.5s', opacity: 0 }}>
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

            {/* PHASE 3: SKIP THE GLITCHY TRANSITION - GO STRAIGHT TO TAKING STATE */}
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