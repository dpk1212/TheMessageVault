import { Heart } from 'lucide-react';

interface Supporter {
  id: string;
  name: string;
  tier: 'kindness' | 'compassion' | 'healing';
  joinedDate: string;
}

const mockSupporters: Supporter[] = [
  { id: '1', name: 'Sarah M.', tier: 'healing', joinedDate: '2024-01-15' },
  { id: '2', name: 'Alex', tier: 'compassion', joinedDate: '2024-01-20' },
  { id: '3', name: 'Jordan K.', tier: 'kindness', joinedDate: '2024-01-22' },
  { id: '4', name: 'River', tier: 'healing', joinedDate: '2024-01-25' },
  { id: '5', name: 'Emma L.', tier: 'compassion', joinedDate: '2024-02-01' },
  { id: '6', name: 'Sam', tier: 'kindness', joinedDate: '2024-02-03' },
  { id: '7', name: 'Taylor R.', tier: 'healing', joinedDate: '2024-02-05' },
  { id: '8', name: 'Casey', tier: 'compassion', joinedDate: '2024-02-08' },
  { id: '9', name: 'Morgan P.', tier: 'kindness', joinedDate: '2024-02-10' },
  { id: '10', name: 'Avery', tier: 'healing', joinedDate: '2024-02-12' }
];

const tierColors = {
  kindness: 'text-vault-coral',
  compassion: 'text-vault-violet', 
  healing: 'text-vault-rosewood'
};

interface SupporterWallProps {
  supporters?: Supporter[];
}

export function SupporterWall({ supporters = mockSupporters }: SupporterWallProps) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="text-center mb-8">
        <h2 className="text-vault-bone mb-2">Vault Supporters</h2>
        <p className="tagline text-vault-violet">
          These kind souls help keep the vault alive
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {supporters.map((supporter) => (
          <div
            key={supporter.id}
            className="group text-center p-4 rounded-lg bg-card/30 hover:bg-card/50 transition-all duration-300 border border-border/20 hover:border-vault-coral/30"
          >
            <div className="w-10 h-10 mx-auto mb-2 bg-gradient-to-br from-vault-coral/20 to-vault-violet/20 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
              <Heart className={`w-4 h-4 ${tierColors[supporter.tier]}`} />
            </div>
            <div className="text-sm text-vault-bone mb-1">
              {supporter.name}
            </div>
            <div className={`text-xs capitalize ${tierColors[supporter.tier]}`}>
              {supporter.tier}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-vault-violet/80">
          Want to join them? 
          <button className="ml-1 text-vault-coral hover:text-vault-coral/80 underline">
            Become a supporter
          </button>
        </p>
      </div>
    </div>
  );
}