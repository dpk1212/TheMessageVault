import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { moderationService, ModerationResult } from '../services/moderation';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface LeaveMessageFormProps {
  onSubmit: (message: {
    text: string;
    tag: string;
    signoff: string;
  }) => void;
  onCancel: () => void;
}

const messageTags = [
  'Encouragement',
  'Loss',
  'Hope',
  'Starting over',
  'Healing',
  'Self-love',
  'Courage',
  'Gratitude'
];

const defaultSignoffs = [
  'From someone who gets it',
  'From a stranger who cares',
  'From someone healing',
  'From a fellow traveler',
  'From someone who believes in you',
  'From the quiet corner of hope'
];

export function LeaveMessageForm({ onSubmit, onCancel }: LeaveMessageFormProps) {
  const [messageText, setMessageText] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [signoff, setSignoff] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [moderationResult, setModerationResult] = useState<ModerationResult | null>(null);
  const [showModerationError, setShowModerationError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedTag) return;

    setIsSubmitting(true);
    setShowModerationError(false);
    
    try {
      // Check content with moderation service
      const modResult = await moderationService.moderateMessage(messageText.trim());
      setModerationResult(modResult);
      
      if (!modResult.isApproved) {
        setShowModerationError(true);
        setIsSubmitting(false);
        return;
      }
      
      // If approved, submit the message
      onSubmit({
        text: messageText.trim(),
        tag: selectedTag,
        signoff: signoff.trim() || 'From someone who cares'
      });
      
    } catch (error) {
      console.error('Error during moderation:', error);
      setShowModerationError(true);
      setModerationResult({
        isApproved: false,
        scores: { toxicity: 0, severeToxicity: 0, identityAttack: 0, insult: 0, profanity: 0, threat: 0 },
        flaggedAttributes: ['error'],
        reason: 'Unable to process your message right now. Please try again in a moment.'
      });
    }
    
    setIsSubmitting(false);
  };

  // Real-time content checking (debounced)
  const handleMessageChange = (value: string) => {
    setMessageText(value);
    setShowModerationError(false);
    setModerationResult(null);
  };

  const isValid = messageText.trim().length > 10 && selectedTag;

  return (
    <div className="w-full max-w-4xl mx-auto px-6">
      <Card className="bg-gradient-to-br from-vault-charcoal/98 via-vault-charcoal/95 to-vault-deep-blue/20 backdrop-blur-xl border border-vault-gold/15 shadow-2xl card-glow relative overflow-hidden">
        {/* Decorative corner elements */}
        <div className="absolute top-6 left-6 w-8 h-8 border-l-2 border-t-2 border-vault-gold/25 rounded-tl-md"></div>
        <div className="absolute top-6 right-6 w-8 h-8 border-r-2 border-t-2 border-vault-gold/25 rounded-tr-md"></div>
        <div className="absolute bottom-6 left-6 w-8 h-8 border-l-2 border-b-2 border-vault-gold/25 rounded-bl-md"></div>
        <div className="absolute bottom-6 right-6 w-8 h-8 border-r-2 border-b-2 border-vault-gold/25 rounded-br-md"></div>

        {/* Subtle background texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-vault-sage/3 via-transparent to-vault-coral/3 pointer-events-none"></div>

        <CardHeader className="pb-8 relative z-10">
          <CardTitle className="text-center text-vault-bone text-3xl font-light tracking-wide">Leave a Message</CardTitle>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-vault-gold to-transparent mx-auto my-4 opacity-60" />
          <p className="text-center tagline text-vault-violet/80 max-w-2xl mx-auto leading-relaxed">
            Write the words you wish someone had said to you in your darkest hour.
          </p>
        </CardHeader>
        
        <CardContent className="space-y-8 relative z-10 p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Message Text */}
            <div className="space-y-4">
              <Label htmlFor="message" className="text-vault-bone text-lg font-light tracking-wide">Your Message</Label>
              <Textarea
                id="message"
                value={messageText}
                onChange={(e) => handleMessageChange(e.target.value)}
                placeholder="Someone needs to hear what you have to say..."
                className={`min-h-40 resize-none bg-vault-charcoal/60 backdrop-blur-sm border-vault-gold/20 text-vault-bone placeholder:text-vault-violet/50 focus:border-vault-coral/40 focus:ring-vault-coral/20 focus:bg-vault-charcoal/80 transition-all duration-300 rounded-lg text-lg leading-relaxed ${
                  showModerationError ? 'border-red-400/50 bg-red-900/20' : ''
                }`}
                maxLength={500}
              />
              <div className="flex justify-between items-center pt-2">
                <div className="flex items-center gap-3">
                  {showModerationError && moderationResult && (
                    <div className="flex items-center gap-2 text-red-400 text-sm px-3 py-1 bg-red-900/20 rounded-full border border-red-400/20">
                      <AlertCircle className="w-4 h-4" />
                      <span>Content flagged</span>
                    </div>
                  )}
                  {moderationResult && moderationResult.isApproved && (
                    <div className="flex items-center gap-2 text-emerald-400 text-sm px-3 py-1 bg-emerald-900/20 rounded-full border border-emerald-400/20">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Content approved</span>
                    </div>
                  )}
                </div>
                <div className="text-sm text-vault-violet/70 font-light">
                  {messageText.length}/500
                </div>
              </div>
              
              {/* Enhanced Moderation Error Message */}
              {showModerationError && moderationResult?.reason && (
                <div className="mt-4 p-6 bg-red-900/20 border border-red-400/30 rounded-xl backdrop-blur-sm">
                  <p className="text-base text-red-300 mb-3 leading-relaxed">
                    {moderationResult.reason}
                  </p>
                  {moderationResult.flaggedAttributes.length > 0 && (
                    <p className="text-sm text-red-400/80 font-light">
                      Flagged for: {moderationResult.flaggedAttributes.join(', ')}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Enhanced Tag Selection */}
            <div className="space-y-4">
              <Label htmlFor="tag" className="text-vault-bone text-lg font-light tracking-wide">Tag Your Message</Label>
              <Select value={selectedTag} onValueChange={setSelectedTag}>
                <SelectTrigger className="bg-vault-charcoal/60 backdrop-blur-sm border-vault-gold/20 text-vault-bone focus:border-vault-coral/40 focus:ring-vault-coral/20 focus:bg-vault-charcoal/80 transition-all duration-300 rounded-lg h-12 text-lg">
                  <SelectValue placeholder="What kind of message is this?" />
                </SelectTrigger>
                <SelectContent className="bg-vault-charcoal/95 backdrop-blur-xl border-vault-gold/20 rounded-xl">
                  {messageTags.map((tag) => (
                    <SelectItem 
                      key={tag} 
                      value={tag}
                      className="text-vault-bone focus:bg-vault-coral/20 focus:text-vault-bone hover:bg-vault-coral/10 transition-colors text-lg font-light py-3"
                    >
                      {tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Enhanced Signoff */}
            <div className="space-y-4">
              <Label htmlFor="signoff" className="text-vault-bone text-lg font-light tracking-wide">Sign Off As <span className="text-vault-violet/60 text-sm">(optional)</span></Label>
              <div className="space-y-4">
                <Input
                  id="signoff"
                  value={signoff}
                  onChange={(e) => setSignoff(e.target.value)}
                  placeholder="From someone who cares"
                  className="bg-vault-charcoal/60 backdrop-blur-sm border-vault-gold/20 text-vault-bone placeholder:text-vault-violet/50 focus:border-vault-coral/40 focus:ring-vault-coral/20 focus:bg-vault-charcoal/80 transition-all duration-300 rounded-lg h-12 text-lg"
                  maxLength={50}
                />
                <div className="flex flex-wrap gap-3">
                  {defaultSignoffs.map((defaultSignoff) => (
                    <button
                      key={defaultSignoff}
                      type="button"
                      onClick={() => setSignoff(defaultSignoff)}
                      className="text-sm px-4 py-2 rounded-full bg-vault-violet/15 text-vault-violet hover:bg-vault-violet/25 hover:text-vault-coral transition-all duration-300 border border-vault-violet/20 hover:border-vault-coral/30 font-light"
                    >
                      {defaultSignoff}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Enhanced Actions */}
            <div className="flex flex-col sm:flex-row gap-6 pt-8 border-t border-vault-gold/10">
              <Button
                type="button"
                variant="ghost"
                onClick={onCancel}
                className="text-vault-violet/80 hover:bg-vault-violet/10 hover:text-vault-violet border border-vault-violet/20 hover:border-vault-violet/40 px-8 py-3 rounded-full font-light tracking-wide transition-all duration-300"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="flex-1 bg-gradient-to-r from-vault-coral to-vault-coral/90 hover:from-vault-coral/90 hover:to-vault-coral text-vault-charcoal disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 rounded-full font-light tracking-wide border border-vault-gold/20 button-glow transition-all duration-300"
              >
                {isSubmitting ? 'Adding to vault...' : 'Add to the vault'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 