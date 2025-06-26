import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Flame, Heart, ArrowLeft } from 'lucide-react';

interface CandleSuccessProps {
  onViewCandles: () => void;
  onBackToVault: () => void;
}

export function CandleSuccess({ onViewCandles, onBackToVault }: CandleSuccessProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="bg-gradient-to-br from-vault-charcoal/98 via-vault-charcoal/95 to-amber-900/10 backdrop-blur-xl border border-yellow-500/20 shadow-2xl max-w-2xl w-full">
        <CardContent className="p-8 text-center">
          {/* Animated Candle */}
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Flame className="w-10 h-10 text-white animate-pulse" />
          </div>
          
          <h2 className="text-2xl md:text-3xl text-vault-bone font-light mb-4">
            Your candle has been lit
          </h2>
          
          <p className="text-vault-violet/80 text-lg leading-relaxed mb-8">
            Your light now glows in the community. Others will see your candle and send you support, 
            letting you know you're not alone in this difficult time.
          </p>
          
          <div className="bg-vault-sage/10 border border-vault-sage/20 rounded-lg p-4 mb-8">
            <p className="text-vault-sage text-sm leading-relaxed">
              <Heart className="w-4 h-4 inline mr-2" />
              Your candle will remain lit for 7 days. The community can send you light and encouragement during this time.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={onViewCandles}
              className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white"
            >
              <Flame className="w-4 h-4 mr-2" />
              View All Candles
            </Button>
            
            <Button
              onClick={onBackToVault}
              variant="outline"
              className="flex-1 border-vault-violet/30 text-vault-violet hover:bg-vault-violet/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Vault
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 