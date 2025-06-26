import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, Flame, Loader2 } from 'lucide-react';
import { candleService } from '../services/candles';

interface LightCandleFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const CATEGORIES = [
  { value: 'grief', label: 'Grief & Loss' },
  { value: 'anxiety', label: 'Anxiety & Depression' },
  { value: 'health', label: 'Health Challenges' },
  { value: 'relationships', label: 'Relationship Struggles' },
  { value: 'family', label: 'Family Issues' },
  { value: 'work', label: 'Work & Career' },
  { value: 'financial', label: 'Financial Stress' },
  { value: 'loneliness', label: 'Loneliness' },
  { value: 'addiction', label: 'Addiction & Recovery' },
  { value: 'other', label: 'Other' }
];

export function LightCandleForm({ onSuccess, onCancel }: LightCandleFormProps) {
  const [situation, setSituation] = useState('');
  const [category, setCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!situation.trim() || !category) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const candleId = await candleService.lightCandle({
        situation: situation.trim(),
        category
      });
      
      if (candleId) {
        onSuccess();
      } else {
        alert('Sorry, there was an error lighting your candle. Please try again.');
      }
    } catch (error) {
      console.error('Error lighting candle:', error);
      alert('Sorry, there was an error lighting your candle. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="bg-gradient-to-br from-vault-charcoal/98 via-vault-charcoal/95 to-amber-900/10 backdrop-blur-xl border border-yellow-500/20 shadow-2xl max-w-2xl w-full">
        <CardHeader className="text-center pb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Flame className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl md:text-3xl text-vault-bone font-light">
            Light a Candle for Support
          </CardTitle>
          <p className="text-vault-violet/80 text-lg leading-relaxed mt-4">
            Share what you're going through, and the community will send you light and encouragement. 
            Your candle will glow for 7 days.
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <label className="text-vault-bone text-sm font-medium">
                What are you going through? <span className="text-red-400">*</span>
              </label>
              <Textarea
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                placeholder="Share what's on your heart. The community wants to support you..."
                className="min-h-[120px] bg-vault-charcoal/50 border-vault-violet/30 text-vault-bone placeholder:text-vault-violet/50 resize-none"
                maxLength={500}
                required
              />
              <div className="text-right text-xs text-vault-violet/60">
                {situation.length}/500 characters
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-vault-bone text-sm font-medium">
                Category <span className="text-red-400">*</span>
              </label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger className="bg-vault-charcoal/50 border-vault-violet/30 text-vault-bone">
                  <SelectValue placeholder="Choose what best describes your situation" />
                </SelectTrigger>
                <SelectContent className="bg-vault-charcoal border-vault-violet/30">
                  {CATEGORIES.map((cat) => (
                    <SelectItem 
                      key={cat.value} 
                      value={cat.value}
                      className="text-vault-bone hover:bg-vault-violet/20"
                    >
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="bg-vault-sage/10 border border-vault-sage/20 rounded-lg p-4">
              <p className="text-vault-sage text-sm leading-relaxed">
                💡 Your message will be shared anonymously. The community will be able to send you encouragement 
                and light, but your identity remains private and safe.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                type="button"
                onClick={onCancel}
                variant="outline"
                className="flex-1 border-vault-violet/30 text-vault-violet hover:bg-vault-violet/10"
                disabled={isSubmitting}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white"
                disabled={isSubmitting || !situation.trim() || !category}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Lighting your candle...
                  </>
                ) : (
                  <>
                    <Flame className="w-4 h-4 mr-2" />
                    Light My Candle
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 