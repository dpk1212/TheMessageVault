import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Heart, Share2, RotateCcw } from 'lucide-react';
import { messageService } from '../services/firebase';

interface MessageCardProps {
  message: {
    id: string;
    text: string;
    signoff: string;
    tag: string;
    hearts: number;
  };
  onTakeAnother: () => void;
}

export function MessageCard({ message, onTakeAnother }: MessageCardProps) {
  const [hasLiked, setHasLiked] = useState(false);
  const [heartCount, setHeartCount] = useState(message.hearts);
  const [isUpdatingHeart, setIsUpdatingHeart] = useState(false);

  const handleHeart = async () => {
    if (!hasLiked && !isUpdatingHeart) {
      setIsUpdatingHeart(true);
      try {
        const success = await messageService.addHeart(message.id);
        if (success) {
          setHasLiked(true);
          setHeartCount(prev => prev + 1);
          
          // Add heart bounce animation
          const heartElement = document.querySelector(`[data-heart-${message.id}]`);
          if (heartElement) {
            heartElement.classList.add('heart-bounce');
            setTimeout(() => heartElement.classList.remove('heart-bounce'), 500);
          }
        }
      } catch (error) {
        console.error('Error adding heart:', error);
      } finally {
        setIsUpdatingHeart(false);
      }
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'A message from The Message Vault',
          text: `"${message.text}" - ${message.signoff}`,
          url: window.location.href,
        });
      } catch (err) {
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`"${message.text}" - ${message.signoff}\n\nFrom The Message Vault`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-6">
      <Card className="bg-gradient-to-br from-vault-charcoal/98 via-vault-charcoal/95 to-vault-deep-blue/20 backdrop-blur-xl border border-vault-gold/15 shadow-2xl card-glow message-card-enter relative overflow-hidden">
        {/* Mobile-responsive decorative border elements */}
        <div className="absolute top-4 md:top-8 left-4 md:left-8 w-8 md:w-12 h-8 md:h-12 border-l-2 border-t-2 border-vault-gold/25 rounded-tl-lg"></div>
        <div className="absolute top-4 md:top-8 right-4 md:right-8 w-8 md:w-12 h-8 md:h-12 border-r-2 border-t-2 border-vault-gold/25 rounded-tr-lg"></div>
        <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 w-8 md:w-12 h-8 md:h-12 border-l-2 border-b-2 border-vault-gold/25 rounded-bl-lg"></div>
        <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 w-8 md:w-12 h-8 md:h-12 border-r-2 border-b-2 border-vault-gold/25 rounded-br-lg"></div>

        {/* Enhanced emotional background texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-vault-sage/3 via-transparent to-vault-coral/3 pointer-events-none"></div>
        
        {/* Additional emotional depth for mobile */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-vault-gold/5 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '6s' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-vault-coral/8 rounded-full blur-xl animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }}></div>

        <CardContent className="p-6 md:p-12 lg:p-16 relative z-10">
          {/* Mobile-responsive Category Tag */}
          <div className="mb-8 md:mb-10 text-center">
            <span className="inline-block px-4 md:px-6 py-2 md:py-3 bg-vault-coral/10 text-vault-coral border border-vault-coral/20 rounded-full text-xs md:text-sm tracking-widest uppercase font-light slide-up backdrop-blur-sm">
              {message.tag}
            </span>
          </div>

          {/* Mobile-optimized Message Content with Emotional Typography */}
          <div className="text-center space-y-8 md:space-y-12 mb-8 md:mb-12">
            <div className="relative">
              {/* Mobile-responsive quotation marks */}
              <div className="absolute -top-4 md:-top-8 -left-2 md:-left-6 text-4xl md:text-6xl lg:text-8xl text-vault-gold/15 font-serif leading-none select-none">"</div>
              <div className="absolute -bottom-8 md:-bottom-16 -right-2 md:-right-6 text-4xl md:text-6xl lg:text-8xl text-vault-gold/15 font-serif leading-none rotate-180 select-none">"</div>
              
              <blockquote className="text-xl md:text-2xl lg:text-3xl text-vault-bone leading-relaxed md:leading-loose relative z-10 max-w-5xl mx-auto px-4 md:px-8 lg:px-12 slide-up font-light" style={{ animationDelay: '0.1s' }}>
                {message.text}
              </blockquote>
            </div>

            {/* Mobile-responsive separator and attribution */}
            <div className="space-y-4 md:space-y-6 slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-12 md:w-20 h-px bg-gradient-to-r from-transparent via-vault-sage/60 to-transparent mx-auto"></div>
              <p className="text-vault-violet/90 italic text-lg md:text-xl font-light tracking-wide px-4">
                {message.signoff}
              </p>
            </div>
          </div>

          {/* Mobile-optimized Actions Section */}
          <div className="flex flex-col gap-6 md:gap-8 pt-6 md:pt-8 border-t border-vault-gold/8">
            <Button
              variant="ghost"
              size="lg"
              onClick={handleHeart}
              className={`group flex items-center justify-center gap-3 md:gap-4 transition-all duration-500 px-6 md:px-8 py-3 md:py-4 rounded-full border backdrop-blur-sm w-full max-w-md mx-auto ${
                hasLiked 
                  ? 'text-vault-coral border-vault-coral/30 bg-vault-coral/8' 
                  : 'text-vault-violet/70 border-vault-violet/20 hover:text-vault-coral hover:border-vault-coral/30 hover:bg-vault-coral/5'
              }`}
            >
              <Heart 
                className={`w-5 h-5 md:w-6 md:h-6 transition-all duration-500 ${
                  hasLiked 
                    ? 'text-vault-coral fill-current scale-110' 
                    : 'group-hover:scale-125'
                }`} 
                data-heart={message.id}
              />
              <span className="text-base md:text-lg font-light tracking-wide">
                {heartCount} {heartCount === 1 ? 'soul touched' : 'souls touched'}
              </span>
            </Button>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full">
              <Button
                variant="outline"
                size="lg"
                onClick={handleShare}
                className="flex-1 border-vault-sage/30 text-vault-sage hover:bg-vault-sage/8 hover:border-vault-sage/50 px-6 md:px-8 py-3 md:py-4 rounded-full font-light tracking-wide backdrop-blur-sm"
              >
                <Share2 className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
                <span className="hidden sm:inline">Share This Light</span>
                <span className="sm:hidden">Share</span>
              </Button>

              <Button
                onClick={onTakeAnother}
                size="lg"
                className="flex-1 bg-gradient-to-r from-vault-coral to-vault-coral/90 hover:from-vault-coral/90 hover:to-vault-coral text-vault-charcoal px-6 md:px-10 py-3 md:py-4 rounded-full font-light tracking-wide border border-vault-gold/20 button-glow"
              >
                <RotateCcw className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
                <span className="hidden sm:inline">Take another</span>
                <span className="sm:hidden">Take another</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 