import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Heart, Share2, RotateCcw } from 'lucide-react';

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

  const handleHeart = () => {
    if (!hasLiked) {
      setHasLiked(true);
      setHeartCount(prev => prev + 1);
      
      // Add heart bounce animation
      const heartElement = document.querySelector(`[data-heart-${message.id}]`);
      if (heartElement) {
        heartElement.classList.add('heart-bounce');
        setTimeout(() => heartElement.classList.remove('heart-bounce'), 500);
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
    <div className="w-full max-w-4xl mx-auto px-6">
      <Card className="bg-gradient-to-br from-vault-charcoal/98 via-vault-charcoal/95 to-vault-deep-blue/20 backdrop-blur-xl border border-vault-gold/15 shadow-2xl card-glow message-card-enter relative overflow-hidden">
        {/* Decorative border elements */}
        <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-vault-gold/25 rounded-tl-lg"></div>
        <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-vault-gold/25 rounded-tr-lg"></div>
        <div className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-vault-gold/25 rounded-bl-lg"></div>
        <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-vault-gold/25 rounded-br-lg"></div>

        {/* Subtle background texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-vault-sage/3 via-transparent to-vault-coral/3 pointer-events-none"></div>

        <CardContent className="p-12 md:p-16 relative z-10">
          {/* Category Tag */}
          <div className="mb-10 text-center">
            <span className="inline-block px-6 py-3 bg-vault-coral/10 text-vault-coral border border-vault-coral/20 rounded-full text-sm tracking-widest uppercase font-light slide-up backdrop-blur-sm">
              {message.tag}
            </span>
          </div>

          {/* Message Content with Enhanced Typography */}
          <div className="text-center space-y-12 mb-12">
            <div className="relative">
              {/* Elegant quotation marks */}
              <div className="absolute -top-8 -left-6 text-8xl text-vault-gold/15 font-serif leading-none select-none">"</div>
              <div className="absolute -bottom-16 -right-6 text-8xl text-vault-gold/15 font-serif leading-none rotate-180 select-none">"</div>
              
              <blockquote className="message-text text-vault-bone leading-loose relative z-10 max-w-4xl mx-auto px-12 slide-up" style={{ animationDelay: '0.1s' }}>
                {message.text}
              </blockquote>
            </div>

            {/* Elegant separator and attribution */}
            <div className="space-y-6 slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-vault-sage/60 to-transparent mx-auto"></div>
              <p className="text-vault-violet/90 italic text-xl font-light tracking-wide">
                {message.signoff}
              </p>
            </div>
          </div>

          {/* Enhanced Actions Section */}
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between pt-8 border-t border-vault-gold/8">
            <Button
              variant="ghost"
              size="lg"
              onClick={handleHeart}
              className={`group flex items-center gap-4 transition-all duration-500 px-8 py-4 rounded-full border backdrop-blur-sm ${
                hasLiked 
                  ? 'text-vault-coral border-vault-coral/30 bg-vault-coral/8' 
                  : 'text-vault-violet/70 border-vault-violet/20 hover:text-vault-coral hover:border-vault-coral/30 hover:bg-vault-coral/5'
              }`}
            >
              <Heart 
                className={`w-6 h-6 transition-all duration-500 ${
                  hasLiked 
                    ? 'text-vault-coral fill-current scale-110' 
                    : 'group-hover:scale-125'
                }`} 
                data-heart={message.id}
              />
              <span className="text-lg font-light tracking-wide">
                {heartCount} {heartCount === 1 ? 'soul touched' : 'souls touched'}
              </span>
            </Button>

            <div className="flex gap-6">
              <Button
                variant="outline"
                size="lg"
                onClick={handleShare}
                className="border-vault-sage/30 text-vault-sage hover:bg-vault-sage/8 hover:border-vault-sage/50 px-8 py-4 rounded-full font-light tracking-wide backdrop-blur-sm"
              >
                <Share2 className="w-5 h-5 mr-3" />
                Share This Light
              </Button>

              <Button
                onClick={onTakeAnother}
                size="lg"
                className="bg-gradient-to-r from-vault-coral to-vault-coral/90 hover:from-vault-coral/90 hover:to-vault-coral text-vault-charcoal px-10 py-4 rounded-full font-light tracking-wide border border-vault-gold/20 button-glow"
              >
                <RotateCcw className="w-5 h-5 mr-3" />
                Continue Journey
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 