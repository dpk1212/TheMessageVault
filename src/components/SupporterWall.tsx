import { useState, useEffect } from 'react';
import { Heart, TrendingUp, Tag, Users, BarChart3, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { statsService } from '../services/firebase';

interface MessageAnalytics {
  totalMessages: number;
  totalHearts: number;
  topCategories: { tag: string; count: number }[];
  topHeartedByCategory: { id: string; text: string; signoff: string; tag: string; hearts: number }[];
  topSignoffs: { signoff: string; count: number; avgHearts: number }[];
}

export function SupporterWall() {
  const [analytics, setAnalytics] = useState<MessageAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const data = await statsService.getMessageAnalytics();
        setAnalytics(data);
      } catch (error) {
        console.error('Error loading analytics:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-vault-coral to-vault-rosewood rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-vault-bone animate-pulse" />
          </div>
          <h2 className="text-vault-bone mb-2">Loading Community Insights...</h2>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-vault-coral to-vault-rosewood rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-vault-bone" />
          </div>
          <h2 className="text-vault-bone mb-2">Community Insights</h2>
          <p className="tagline text-vault-violet max-w-md mx-auto">
            Building our community, one message at a time. Check back soon for insights!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-vault-coral to-vault-rosewood rounded-full flex items-center justify-center mx-auto mb-4">
          <BarChart3 className="w-8 h-8 text-vault-bone" />
        </div>
        <h2 className="text-vault-bone mb-2">Community Insights</h2>
        <p className="tagline text-vault-violet max-w-md mx-auto">
          Discover the heart of our healing community through the messages that touch souls.
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-card/50 border-border/30">
          <CardContent className="p-4 text-center">
            <MessageCircle className="w-6 h-6 text-vault-coral mx-auto mb-2" />
            <div className="text-2xl font-light text-vault-bone">{analytics.totalMessages}</div>
            <div className="text-xs text-vault-violet uppercase tracking-wide">Total Messages</div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 border-border/30">
          <CardContent className="p-4 text-center">
            <Heart className="w-6 h-6 text-vault-coral mx-auto mb-2" />
            <div className="text-2xl font-light text-vault-bone">{analytics.totalHearts}</div>
            <div className="text-xs text-vault-violet uppercase tracking-wide">Total Hearts</div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 border-border/30">
          <CardContent className="p-4 text-center">
            <Tag className="w-6 h-6 text-vault-sage mx-auto mb-2" />
            <div className="text-2xl font-light text-vault-bone">{analytics.topCategories.length}</div>
            <div className="text-xs text-vault-violet uppercase tracking-wide">Categories</div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 border-border/30">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-6 h-6 text-vault-gold mx-auto mb-2" />
            <div className="text-2xl font-light text-vault-bone">
              {Math.round(analytics.totalHearts / analytics.totalMessages * 10) / 10}
            </div>
            <div className="text-xs text-vault-violet uppercase tracking-wide">Avg Hearts</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Top Categories */}
        <Card className="bg-card/50 border-border/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-vault-bone">
              <Tag className="w-5 h-5 text-vault-sage" />
              Popular Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.topCategories.map((category, index) => (
                <div key={category.tag} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-vault-sage/20 flex items-center justify-center text-xs text-vault-sage font-medium">
                      {index + 1}
                    </div>
                    <span className="text-vault-bone font-medium">{category.tag}</span>
                  </div>
                  <div className="text-vault-violet">{category.count} messages</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Signoffs */}
        <Card className="bg-card/50 border-border/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-vault-bone">
              <Users className="w-5 h-5 text-vault-coral" />
              Beloved Messengers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.topSignoffs.map((signoff, index) => (
                <div key={signoff.signoff} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-vault-coral/20 flex items-center justify-center text-xs text-vault-coral font-medium">
                      {index + 1}
                    </div>
                    <span className="text-vault-bone text-sm italic">"{signoff.signoff}"</span>
                  </div>
                  <div className="text-vault-violet text-sm">
                    {signoff.avgHearts} ♥ avg
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Most Hearted Messages */}
      {analytics.topHeartedByCategory.length > 0 && (
        <Card className="bg-card/50 border-border/30 mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-vault-bone">
              <Heart className="w-5 h-5 text-vault-coral" />
              Most Cherished Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {analytics.topHeartedByCategory.slice(0, 6).map((message) => (
                <div key={message.id} className="p-4 bg-vault-charcoal/30 rounded-lg border border-vault-gold/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-vault-sage font-medium bg-vault-sage/10 px-2 py-1 rounded">
                      {message.tag}
                    </span>
                    <div className="flex items-center gap-1 text-vault-coral">
                      <Heart className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium">{message.hearts}</span>
                    </div>
                  </div>
                  <p className="text-vault-bone text-sm leading-relaxed mb-2 line-clamp-3">
                    "{message.text}"
                  </p>
                  <p className="text-xs text-vault-violet italic">
                    — {message.signoff}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="text-center mt-8">
        <p className="text-sm text-vault-violet">
          Every message shared creates ripples of healing in our community.
        </p>
      </div>
    </div>
  );
} 