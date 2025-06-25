import { Heart, Users } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const supporters = [
  { name: 'Sarah M.', tier: 'Healing', message: 'This space has given me so much hope. Proud to support it.' },
  { name: 'Alex K.', tier: 'Compassion', message: 'Messages here got me through my darkest days.' },
  { name: 'Jordan P.', tier: 'Kindness', message: 'Small acts of kindness change everything.' },
  { name: 'Maya L.', tier: 'Healing', message: 'Supporting because everyone deserves to feel seen.' },
  { name: 'Chris W.', tier: 'Compassion', message: 'The messages here remind me I\'m not alone.' },
  { name: 'Robin T.', tier: 'Kindness', message: 'Happy to help keep this beautiful space alive.' },
  { name: 'Sam D.', tier: 'Healing', message: 'This community has been a lifeline for me.' },
  { name: 'Taylor H.', tier: 'Compassion', message: 'Words have power. Thank you for sharing yours.' }
];

const tierColors = {
  'Kindness': 'text-vault-violet',
  'Compassion': 'text-vault-coral',
  'Healing': 'text-vault-rosewood'
};

export function SupporterWall() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-vault-coral to-vault-rosewood rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-vault-bone" />
        </div>
        <h2 className="text-vault-bone mb-2">Supporter Wall</h2>
        <p className="tagline text-vault-violet max-w-md mx-auto">
          These kind souls help keep The Message Vault free and accessible for everyone.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {supporters.map((supporter, index) => (
          <Card key={index} className="bg-card/50 border-border/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-vault-coral/20 to-vault-rosewood/20 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-vault-coral" />
                </div>
                <div>
                  <div className="text-vault-bone font-medium">{supporter.name}</div>
                  <div className={`text-xs ${tierColors[supporter.tier as keyof typeof tierColors]}`}>
                    {supporter.tier} Supporter
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-vault-violet italic">
                "{supporter.message}"
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-vault-violet">
          Want to join them? Your support helps more people feel heard and less alone.
        </p>
      </div>
    </div>
  );
} 