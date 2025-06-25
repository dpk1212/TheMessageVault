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
    <div className="w-full max-w-2xl mx-auto px-4">
      <Card className="bg-card/80 backdrop-blur-sm border-border/20 shadow-2xl">
        <CardHeader className="pb-6">
          <CardTitle className="text-center text-vault-bone">Leave a message</CardTitle>
          <p className="text-center tagline text-vault-violet">
            Write the words you wish someone had said to you.
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Message Text */}
            <div className="space-y-2">
              <Label htmlFor="message" className="text-vault-bone">Your message</Label>
              <Textarea
                id="message"
                value={messageText}
                onChange={(e) => handleMessageChange(e.target.value)}
                placeholder="Someone needs to hear what you have to say..."
                className={`min-h-32 resize-none bg-input-background border-border/30 text-vault-bone placeholder:text-vault-violet/60 focus:border-vault-coral/50 focus:ring-vault-coral/20 ${
                  showModerationError ? 'border-red-500/50' : ''
                }`}
                maxLength={500}
              />
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {showModerationError && moderationResult && (
                    <div className="flex items-center gap-1 text-red-400 text-xs">
                      <AlertCircle className="w-3 h-3" />
                      <span>Content flagged</span>
                    </div>
                  )}
                  {moderationResult && moderationResult.isApproved && (
                    <div className="flex items-center gap-1 text-green-400 text-xs">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Content approved</span>
                    </div>
                  )}
                </div>
                <div className="text-xs text-vault-violet">
                  {messageText.length}/500
                </div>
              </div>
              
              {/* Moderation Error Message */}
              {showModerationError && moderationResult?.reason && (
                <div className="mt-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-sm text-red-400 mb-2">
                    {moderationResult.reason}
                  </p>
                  {moderationResult.flaggedAttributes.length > 0 && (
                    <p className="text-xs text-red-300">
                      Flagged for: {moderationResult.flaggedAttributes.join(', ')}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Tag Selection */}
            <div className="space-y-2">
              <Label htmlFor="tag" className="text-vault-bone">Tag your message</Label>
              <Select value={selectedTag} onValueChange={setSelectedTag}>
                <SelectTrigger className="bg-input-background border-border/30 text-vault-bone focus:border-vault-coral/50 focus:ring-vault-coral/20">
                  <SelectValue placeholder="What kind of message is this?" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border/30">
                  {messageTags.map((tag) => (
                    <SelectItem 
                      key={tag} 
                      value={tag}
                      className="text-vault-bone focus:bg-vault-coral/20 focus:text-vault-bone"
                    >
                      {tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Signoff */}
            <div className="space-y-2">
              <Label htmlFor="signoff" className="text-vault-bone">Sign off as (optional)</Label>
              <div className="space-y-2">
                <Input
                  id="signoff"
                  value={signoff}
                  onChange={(e) => setSignoff(e.target.value)}
                  placeholder="From someone who cares"
                  className="bg-input-background border-border/30 text-vault-bone placeholder:text-vault-violet/60 focus:border-vault-coral/50 focus:ring-vault-coral/20"
                  maxLength={50}
                />
                <div className="flex flex-wrap gap-2">
                  {defaultSignoffs.map((defaultSignoff) => (
                    <button
                      key={defaultSignoff}
                      type="button"
                      onClick={() => setSignoff(defaultSignoff)}
                      className="text-xs px-2 py-1 rounded-full bg-vault-violet/20 text-vault-violet hover:bg-vault-violet/30 transition-colors"
                    >
                      {defaultSignoff}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={onCancel}
                className="text-vault-violet hover:bg-vault-violet/10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="flex-1 bg-vault-coral hover:bg-vault-coral/90 text-vault-charcoal disabled:opacity-50 disabled:cursor-not-allowed"
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