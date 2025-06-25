import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Heart } from 'lucide-react';

interface SupporterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const supportTiers = [
  {
    id: 'kindness',
    amount: '$3',
    name: 'Kindness',
    description: 'Help 10 people feel seen',
    features: ['Access to Supporter Wall', 'Warm fuzzy feelings'],
    stripeLink: 'https://buy.stripe.com/8x2eVeabkc7hbOzagc7EQ05'
  },
  {
    id: 'compassion', 
    amount: '$5',
    name: 'Compassion',
    description: 'Help 25 people find hope',
    features: ['All Kindness benefits', 'Premium message access', 'Save favorite messages'],
    stripeLink: 'https://buy.stripe.com/aFa4gA1EOdbl6uffAw7EQ04'
  },
  {
    id: 'healing',
    amount: '$10',
    name: 'Healing',
    description: 'Help 50 people through difficult times',
    features: ['All previous benefits', 'Early access to new features', 'Monthly gratitude letter'],
    stripeLink: 'https://buy.stripe.com/00wbJ26Z86MX4m7gEA7EQ03'
  }
];

export function SupporterModal({ isOpen, onClose }: SupporterModalProps) {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const handleSponsor = () => {
    if (selectedTier) {
      const tier = supportTiers.find(t => t.id === selectedTier);
      if (tier) {
        // Redirect to Stripe payment link
        window.open(tier.stripeLink, '_blank');
        onClose();
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-popover border-border/30 text-vault-bone max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center pb-6">
          <div className="mx-auto w-12 h-12 bg-gradient-to-br from-vault-coral to-vault-rosewood rounded-full flex items-center justify-center mb-4">
            <Heart className="w-6 h-6 text-vault-bone" />
          </div>
          <DialogTitle className="text-2xl text-vault-bone">Help keep this space alive</DialogTitle>
          <p className="tagline text-vault-violet max-w-md mx-auto">
            The Vault exists because of kind strangers like you. Your support helps more people feel seen and less alone.
          </p>
        </DialogHeader>

        <div className="space-y-4">
          {supportTiers.map((tier) => (
            <Card 
              key={tier.id}
              className={`cursor-pointer transition-all border-2 ${
                selectedTier === tier.id
                  ? 'border-vault-coral bg-vault-coral/10'
                  : 'border-border/30 bg-card/50 hover:border-vault-coral/50'
              }`}
              onClick={() => setSelectedTier(tier.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl text-vault-bone mb-1">{tier.name}</h3>
                    <p className="text-vault-violet text-sm">{tier.description}</p>
                  </div>
                  <div className="text-2xl text-vault-coral font-medium">
                    {tier.amount}
                  </div>
                </div>
                
                <ul className="space-y-2">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="text-sm text-vault-violet flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-vault-coral rounded-full flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-6">
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-vault-violet hover:bg-vault-violet/10"
          >
            Maybe later
          </Button>
          <Button
            onClick={handleSponsor}
            disabled={!selectedTier}
            className="flex-1 bg-vault-coral hover:bg-vault-coral/90 text-vault-charcoal disabled:opacity-50"
          >
            Sponsor the Vault
          </Button>
        </div>

        <p className="text-xs text-vault-violet/80 text-center pt-4">
          Payments processed securely. Cancel anytime. Your contribution helps keep The Message Vault free and accessible.
        </p>
      </DialogContent>
    </Dialog>
  );
} 