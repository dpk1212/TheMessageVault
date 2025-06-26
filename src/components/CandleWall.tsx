import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Flame, Heart, MessageCircle, ArrowLeft, Send, Loader2 } from 'lucide-react';
import { candleService, type SupportCandle } from '../services/candles';

interface CandleWallProps {
  onBackToVault: () => void;
  onLightCandle: () => void;
}

export function CandleWall({ onBackToVault, onLightCandle }: CandleWallProps) {
  const [candles, setCandles] = useState<SupportCandle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCandle, setSelectedCandle] = useState<SupportCandle | null>(null);
  const [supportMessage, setSupportMessage] = useState('');
  const [sendingSupport, setSendingSupport] = useState(false);
  const [supportedCandles, setSupportedCandles] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadCandles();
  }, []);

  const loadCandles = async () => {
    setLoading(true);
    try {
      const candleData = await candleService.getActiveCandles();
      setCandles(candleData);
      
      // Check which candles user has already supported
      const supportedSet = new Set<string>();
      for (const candle of candleData) {
        const hasSupported = await candleService.hasUserSupported(candle.id);
        if (hasSupported) {
          supportedSet.add(candle.id);
        }
      }
      setSupportedCandles(supportedSet);
    } catch (error) {
      console.error('Error loading candles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendLight = async (candleId: string) => {
    try {
      const success = await candleService.sendLight(candleId);
      if (success) {
        setSupportedCandles(prev => new Set([...prev, candleId]));
        // Update the candle's light count locally
        setCandles(prev => prev.map(candle => 
          candle.id === candleId 
            ? { ...candle, lightsSent: candle.lightsSent + 1 }
            : candle
        ));
      }
    } catch (error) {
      console.error('Error sending light:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!selectedCandle || !supportMessage.trim()) return;
    
    setSendingSupport(true);
    try {
      const success = await candleService.sendMessage(selectedCandle.id, supportMessage.trim());
      if (success) {
        setSupportedCandles(prev => new Set([...prev, selectedCandle.id]));
        // Update the candle's message count locally
        setCandles(prev => prev.map(candle => 
          candle.id === selectedCandle.id 
            ? { ...candle, messagesReceived: candle.messagesReceived + 1 }
            : candle
        ));
        setSelectedCandle(null);
        setSupportMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSendingSupport(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    const iconMap: Record<string, string> = {
      'grief': '💔',
      'anxiety': '🌧️',
      'health': '🏥',
      'relationships': '💙',
      'family': '👨‍👩‍👧‍👦',
      'work': '💼',
      'financial': '💰',
      'loneliness': '🫂',
      'addiction': '🔗',
      'other': '💫'
    };
    return iconMap[category] || '💫';
  };

  const formatTimeAgo = (timestamp: any) => {
    const now = new Date();
    const then = timestamp.toDate();
    const diffMs = now.getTime() - then.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  return (
    <div className="min-h-screen">
      <header className="text-center py-8 px-4">
        <h1 className="text-3xl md:text-4xl text-vault-bone font-light mb-4">
          Community Candle Wall
        </h1>
        <p className="text-vault-violet/80 text-lg max-w-2xl mx-auto leading-relaxed">
          Each candle represents someone who needs support. Send them light and encouragement 
          to let them know they're not alone.
        </p>
      </header>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Loader2 className="w-8 h-8 text-vault-coral animate-spin mx-auto mb-4" />
            <p className="text-vault-violet">Loading candles...</p>
          </div>
        </div>
      ) : (
        <main className="pb-12 px-4">
          {candles.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 opacity-50">
                <Flame className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl text-vault-bone mb-4">No candles are currently lit</h3>
              <p className="text-vault-violet/80 mb-8">Be the first to light a candle and ask for support.</p>
              <Button
                onClick={onLightCandle}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white"
              >
                <Flame className="w-4 h-4 mr-2" />
                Light a Candle
              </Button>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="text-center mb-8">
                <Button
                  onClick={onLightCandle}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white mb-6"
                >
                  <Flame className="w-4 h-4 mr-2" />
                  Light Your Own Candle
                </Button>
                <p className="text-sm text-vault-violet/60">
                  {candles.length} candle{candles.length !== 1 ? 's' : ''} currently glowing
                </p>
              </div>

              <div className="grid gap-6">
                {candles.map((candle) => (
                  <Card 
                    key={candle.id} 
                    className="bg-gradient-to-br from-vault-charcoal/95 via-vault-charcoal/90 to-amber-900/5 backdrop-blur-xl border border-yellow-500/20 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        {/* Candle Icon */}
                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                          <Flame className="w-6 h-6 text-white" />
                        </div>
                        
                        <div className="flex-1">
                          {/* Category and Time */}
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-lg">{getCategoryIcon(candle.category)}</span>
                            <span className="text-vault-sage text-sm">
                              {candle.category.charAt(0).toUpperCase() + candle.category.slice(1)}
                            </span>
                            <span className="text-vault-violet/60 text-xs">
                              {formatTimeAgo(candle.timestamp)}
                            </span>
                          </div>
                          
                          {/* Situation */}
                          <p className="text-vault-bone leading-relaxed mb-4">
                            {candle.situation}
                          </p>
                          
                          {/* Support Stats */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-6 text-sm">
                              <div className="flex items-center gap-1 text-yellow-400">
                                <Flame className="w-4 h-4" />
                                <span>{candle.lightsSent} lights</span>
                              </div>
                              <div className="flex items-center gap-1 text-vault-sage">
                                <MessageCircle className="w-4 h-4" />
                                <span>{candle.messagesReceived} messages</span>
                              </div>
                            </div>
                            
                            {/* Support Actions */}
                            <div className="flex items-center gap-2">
                              {supportedCandles.has(candle.id) ? (
                                <span className="text-vault-sage text-sm flex items-center gap-1">
                                  <Heart className="w-4 h-4" />
                                  Supported
                                </span>
                              ) : (
                                <>
                                  <Button
                                    onClick={() => handleSendLight(candle.id)}
                                    size="sm"
                                    className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/30"
                                  >
                                    <Flame className="w-3 h-3 mr-1" />
                                    Send Light
                                  </Button>
                                  <Button
                                    onClick={() => setSelectedCandle(candle)}
                                    size="sm"
                                    variant="outline"
                                    className="border-vault-sage/30 text-vault-sage hover:bg-vault-sage/10"
                                  >
                                    <MessageCircle className="w-3 h-3 mr-1" />
                                    Send Message
                                  </Button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          {/* Back to Vault Button */}
          <div className="text-center mt-12">
            <Button
              onClick={onBackToVault}
              variant="outline"
              className="border-vault-violet/30 text-vault-violet hover:bg-vault-violet/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Message Vault
            </Button>
          </div>
        </main>
      )}

      {/* Send Message Dialog */}
      <Dialog open={selectedCandle !== null} onOpenChange={() => setSelectedCandle(null)}>
        <DialogContent className="bg-vault-charcoal border-vault-violet/30 text-vault-bone max-w-md">
          <DialogHeader>
            <DialogTitle className="text-vault-bone">Send Encouragement</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-vault-sage/10 border border-vault-sage/20 rounded-lg p-3">
              <p className="text-vault-sage text-sm">
                Send this person a message of support and encouragement. Your message will be delivered anonymously.
              </p>
            </div>
            
            <Textarea
              value={supportMessage}
              onChange={(e) => setSupportMessage(e.target.value)}
              placeholder="Write your message of support and encouragement..."
              className="min-h-[100px] bg-vault-charcoal/50 border-vault-violet/30 text-vault-bone placeholder:text-vault-violet/50"
              maxLength={300}
            />
            
            <div className="text-right text-xs text-vault-violet/60">
              {supportMessage.length}/300 characters
            </div>
            
            <div className="flex gap-3 pt-2">
              <Button
                onClick={() => setSelectedCandle(null)}
                variant="outline"
                className="flex-1 border-vault-violet/30 text-vault-violet hover:bg-vault-violet/10"
                disabled={sendingSupport}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSendMessage}
                className="flex-1 bg-vault-sage hover:bg-vault-sage/90 text-vault-charcoal"
                disabled={!supportMessage.trim() || sendingSupport}
              >
                {sendingSupport ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Send className="w-4 h-4 mr-2" />
                )}
                Send Support
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 