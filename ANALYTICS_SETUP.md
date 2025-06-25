# Analytics Setup for The Message Vault

## Overview
The Message Vault now includes comprehensive visitor analytics tracking. This system automatically tracks user interactions, engagement patterns, and behavioral data to help understand how users engage with the platform.

## Firebase Collections Created

### 1. `visitor_sessions`
Tracks individual visitor sessions and overall engagement.

**Fields:**
- `sessionId` (string) - Unique session identifier
- `timestamp` (Timestamp) - When the session started
- `userAgent` (string) - Browser/device information
- `referrer` (string) - Where the visitor came from
- `messagesViewed` (number) - Total messages viewed in this session
- `heartsGiven` (number) - Total hearts given in this session
- `messageLeft` (boolean) - Whether user left a message
- `timeOnSite` (number) - Total time spent on site (seconds)
- `lastActivity` (Timestamp) - Last recorded activity

### 2. `message_interactions`
Tracks specific interactions with individual messages.

**Fields:**
- `sessionId` (string) - Links to visitor session
- `messageId` (string) - The message that was interacted with
- `action` (string) - Type of interaction: 'viewed', 'hearted', 'reported'
- `timestamp` (Timestamp) - When the interaction occurred
- `messageSignoff` (string) - Who the message was from
- `messageTag` (string) - Message category/tag

### 3. `message_submissions`
Tracks when visitors submit new messages.

**Fields:**
- `sessionId` (string) - Links to visitor session
- `timestamp` (Timestamp) - When the message was submitted
- `messageText` (string) - The actual message content
- `signoff` (string) - How the user signed the message
- `tag` (string) - Message category
- `approved` (boolean) - Moderation status

## Analytics Dashboard Access

To view analytics, navigate to:
- `https://yoursite.com/analytics` or
- `https://yoursite.com/#analytics`

The dashboard provides:

### Key Metrics
- **Total Visitors** - Unique sessions in selected period
- **Messages Viewed** - Total message interactions
- **Hearts Given** - Total hearts/likes given
- **Messages Left** - Total messages submitted
- **Average Time on Site** - Session duration
- **Engagement Rate** - (Hearts + Messages) / Visitors
- **Conversion Rate** - % of visitors who leave messages

### Detailed Analytics
- **Top Traffic Sources** - Where visitors come from
- **Most Viewed Message Types** - Popular message categories
- **Recent Visitor Sessions** - Individual session details
- **Time Period Filters** - 7, 30, or 90 days

## Privacy & Data Collection

### What We Track
- Session-level engagement metrics
- Message interaction patterns
- General referrer information
- Time spent on site
- Anonymous behavioral data

### What We DON'T Track
- Personal identification information
- IP addresses
- Location data
- Cross-site tracking
- Persistent user identification

### Data Retention
- Analytics data is stored indefinitely for insights
- Session IDs are randomly generated and not tied to users
- No personally identifiable information is collected

## Implementation Details

### Automatic Tracking
The analytics system automatically tracks:
1. **Session Start** - When a user first visits
2. **Message Views** - Each time a message is displayed
3. **Heart Interactions** - When users like messages
4. **Message Submissions** - When users leave messages
5. **Session Duration** - Time spent on site

### Session Management
- Sessions use `sessionStorage` (tab-specific)
- New session created for each browser tab
- Session persists during page navigation
- Automatic session timeout after inactivity

### Error Handling
- Analytics failures don't affect user experience
- Graceful fallbacks for Firebase connection issues
- Local session tracking continues even if Firebase is unavailable

## Firebase Security Rules

Add these rules to allow analytics data collection:

```javascript
// Add to your existing Firestore rules
match /visitor_sessions/{sessionId} {
  allow create: if true;
  allow update: if true;
  allow read: if false; // Only backend can read
}

match /message_interactions/{interactionId} {
  allow create: if true;
  allow read: if false; // Only backend can read
}

match /message_submissions/{submissionId} {
  allow create: if true;
  allow read: if false; // Only backend can read
}
```

## Performance Considerations

### Optimizations
- Analytics calls are async and non-blocking
- Batch operations where possible
- Minimal data payload sizes
- Client-side session caching

### Monitoring
- Track Firebase quota usage
- Monitor read/write operations
- Set up alerts for unusual patterns
- Regular data archiving if needed

## Future Enhancements

Potential additions:
- Real-time visitor counts
- Geographic insights (country-level)
- Conversion funnel analysis
- A/B testing framework
- Export capabilities
- Automated reports

## Troubleshooting

### Common Issues
1. **Analytics not tracking** - Check Firebase connection and rules
2. **Dashboard not loading** - Verify analytics service and permissions
3. **Missing data** - Check console for Firebase errors
4. **Performance issues** - Monitor Firebase usage quotas

### Debug Mode
Add `?debug=analytics` to URL for verbose logging:
```
https://yoursite.com/?debug=analytics
```

This will show detailed console logs of all analytics events. 