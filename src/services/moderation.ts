// Perspective API Content Moderation Service
// Helps keep The Message Vault safe and supportive

interface PerspectiveAnalysisRequest {
  comment: {
    text: string;
  };
  languages?: string[];
  requestedAttributes: {
    [key: string]: {};
  };
}

interface PerspectiveScore {
  summaryScore: {
    value: number;
    type: string;
  };
}

interface PerspectiveAnalysisResponse {
  attributeScores: {
    [key: string]: PerspectiveScore;
  };
  languages: string[];
}

export interface ModerationResult {
  isApproved: boolean;
  scores: {
    toxicity: number;
    severeToxicity: number;
    identityAttack: number;
    insult: number;
    profanity: number;
    threat: number;
  };
  flaggedAttributes: string[];
  reason?: string;
}

// Perspective API configuration
const PERSPECTIVE_API_URL = 'https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze';
const PERSPECTIVE_API_KEY = process.env.REACT_APP_PERSPECTIVE_API_KEY || 'your-perspective-api-key';

// Moderation thresholds (0-1, where 1 is most toxic)
const MODERATION_THRESHOLDS = {
  TOXICITY: 0.7,           // General toxicity
  SEVERE_TOXICITY: 0.5,    // More strict for severe toxicity
  IDENTITY_ATTACK: 0.6,    // Attacks on identity/group
  INSULT: 0.7,             // Personal insults
  PROFANITY: 0.8,          // Swear words (more lenient for expression)
  THREAT: 0.5,             // Threats of violence (very strict)
};

// Additional custom filters for a healing space
const HEALING_SPACE_FILTERS = {
  // Words that might be concerning in a mental health context
  CONCERNING_PHRASES: [
    'kill yourself',
    'end it all',
    'not worth living',
    'better off dead',
    'just die',
  ],
  
  // Spam patterns
  SPAM_PATTERNS: [
    /(.)\1{10,}/,  // Repeated characters
    /https?:\/\//,  // URLs
    /\b\d{10,}\b/,  // Long numbers (phone numbers)
    /@\w+/,        // Email patterns
  ],
  
  // Minimum quality standards
  MIN_LENGTH: 10,
  MAX_LENGTH: 500,
};

export class ModerationService {
  private static instance: ModerationService;
  
  static getInstance(): ModerationService {
    if (!ModerationService.instance) {
      ModerationService.instance = new ModerationService();
    }
    return ModerationService.instance;
  }

  // Main moderation function
  async moderateMessage(text: string): Promise<ModerationResult> {
    try {
      // Pre-filter checks (fast, local)
      const preFilterResult = this.preFilterCheck(text);
      if (!preFilterResult.isApproved) {
        return preFilterResult;
      }

      // Perspective API check (slower, external)
      const perspectiveResult = await this.checkWithPerspectiveAPI(text);
      
      return perspectiveResult;
    } catch (error) {
      console.error('Moderation error:', error);
      
      // If Perspective API fails, fall back to pre-filter only
      return this.preFilterCheck(text);
    }
  }

  // Pre-filtering for basic quality and safety checks
  private preFilterCheck(text: string): ModerationResult {
    const cleanText = text.trim().toLowerCase();
    const flaggedAttributes: string[] = [];
    
    // Length checks
    if (cleanText.length < HEALING_SPACE_FILTERS.MIN_LENGTH) {
      return {
        isApproved: false,
        scores: this.getEmptyScores(),
        flaggedAttributes: ['length'],
        reason: 'Message too short. Please share something meaningful (at least 10 characters).'
      };
    }
    
    if (cleanText.length > HEALING_SPACE_FILTERS.MAX_LENGTH) {
      return {
        isApproved: false,
        scores: this.getEmptyScores(),
        flaggedAttributes: ['length'],
        reason: 'Message too long. Please keep it under 500 characters to maintain focus.'
      };
    }

    // Check for concerning phrases
    for (const phrase of HEALING_SPACE_FILTERS.CONCERNING_PHRASES) {
      if (cleanText.includes(phrase)) {
        flaggedAttributes.push('concerning_content');
      }
    }

    // Check for spam patterns
    for (const pattern of HEALING_SPACE_FILTERS.SPAM_PATTERNS) {
      if (pattern.test(text)) {
        flaggedAttributes.push('spam');
      }
    }

    // If any concerning content or spam detected
    if (flaggedAttributes.length > 0) {
      return {
        isApproved: false,
        scores: this.getEmptyScores(),
        flaggedAttributes,
        reason: 'Your message contains content that may not be appropriate for our healing space. Please revise and try again.'
      };
    }

    return {
      isApproved: true,
      scores: this.getEmptyScores(),
      flaggedAttributes: []
    };
  }

