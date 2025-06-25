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
        setTimeout(() => heartElement.classList.remove('heart-bounce'), 300);
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
        // Fallback to clipboard
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
    <div className="w-full max-w-2xl mx-auto px-4">
      <Card className="bg-card/80 backdrop-blur-sm border-border/20 shadow-2xl card-glow message-card-enter glass-effect">
        <CardContent className="p-8 md:p-12">
          {/* Tag */}
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-vault-violet/20 text-vault-violet rounded-full text-xs tracking-wider uppercase slide-up">
              {message.tag}
            </span>
          </div>

          {/* Message Text */}
          <blockquote className="message-text text-vault-bone mb-8 leading-relaxed slide-up" style={{ animationDelay: '0.1s' }}>
            "{message.text}"
          </blockquote>

          {/* Signoff */}
          <div className="text-vault-violet mb-8 italic slide-up" style={{ animationDelay: '0.2s' }}>
            — {message.signoff}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleHeart}
                className={`flex items-center gap-2 hover:bg-vault-coral/10 transition-all duration-200 ${
                  hasLiked ? 'text-vault-coral' : 'text-vault-violet'
                }`}
              >
                <Heart 
                  className={`w-4 h-4 transition-all duration-200 ${hasLiked ? 'fill-current' : ''}`} 
                  data-heart={message.id}
                />
                <span>{heartCount} This helped</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="flex items-center gap-2 text-vault-violet hover:bg-vault-violet/10"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
              </Button>
            </div>

            <Button
              onClick={onTakeAnother}
              className="bg-vault-coral hover:bg-vault-coral/90 text-vault-charcoal flex items-center gap-2 button-glow"
            >
              <RotateCcw className="w-4 h-4" />
              Take another
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 