interface VaultCounterProps {
  messagesTaken: number;
  messagesLeft: number;
}

export function VaultCounter({ messagesTaken, messagesLeft }: VaultCounterProps) {
  const connectionPercentage = 74; // Enhanced visualization

  return (
    <div className="relative mx-auto max-w-2xl">
      {/* Sophisticated container with elegant design */}
      <div className="bg-gradient-to-br from-vault-charcoal/90 via-vault-charcoal/80 to-vault-deep-blue/40 backdrop-blur-xl border border-vault-gold/20 rounded-2xl p-8 md:p-12 glass-effect relative overflow-hidden fade-in">
        {/* Subtle background decorations */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-vault-coral/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-vault-sage/5 rounded-full blur-2xl"></div>
        
        {/* Delicate corner accents */}
        <div className="absolute top-4 left-4 w-8 h-8 border-l border-t border-vault-gold/25 rounded-tl-md"></div>
        <div className="absolute top-4 right-4 w-8 h-8 border-r border-t border-vault-gold/25 rounded-tr-md"></div>
        <div className="absolute bottom-4 left-4 w-8 h-8 border-l border-b border-vault-gold/25 rounded-bl-md"></div>
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r border-b border-vault-gold/25 rounded-br-md"></div>

        <div className="relative z-10 text-center space-y-8">
          {/* Clean Statistics Display - NO ANIMATIONS */}
          <div className="grid grid-cols-2 gap-8 md:gap-16">
            <div className="space-y-3">
              <div className="text-4xl md:text-5xl font-light text-vault-bone tracking-wide">
                {messagesTaken.toLocaleString()}
              </div>
              <div className="text-sm text-vault-violet/80 uppercase tracking-widest font-light">
                messages taken
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-4xl md:text-5xl font-light text-vault-bone tracking-wide">
                {messagesLeft.toLocaleString()}
              </div>
              <div className="text-sm text-vault-violet/80 uppercase tracking-widest font-light">
                messages left
              </div>
            </div>
          </div>

          {/* Clean separator */}
          <div className="flex items-center justify-center space-x-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-vault-gold/60"></div>
            <div className="w-2 h-2 rounded-full bg-vault-gold/60"></div>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-vault-gold/60"></div>
          </div>

          {/* Clean Connection Visualization */}
          <div className="space-y-5">
            <div className="flex items-center justify-center gap-3 text-vault-violet/80 font-light tracking-wide">
              <div className="w-2 h-2 rounded-full bg-vault-coral"></div>
              <span className="text-base md:text-lg">
                {connectionPercentage}% of messages have found their person
              </span>
            </div>
            
            {/* Clean progress visualization */}
            <div className="relative max-w-md mx-auto">
              <div className="w-full bg-vault-charcoal/60 rounded-full h-3 overflow-hidden border border-vault-gold/20">
                <div 
                  className="h-full bg-gradient-to-r from-vault-coral to-vault-coral/80 rounded-full"
                  style={{ width: `${connectionPercentage}%` }}
                >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 