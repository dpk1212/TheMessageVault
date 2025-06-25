import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { analyticsService } from '../services/firebase';
import { Users, Eye, Heart, MessageSquare, Clock, TrendingUp } from 'lucide-react';

interface AnalyticsData {
  totalVisitors: number;
  totalMessagesViewed: number;
  totalHeartsGiven: number;
  totalMessagesLeft: number;
  avgTimeOnSite: number;
  avgMessagesPerVisitor: number;
  engagementRate: number;
  topReferrers: Array<{ referrer: string; visitors: number }>;
  popularTags: Array<{ tag: string; views: number }>;
  sessions: Array<any>;
  interactions: Array<any>;
}

export function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState(7);

  useEffect(() => {
    loadAnalytics();
  }, [selectedPeriod]);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const data = await analyticsService.getVisitorAnalytics(selectedPeriod);
      setAnalytics(data);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-vault-deep-charcoal p-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-vault-bone text-xl">Loading analytics...</div>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="min-h-screen bg-vault-deep-charcoal p-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-vault-coral text-xl">Failed to load analytics data</div>
          <Button onClick={loadAnalytics} className="mt-4">Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-vault-deep-charcoal p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-light text-vault-bone mb-4">
            The Message Vault Analytics
          </h1>
          <div className="flex gap-2 mb-6">
            {[7, 30, 90].map((days) => (
              <Button
                key={days}
                variant={selectedPeriod === days ? "default" : "outline"}
                onClick={() => setSelectedPeriod(days)}
                size="sm"
              >
                Last {days} days
              </Button>
            ))}
            <Button onClick={loadAnalytics} variant="outline" size="sm">
              Refresh
            </Button>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-vault-charcoal/50 border-vault-gold/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-vault-violet flex items-center gap-2">
                <Users className="w-4 h-4" />
                Total Visitors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-light text-vault-bone">{analytics.totalVisitors}</div>
            </CardContent>
          </Card>

          <Card className="bg-vault-charcoal/50 border-vault-coral/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-vault-coral flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Messages Viewed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-light text-vault-bone">{analytics.totalMessagesViewed}</div>
              <div className="text-xs text-vault-violet mt-1">
                {analytics.avgMessagesPerVisitor} avg per visitor
              </div>
            </CardContent>
          </Card>

          <Card className="bg-vault-charcoal/50 border-vault-sage/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-vault-sage flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Hearts Given
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-light text-vault-bone">{analytics.totalHeartsGiven}</div>
            </CardContent>
          </Card>

          <Card className="bg-vault-charcoal/50 border-vault-gold/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-vault-gold flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Messages Left
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-light text-vault-bone">{analytics.totalMessagesLeft}</div>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-vault-charcoal/50 border-vault-violet/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-vault-violet flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Avg Time on Site
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-light text-vault-bone">
                {formatTime(analytics.avgTimeOnSite)}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-vault-charcoal/50 border-vault-coral/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-vault-coral flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Engagement Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-light text-vault-bone">{analytics.engagementRate}%</div>
              <div className="text-xs text-vault-violet mt-1">
                Hearts + Messages / Visitors
              </div>
            </CardContent>
          </Card>

          <Card className="bg-vault-charcoal/50 border-vault-sage/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-vault-sage">Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-light text-vault-bone">
                {Math.round((analytics.totalMessagesLeft / analytics.totalVisitors) * 100)}%
              </div>
              <div className="text-xs text-vault-violet mt-1">
                Visitors who leave messages
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Referrers */}
          <Card className="bg-vault-charcoal/50 border-vault-gold/20">
            <CardHeader>
              <CardTitle className="text-vault-bone">Top Traffic Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analytics.topReferrers.slice(0, 8).map((ref, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-vault-violet text-sm truncate max-w-[200px]">
                      {ref.referrer === 'Direct' ? 'Direct visits' : ref.referrer}
                    </span>
                    <span className="text-vault-bone font-medium">{ref.visitors}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Popular Message Tags */}
          <Card className="bg-vault-charcoal/50 border-vault-coral/20">
            <CardHeader>
              <CardTitle className="text-vault-bone">Most Viewed Message Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analytics.popularTags.slice(0, 8).map((tag, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-vault-coral text-sm">{tag.tag}</span>
                    <span className="text-vault-bone font-medium">{tag.views} views</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Sessions */}
        <Card className="bg-vault-charcoal/50 border-vault-sage/20">
          <CardHeader>
            <CardTitle className="text-vault-bone">Recent Visitor Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-vault-violet/20">
                    <th className="text-left py-2 text-vault-violet">Time</th>
                    <th className="text-left py-2 text-vault-violet">Messages</th>
                    <th className="text-left py-2 text-vault-violet">Hearts</th>
                    <th className="text-left py-2 text-vault-violet">Left Msg</th>
                    <th className="text-left py-2 text-vault-violet">Duration</th>
                    <th className="text-left py-2 text-vault-violet">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.sessions.slice(0, 20).map((session, index) => (
                    <tr key={index} className="border-b border-vault-violet/10">
                      <td className="py-2 text-vault-bone">
                        {new Date(session.timestamp.seconds * 1000).toLocaleString()}
                      </td>
                      <td className="py-2 text-vault-bone">{session.messagesViewed || 0}</td>
                      <td className="py-2 text-vault-bone">{session.heartsGiven || 0}</td>
                      <td className="py-2 text-vault-bone">
                        {session.messageLeft ? '✓' : '○'}
                      </td>
                      <td className="py-2 text-vault-bone">{formatTime(session.timeOnSite || 0)}</td>
                      <td className="py-2 text-vault-violet text-xs truncate max-w-[120px]">
                        {session.referrer === 'Direct' ? 'Direct' : session.referrer}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 