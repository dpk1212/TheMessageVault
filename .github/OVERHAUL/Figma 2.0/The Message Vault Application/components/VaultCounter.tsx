interface VaultCounterProps {
  messagesTaken: number;
  messagesLeft: number;
}

export function VaultCounter({ messagesTaken, messagesLeft }: VaultCounterProps) {
  const total = messagesTaken + messagesLeft;
  const takenPercentage = (messagesTaken / total) * 100;

  return (
    <div className="text-center space-y-3">
      <div className="text-vault-violet text-sm tracking-wide">
        <span className="text-vault-coral">{messagesTaken.toLocaleString()}</span> messages taken
        <span className="mx-2">•</span>
        <span className="text-vault-bone">{messagesLeft.toLocaleString()}</span> left
      </div>
      
      {/* Progress visualization */}
      <div className="w-full max-w-xs mx-auto">
        <div className="h-1 bg-vault-violet/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-vault-coral to-vault-rosewood rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${takenPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}