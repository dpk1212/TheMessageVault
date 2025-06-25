interface VaultCounterProps {
  messagesTaken: number;
  messagesLeft: number;
}

export function VaultCounter({ messagesTaken, messagesLeft }: VaultCounterProps) {
  const total = messagesTaken + messagesLeft;
  const takenPercentage = (messagesTaken / total) * 100;

  return (
    <div className="text-center space-y-3 fade-in">
      <div className="text-vault-violet text-sm tracking-wide">
        <span className="text-vault-coral font-medium text-shimmer">{messagesTaken.toLocaleString()}</span> messages taken
        <span className="mx-2 pulse-gentle">•</span>
        <span className="text-vault-bone font-medium">{messagesLeft.toLocaleString()}</span> left
      </div>
      
      {/* Enhanced progress visualization */}
      <div className="w-full max-w-xs mx-auto">
        <div className="h-1.5 bg-vault-violet/20 rounded-full overflow-hidden glass-effect">
          <div 
            className="h-full bg-gradient-to-r from-vault-coral via-vault-warm-coral to-vault-rosewood rounded-full transition-all duration-1000 ease-out shadow-sm"
            style={{ width: `${takenPercentage}%` }}
          />
        </div>
        <div className="text-xs text-vault-violet/60 mt-1">
          {Math.round(takenPercentage)}% of messages have found their person
        </div>
      </div>
    </div>
  );
} 