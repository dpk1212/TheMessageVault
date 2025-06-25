# 🛡️ Content Moderation Setup Guide

The Message Vault uses Google's Perspective API to maintain a safe, supportive environment. This guide will help you set up content moderation.

## 🔧 **Setup Steps**

### 1. **Get Perspective API Key**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Navigate to **APIs & Services > Library**
4. Search for "Perspective Comment Analyzer API"
5. Click **Enable**
6. Go to **APIs & Services > Credentials**
7. Click **Create Credentials > API Key**
8. Copy your API key

### 2. **Configure Environment Variables**

Create a `.env` file in your project root:

```bash
# Perspective API
REACT_APP_PERSPECTIVE_API_KEY=your_actual_api_key_here

# Firebase (if using)
REACT_APP_FIREBASE_API_KEY=your_firebase_key
REACT_APP_FIREBASE_PROJECT_ID=themessagevault-84ea0
# ... other Firebase config
```

### 3. **API Usage Limits**

Free tier includes:
- **1,000 requests per day**
- **1 request per second**

For production, consider:
- **Paid tier**: $1 per 1,000 requests
- **Rate limiting**: Implemented in our service
- **Caching**: For repeated content

## 🔍 **How It Works**

### **Two-Layer Protection**

1. **Pre-filtering (Fast, Local)**
   - Length validation (10-500 characters)
   - Spam detection (URLs, repeated chars)
   - Concerning phrases (mental health related)
   - Basic quality checks

2. **Perspective API (Slower, Accurate)**
   - Toxicity detection
   - Threat assessment
   - Identity attacks
   - Insult detection
   - Profanity checking
   - Severe toxicity

### **Moderation Thresholds**

```typescript
TOXICITY: 0.7           // General negative content
SEVERE_TOXICITY: 0.5    // Very harmful content  
IDENTITY_ATTACK: 0.6    // Attacks on groups
INSULT: 0.7             // Personal attacks
PROFANITY: 0.8          // Swear words (lenient)
THREAT: 0.5             // Violence threats (strict)
```

### **Special Filters for Healing Spaces**

- Mental health concerning phrases
- Self-harm references
- Spam and promotional content
- Quality standards

## 🚀 **Integration**

The moderation service is automatically integrated into:

- **LeaveMessageForm**: Real-time feedback
- **Message submission**: Pre-publish checking
- **Visual feedback**: Clear error messages
- **Graceful fallbacks**: Works even if API fails

## 🔄 **Fallback Strategy**

If Perspective API is unavailable:
1. Use pre-filter checks only
2. Log the issue for monitoring
3. Continue with basic protection
4. Queue for later re-checking

## 📊 **Monitoring**

Track these metrics:
- **Rejection rate**: Messages blocked
- **API response time**: Performance
- **False positives**: Manual review needed
- **API quota usage**: Cost management

## 🛠️ **Customization**

### **Adjust Thresholds**

Edit `src/services/moderation.ts`:

```typescript
const MODERATION_THRESHOLDS = {
  TOXICITY: 0.6,        // More strict
  PROFANITY: 0.9,       // More lenient
  // ... adjust as needed
};
```

### **Add Custom Filters**

```typescript
const HEALING_SPACE_FILTERS = {
  CONCERNING_PHRASES: [
    'your custom phrase',
    // ... add more
  ],
  SPAM_PATTERNS: [
    /your-regex-pattern/,
    // ... add more
  ]
};
```

### **Custom Messages**

Modify the `getModerationMessage()` function to provide more helpful, context-specific feedback.

## 🔐 **Security Considerations**

1. **API Key Protection**
   - Never commit API keys
   - Use environment variables
   - Rotate keys regularly

2. **Rate Limiting**
   - Implement user-based limits
   - Monitor for abuse
   - Use debouncing for real-time checks

3. **Privacy**
   - Content is sent to Google
   - Consider data retention policies
   - Inform users about moderation

## 📈 **Production Recommendations**

1. **Enable API quotas**: Prevent unexpected charges
2. **Set up monitoring**: Track API usage and errors
3. **Implement caching**: Reduce duplicate requests
4. **Add manual review**: For edge cases
5. **Create admin dashboard**: Manage reported content

## 🆘 **Troubleshooting**

### **Common Issues**

1. **"API key not configured"**
   - Check `.env` file exists
   - Verify `REACT_APP_PERSPECTIVE_API_KEY` is set
   - Restart development server

2. **"403 Forbidden"**
   - Enable Perspective API in Google Cloud
   - Check API key permissions
   - Verify billing is enabled

3. **"Rate limit exceeded"**
   - Wait before retrying
   - Implement exponential backoff
   - Consider upgrading quota

4. **"High false positive rate"**
   - Adjust thresholds in `MODERATION_THRESHOLDS`
   - Add context-specific filters
   - Implement manual review system

## 🔄 **Updates and Maintenance**

- **Monitor API changes**: Google updates
- **Review thresholds**: Based on user feedback
- **Update filters**: Add new concerning patterns
- **Performance optimization**: Caching, batching

---

## 💡 **Next Steps**

1. Set up your Perspective API key
2. Test with various message types
3. Adjust thresholds based on your community
4. Implement additional custom filters
5. Set up monitoring and analytics

The moderation system is designed to be gentle but effective, helping maintain The Message Vault as a safe space for healing and support. 