  // Check with Google's Perspective API
  private async checkWithPerspectiveAPI(text: string): Promise<ModerationResult> {
    if (!PERSPECTIVE_API_KEY || PERSPECTIVE_API_KEY === 'your-perspective-api-key') {
      console.warn('Perspective API key not configured, using pre-filter only');
      return this.preFilterCheck(text);
    }

    const requestData: PerspectiveAnalysisRequest = {
      comment: { text },
      languages: ['en'],
      requestedAttributes: {
        TOXICITY: {},
        SEVERE_TOXICITY: {},
        IDENTITY_ATTACK: {},
        INSULT: {},
        PROFANITY: {},
        THREAT: {},
      }
    };

    try {
      const response = await fetch(`${PERSPECTIVE_API_URL}?key=${PERSPECTIVE_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error(`Perspective API error: ${response.status}`);
      }

      const data: PerspectiveAnalysisResponse = await response.json();
      
      return this.analyzePerspectiveResults(data);
    } catch (error) {
      console.error('Perspective API request failed:', error);
      // Fallback to pre-filter check
      return this.preFilterCheck(text);
    }
  }

  // Analyze Perspective API results
  private analyzePerspectiveResults(data: PerspectiveAnalysisResponse): ModerationResult {
    const scores = {
      toxicity: data.attributeScores.TOXICITY?.summaryScore.value || 0,
      severeToxicity: data.attributeScores.SEVERE_TOXICITY?.summaryScore.value || 0,
      identityAttack: data.attributeScores.IDENTITY_ATTACK?.summaryScore.value || 0,
      insult: data.attributeScores.INSULT?.summaryScore.value || 0,
      profanity: data.attributeScores.PROFANITY?.summaryScore.value || 0,
      threat: data.attributeScores.THREAT?.summaryScore.value || 0,
    };

    const flaggedAttributes: string[] = [];
    let highestScore = 0;
    let primaryConcern = '';

    // Check each attribute against thresholds
    if (scores.toxicity > MODERATION_THRESHOLDS.TOXICITY) {
      flaggedAttributes.push('toxicity');
      if (scores.toxicity > highestScore) {
        highestScore = scores.toxicity;
        primaryConcern = 'toxicity';
      }
    }

    if (scores.severeToxicity > MODERATION_THRESHOLDS.SEVERE_TOXICITY) {
      flaggedAttributes.push('severe_toxicity');
      if (scores.severeToxicity > highestScore) {
        highestScore = scores.severeToxicity;
        primaryConcern = 'severe toxicity';
      }
    }

    if (scores.identityAttack > MODERATION_THRESHOLDS.IDENTITY_ATTACK) {
      flaggedAttributes.push('identity_attack');
      if (scores.identityAttack > highestScore) {
        highestScore = scores.identityAttack;
        primaryConcern = 'identity attack';
      }
    }

    if (scores.insult > MODERATION_THRESHOLDS.INSULT) {
      flaggedAttributes.push('insult');
      if (scores.insult > highestScore) {
        highestScore = scores.insult;
        primaryConcern = 'insult';
      }
    }

    if (scores.profanity > MODERATION_THRESHOLDS.PROFANITY) {
      flaggedAttributes.push('profanity');
      if (scores.profanity > highestScore) {
        highestScore = scores.profanity;
        primaryConcern = 'profanity';
      }
    }

    if (scores.threat > MODERATION_THRESHOLDS.THREAT) {
      flaggedAttributes.push('threat');
      if (scores.threat > highestScore) {
        highestScore = scores.threat;
        primaryConcern = 'threat';
      }
    }

    const isApproved = flaggedAttributes.length === 0;
    
    return {
      isApproved,
      scores,
      flaggedAttributes,
      reason: isApproved ? undefined : this.getModerationMessage(primaryConcern, highestScore)
    };
  }

  // Generate helpful moderation messages
  private getModerationMessage(primaryConcern: string, score: number): string {
    const intensity = score > 0.8 ? 'high' : score > 0.6 ? 'moderate' : 'low';
    
    const messages = {
      'toxicity': {
        high: 'Your message contains language that may be hurtful to others. The Message Vault is a space for healing and support.',
        moderate: 'Your message may come across as negative. Consider rephrasing with more kindness.',
        low: 'Your message might be misunderstood. Could you express this more gently?'
      },
      'severe_toxicity': {
        high: 'This message contains severely inappropriate content. Please share something supportive instead.',
        moderate: 'This content is too harsh for our healing space. Please try a gentler approach.',
        low: 'This message may be too intense. Consider softening your words.'
      },
      'threat': {
        high: 'Messages containing threats are not allowed. Please share something positive and supportive.',
        moderate: 'Your message may be interpreted as threatening. Please rephrase.',
        low: 'Your wording might seem threatening. Could you express this differently?'
      },
      'insult': {
        high: 'Personal attacks have no place in our supportive community. Please try again with kindness.',
        moderate: 'Your message may be hurtful to others. Consider a more supportive approach.',
        low: 'This might come across as insulting. Could you phrase it more gently?'
      },
      'identity_attack': {
        high: 'Messages targeting groups or identities are not permitted. Please share something inclusive.',
        moderate: 'Your message may be offensive to certain groups. Please be more inclusive.',
        low: 'This might be perceived as targeting certain people. Consider more neutral language.'
      },
      'profanity': {
        high: 'Strong language may not be appropriate for all visitors. Please express yourself differently.',
        moderate: 'Consider using gentler language that everyone can feel comfortable with.',
        low: 'Your language might be too strong for some visitors. Could you soften it?'
      }
    };

    const messageCategory = messages[primaryConcern as keyof typeof messages];
    if (messageCategory && intensity in messageCategory) {
      return messageCategory[intensity as keyof typeof messageCategory];
    }
    return 'Your message may not be appropriate for our supportive community. Please try rephrasing with more kindness.';
  }

  private getEmptyScores() {
    return {
      toxicity: 0,
      severeToxicity: 0,
      identityAttack: 0,
      insult: 0,
      profanity: 0,
      threat: 0,
    };
  }
}

// Export singleton instance
export const moderationService = ModerationService.getInstance(); 