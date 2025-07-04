import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  increment, 
  query, 
  where, 
  orderBy, 
  limit,
  Timestamp 
} from 'firebase/firestore';

// Firebase config - using actual project details from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyDOGN_l0kFF7YfVhGLZjtHDLLxCPInvRKc",
  authDomain: "themessagevault-84ea0.firebaseapp.com",
  projectId: "themessagevault-84ea0",
  storageBucket: "themessagevault-84ea0.firebasestorage.app",
  messagingSenderId: "362976942819",
  appId: "1:362976942819:web:b8da2a10ba12176e45c3d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export interface Message {
  id: string;
  text: string;
  signoff: string;
  tag: string;
  hearts: number;
  createdAt: Timestamp;
  status: 'active' | 'reported' | 'removed';
}

export interface Supporter {
  id: string;
  name: string;
  tier: 'kindness' | 'compassion' | 'healing';
  joinedDate: Timestamp;
  message?: string;
}

export interface VaultStats {
  messagesTaken: number;
  messagesLeft: number;
  lastUpdated: Timestamp;
}

export interface VisitorSession {
  id: string;
  sessionId: string;
  timestamp: Timestamp;
  userAgent: string;
  referrer: string;
  messagesViewed: number;
  heartsGiven: number;
  messageLeft: boolean;
  timeOnSite: number; // in seconds
  lastActivity: Timestamp;
}

export interface MessageInteraction {
  id: string;
  sessionId: string;
  messageId: string;
  action: 'viewed' | 'hearted' | 'reported';
  timestamp: Timestamp;
  messageSignoff: string;
  messageTag: string;
}

export interface MessageSubmission {
  id: string;
  sessionId: string;
  timestamp: Timestamp;
  messageText: string;
  signoff: string;
  tag: string;
  approved: boolean;
}

// Message operations
export const messageService = {
  // Get random message for taking
  async getRandomMessage(): Promise<Message | null> {
    try {
      const messagesRef = collection(db, 'messages');
      const q = query(
        messagesRef, 
        where('status', '==', 'active')
        // Removed orderBy and limit to get ALL active messages for true randomness
      );
      
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        console.log('No messages found in database');
        return null;
      }
      
      const messages = snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data()
      } as Message));
      
      console.log(`Found ${messages.length} messages, selecting random one from ALL active messages`);
      
      // Log signoffs for debugging
      const signoffs = messages.map(msg => msg.signoff);
      console.log('Available signoffs:', [...new Set(signoffs)]);
      
      const selectedMessage = messages[Math.floor(Math.random() * messages.length)];
      console.log(`Selected message from: "${selectedMessage.signoff}"`);
      
      return selectedMessage;
    } catch (error) {
      console.error('Firebase error getting random message:', error);
      // Return null instead of throwing to allow fallback handling
      return null;
    }
  },

  // Add new message
  async addMessage(messageData: {
    text: string;
    signoff: string;
    tag: string;
  }): Promise<string | null> {
    try {
      console.log('Attempting to add message to Firebase:', messageData);
      const docRef = await addDoc(collection(db, 'messages'), {
        ...messageData,
        hearts: 0,
        createdAt: Timestamp.now(),
        status: 'active'
      });
      
      console.log('Message added successfully with ID:', docRef.id);
      
      // Try to update stats, but don't fail if this doesn't work
      try {
        await statsService.incrementMessagesLeft();
      } catch (statsError) {
        console.warn('Failed to update stats, but message was saved:', statsError);
      }
      
      return docRef.id;
    } catch (error) {
      console.error('Firebase error adding message:', error);
      return null; // Return null instead of throwing
    }
  },

  // Increment heart count
  async addHeart(messageId: string): Promise<boolean> {
    try {
      console.log('Attempting to add heart to message:', messageId);
      const messageRef = doc(db, 'messages', messageId);
      await updateDoc(messageRef, {
        hearts: increment(1)
      });
      console.log('Heart added successfully to message:', messageId);
      return true;
    } catch (error) {
      console.error('Firebase error adding heart:', error);
      return false;
    }
  },

  // Report message for moderation
  async reportMessage(messageId: string): Promise<boolean> {
    try {
      const messageRef = doc(db, 'messages', messageId);
      await updateDoc(messageRef, {
        status: 'reported'
      });
      return true;
    } catch (error) {
      console.error('Error reporting message:', error);
      return false;
    }
  }
};

// Supporter operations
export const supporterService = {
  // Get all supporters for the wall
  async getSupporters(): Promise<Supporter[]> {
    try {
      const supportersRef = collection(db, 'supporters');
      const q = query(supportersRef, orderBy('joinedDate', 'desc'));
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data()
      } as Supporter));
    } catch (error) {
      console.error('Error getting supporters:', error);
      return [];
    }
  },

  // Add new supporter
  async addSupporter(supporterData: {
    name: string;
    tier: 'kindness' | 'compassion' | 'healing';
    message?: string;
  }): Promise<string | null> {
    try {
      const docRef = await addDoc(collection(db, 'supporters'), {
        ...supporterData,
        joinedDate: Timestamp.now()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding supporter:', error);
      return null;
    }
  }
};

// Analytics and stats
export const statsService = {
  // Get message analytics for community insights
  async getMessageAnalytics() {
    try {
      const messagesRef = collection(db, 'messages');
      const q = query(messagesRef, where('status', '==', 'active'));
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) return null;
      
      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Message));
      
      // Category breakdown
      const categoryStats = messages.reduce((acc: any, msg) => {
        acc[msg.tag] = (acc[msg.tag] || 0) + 1;
        return acc;
      }, {});
      
      // Top categories by count
      const topCategories = Object.entries(categoryStats)
        .map(([tag, count]) => ({ tag, count: count as number }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 6);
      
      // Most hearted messages by category
      const topHeartedByCategory = messages
        .filter(msg => msg.hearts > 0)
        .sort((a, b) => b.hearts - a.hearts)
        .slice(0, 8);
      
      // Popular signoff patterns
      const signoffStats = messages.reduce((acc: any, msg) => {
        const signoff = msg.signoff;
        acc[signoff] = (acc[signoff] || { count: 0, totalHearts: 0 });
        acc[signoff].count += 1;
        acc[signoff].totalHearts += msg.hearts;
        return acc;
      }, {});
      
      const topSignoffs = Object.entries(signoffStats)
        .map(([signoff, stats]: [string, any]) => ({
          signoff,
          count: stats.count,
          avgHearts: Math.round(stats.totalHearts / stats.count)
        }))
        .filter(item => item.count > 1) // Only show signoffs that appear multiple times
        .sort((a, b) => b.avgHearts - a.avgHearts)
        .slice(0, 6);
      
      return {
        totalMessages: messages.length,
        totalHearts: messages.reduce((sum, msg) => sum + msg.hearts, 0),
        topCategories,
        topHeartedByCategory,
        topSignoffs
      };
    } catch (error) {
      console.error('Error getting message analytics:', error);
      return null;
    }
  },

  // Get vault statistics
  async getVaultStats(): Promise<VaultStats> {
    try {
      const snapshot = await getDocs(query(collection(db, 'analytics'), limit(1)));
      
      if (snapshot.empty) {
        // Initialize stats if they don't exist
        const initialStats = {
          messagesTaken: 0,
          messagesLeft: 0,
          lastUpdated: Timestamp.now()
        };
        await addDoc(collection(db, 'analytics'), initialStats);
        return initialStats;
      }
      
      return snapshot.docs[0].data() as VaultStats;
    } catch (error) {
      console.error('Error getting vault stats:', error);
      return {
        messagesTaken: 0,
        messagesLeft: 0,
        lastUpdated: Timestamp.now()
      };
    }
  },

  // Increment messages taken
  async incrementMessagesTaken(): Promise<void> {
    try {
      const snapshot = await getDocs(query(collection(db, 'analytics'), limit(1)));
      
      if (snapshot.empty) {
        // Create initial stats document
        await addDoc(collection(db, 'analytics'), {
          messagesTaken: 1,
          messagesLeft: 0,
          lastUpdated: Timestamp.now()
        });
      } else {
        const statsRef = doc(db, 'analytics', snapshot.docs[0].id);
        await updateDoc(statsRef, {
          messagesTaken: increment(1),
          lastUpdated: Timestamp.now()
        });
      }
    } catch (error) {
      console.error('Error incrementing messages taken:', error);
    }
  },

  // Increment messages left
  async incrementMessagesLeft(): Promise<void> {
    try {
      const snapshot = await getDocs(query(collection(db, 'analytics'), limit(1)));
      
      if (snapshot.empty) {
        // Create initial stats document
        await addDoc(collection(db, 'analytics'), {
          messagesTaken: 0,
          messagesLeft: 1,
          lastUpdated: Timestamp.now()
        });
      } else {
        const statsRef = doc(db, 'analytics', snapshot.docs[0].id);
        await updateDoc(statsRef, {
          messagesLeft: increment(1),
          lastUpdated: Timestamp.now()
        });
      }
    } catch (error) {
      console.error('Error incrementing messages left:', error);
    }
  }
};

// Analytics and visitor tracking
export const analyticsService = {
  // Generate unique session ID for tracking
  generateSessionId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },

  // Start a new visitor session
  async startSession(): Promise<string> {
    try {
      const sessionId = this.generateSessionId();
      
      const sessionData = {
        sessionId,
        timestamp: Timestamp.now(),
        userAgent: navigator.userAgent || 'Unknown',
        referrer: document.referrer || 'Direct',
        messagesViewed: 0,
        heartsGiven: 0,
        messageLeft: false,
        timeOnSite: 0,
        lastActivity: Timestamp.now()
      };

      await addDoc(collection(db, 'visitor_sessions'), sessionData);
      console.log('Started new visitor session:', sessionId);
      
      // Store session ID in sessionStorage for this tab
      sessionStorage.setItem('vaultSessionId', sessionId);
      sessionStorage.setItem('vaultSessionStart', Date.now().toString());
      
      return sessionId;
    } catch (error) {
      console.error('Error starting visitor session:', error);
      // Return a fallback session ID even if Firebase fails
      const fallbackId = this.generateSessionId();
      sessionStorage.setItem('vaultSessionId', fallbackId);
      return fallbackId;
    }
  },

  // Get current session ID (create if doesn't exist)
  async getCurrentSessionId(): Promise<string> {
    let sessionId = sessionStorage.getItem('vaultSessionId');
    if (!sessionId) {
      sessionId = await this.startSession();
    }
    return sessionId;
  },

  // Track message view/interaction
  async trackMessageInteraction(
    messageId: string, 
    action: 'viewed' | 'hearted' | 'reported',
    messageSignoff: string,
    messageTag: string
  ): Promise<void> {
    try {
      const sessionId = await this.getCurrentSessionId();
      
      const interactionData = {
        sessionId,
        messageId,
        action,
        timestamp: Timestamp.now(),
        messageSignoff,
        messageTag
      };

      await addDoc(collection(db, 'message_interactions'), interactionData);
      
      // Update session stats
      await this.updateSessionStats(sessionId, action);
      
      console.log(`Tracked ${action} interaction for message:`, messageId);
    } catch (error) {
      console.error('Error tracking message interaction:', error);
    }
  },

  // Track message submission
  async trackMessageSubmission(
    messageText: string,
    signoff: string,
    tag: string
  ): Promise<void> {
    try {
      const sessionId = await this.getCurrentSessionId();
      
      const submissionData = {
        sessionId,
        timestamp: Timestamp.now(),
        messageText,
        signoff,
        tag,
        approved: true // Default to approved, can be changed later
      };

      await addDoc(collection(db, 'message_submissions'), submissionData);
      
      // Update session to mark that user left a message
      await this.updateSessionStats(sessionId, 'message_left');
      
      console.log('Tracked message submission for session:', sessionId);
    } catch (error) {
      console.error('Error tracking message submission:', error);
    }
  },

  // Update session statistics
  async updateSessionStats(sessionId: string, action: string): Promise<void> {
    try {
      const sessionsRef = collection(db, 'visitor_sessions');
      const q = query(sessionsRef, where('sessionId', '==', sessionId));
      const snapshot = await getDocs(q);
      
      if (!snapshot.empty) {
        const sessionDoc = snapshot.docs[0];
        const updateData: any = {
          lastActivity: Timestamp.now()
        };

        if (action === 'viewed') {
          updateData.messagesViewed = increment(1);
        } else if (action === 'hearted') {
          updateData.heartsGiven = increment(1);
        } else if (action === 'message_left') {
          updateData.messageLeft = true;
        }

        // Calculate time on site
        const sessionStart = sessionStorage.getItem('vaultSessionStart');
        if (sessionStart) {
          const timeOnSite = Math.floor((Date.now() - parseInt(sessionStart)) / 1000);
          updateData.timeOnSite = timeOnSite;
        }

        await updateDoc(doc(db, 'visitor_sessions', sessionDoc.id), updateData);
      }
    } catch (error) {
      console.error('Error updating session stats:', error);
    }
  },

  // Get visitor analytics (for dashboard viewing)
  async getVisitorAnalytics(days: number = 7) {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      const cutoffTimestamp = Timestamp.fromDate(cutoffDate);

      // Get recent sessions
      const sessionsRef = collection(db, 'visitor_sessions');
      const sessionsQuery = query(
        sessionsRef, 
        where('timestamp', '>=', cutoffTimestamp),
        orderBy('timestamp', 'desc')
      );
      const sessionsSnapshot = await getDocs(sessionsQuery);

      // Get recent interactions
      const interactionsRef = collection(db, 'message_interactions');
      const interactionsQuery = query(
        interactionsRef,
        where('timestamp', '>=', cutoffTimestamp),
        orderBy('timestamp', 'desc')
      );
      const interactionsSnapshot = await getDocs(interactionsQuery);

      const sessions = sessionsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as VisitorSession));

      const interactions = interactionsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as MessageInteraction));

      // Calculate metrics
      const totalVisitors = sessions.length;
      const totalMessagesViewed = sessions.reduce((sum, s) => sum + (s.messagesViewed || 0), 0);
      const totalHeartsGiven = sessions.reduce((sum, s) => sum + (s.heartsGiven || 0), 0);
      const totalMessagesLeft = sessions.filter(s => s.messageLeft).length;
      const avgTimeOnSite = sessions.reduce((sum, s) => sum + (s.timeOnSite || 0), 0) / sessions.length;
      const avgMessagesPerVisitor = totalMessagesViewed / totalVisitors;

      // Top referrers
      const referrerStats = sessions.reduce((acc: any, session) => {
        const ref = session.referrer || 'Direct';
        acc[ref] = (acc[ref] || 0) + 1;
        return acc;
      }, {});

      // Most popular message tags from interactions
      const tagStats = interactions.reduce((acc: any, interaction) => {
        if (interaction.action === 'viewed') {
          const tag = interaction.messageTag;
          acc[tag] = (acc[tag] || 0) + 1;
        }
        return acc;
      }, {});

      return {
        totalVisitors,
        totalMessagesViewed,
        totalHeartsGiven,
        totalMessagesLeft,
        avgTimeOnSite: Math.round(avgTimeOnSite),
        avgMessagesPerVisitor: Math.round(avgMessagesPerVisitor * 10) / 10,
        topReferrers: Object.entries(referrerStats)
          .map(([ref, count]) => ({ referrer: ref, visitors: count as number }))
          .sort((a, b) => b.visitors - a.visitors)
          .slice(0, 10),
        popularTags: Object.entries(tagStats)
          .map(([tag, views]) => ({ tag, views: views as number }))
          .sort((a, b) => b.views - a.views)
          .slice(0, 10),
        engagementRate: Math.round((totalHeartsGiven + totalMessagesLeft) / totalVisitors * 100),
        sessions: sessions.slice(0, 50), // Recent 50 sessions
        interactions: interactions.slice(0, 100) // Recent 100 interactions
      };
    } catch (error) {
      console.error('Error getting visitor analytics:', error);
      return null;
    }
  }
};

// Seed data for initial setup
export const seedService = {


  async addInitialMessages(): Promise<void> {
    try {
      const messagesRef = collection(db, 'messages');
      const snapshot = await getDocs(query(messagesRef, limit(1)));
      
      // Only add seed data if no messages exist - ALL MESSAGES IN ONE SHOT
      if (snapshot.empty) {
        console.log('Database is empty, seeding with complete message set...');
        const seedMessages = [
          // Original seed messages
          {
            text: "You are not broken. You are breaking open, and that's how the light gets in. Every crack in your heart is a place where love can enter.",
            signoff: "From someone who survived the darkness",
            tag: "Hope",
            hearts: 127,
            createdAt: Timestamp.now(),
            status: 'active' as const
          },
          {
            text: "Starting over isn't giving up. It's having the courage to begin again, with all the wisdom your scars have taught you.",
            signoff: "From a fellow traveler",
            tag: "Starting over",
            hearts: 89,
            createdAt: Timestamp.now(),
            status: 'active' as const
          },
          {
            text: "Your feelings are valid. Your pain is real. And you deserve all the gentleness you're afraid to give yourself.",
            signoff: "From someone learning to be kind to themselves",
            tag: "Self-love",
            hearts: 203,
            createdAt: Timestamp.now(),
            status: 'active' as const
          },
          {
            text: "The person you're becoming is someone worth fighting for. Don't give up on them.",
            signoff: "From someone who believes in you",
            tag: "Encouragement",
            hearts: 156,
            createdAt: Timestamp.now(),
            status: 'active' as const
          },
          {
            text: "Grief doesn't have a timeline. Take all the time you need to honor what you've lost and who you're becoming.",
            signoff: "From someone who knows",
            tag: "Loss",
            hearts: 94,
            createdAt: Timestamp.now(),
            status: 'active' as const
          },

          // Messages from Dale the creator
          {
            text: "I built this space because I know what it feels like to need a message and not know where to find one. You're not alone in whatever you're facing.",
            signoff: "Dale, creator of The Message Vault",
            tag: "Connection",
            hearts: 178,
            createdAt: Timestamp.now(),
            status: 'active' as const
          },
          {
            text: "Every single person who finds this vault deserves to feel seen, heard, and valued. That includes you, right now, reading this.",
            signoff: "Dale, creator of The Message Vault",
            tag: "Worth",
            hearts: 245,
            createdAt: Timestamp.now(),
            status: 'active' as const
          },
          {
            text: "Sometimes the bravest thing you can do is simply keep going when everything feels impossible. You're braver than you know.",
            signoff: "Dale, creator of The Message Vault",
            tag: "Courage",
            hearts: 134,
            createdAt: Timestamp.now(),
            status: 'active' as const
          },

          // Messages from The Message Vault Team
          {
            text: "We moderate every message with love, ensuring this remains a safe space for healing. Your vulnerability here is protected and honored.",
            signoff: "The Message Vault Team",
            tag: "Safety",
            hearts: 167,
            createdAt: Timestamp.now(),
            status: 'active' as const
          },
          {
            text: "Thousands of messages flow through this vault daily. Each one carries someone's hope, love, or healing. You're part of something beautiful.",
            signoff: "The Message Vault Team",
            tag: "Community",
            hearts: 221,
            createdAt: Timestamp.now(),
            status: 'active' as const
          },
          {
            text: "Your story matters. Your pain has purpose. Your healing will inspire others. Thank you for being part of this community.",
            signoff: "The Message Vault Team",
            tag: "Purpose",
            hearts: 189,
            createdAt: Timestamp.now(),
            status: 'active' as const
          },
          {
            text: "We see you taking the time to read these words when you're hurting. That takes courage. We're proud of you for seeking hope.",
            signoff: "The Message Vault Team",
            tag: "Recognition",
            hearts: 156,
            createdAt: Timestamp.now(),
            status: 'active' as const
          },

          // Messages from The Universe
          {
            text: "You were placed on this earth at exactly the right time, in exactly the right circumstances, to become exactly who you're meant to be.",
            signoff: "The Universe",
            tag: "Destiny",
            hearts: 298,
            createdAt: Timestamp.now(),
            status: 'active' as const
          },
          {
            text: "Every challenge you've faced has been preparing you for something greater. Trust the process, even when you can't see the destination.",
            signoff: "The Universe",
            tag: "Trust",
            hearts: 267,
            createdAt: Timestamp.now(),
            status: 'active' as const
          },
          {
            text: "The same energy that moves the stars through the sky flows through your heart. You are made of the same stuff as miracles.",
            signoff: "The Universe",
            tag: "Magic",
            hearts: 312,
            createdAt: Timestamp.now(),
            status: 'active' as const
          },
          {
            text: "Nothing in your life has been wasted. Every tear, every laugh, every moment of confusion - it's all been part of your becoming.",
            signoff: "The Universe",
            tag: "Meaning",
            hearts: 234,
            createdAt: Timestamp.now(),
            status: 'active' as const
          },
          {
            text: "You are not an accident. You are a carefully crafted response to the world's need for your unique brand of light.",
            signoff: "The Universe",
            tag: "Purpose",
            hearts: 289,
            createdAt: Timestamp.now(),
            status: 'active' as const
          },

          // Messages from The Stranger On The Bus
          {
            text: "I see you wearing that smile that doesn't quite reach your eyes. It's okay to not be okay. Your feelings are valid.",
            signoff: "The Stranger On The Bus",
            tag: "Validation",
            hearts: 143,
            createdAt: Timestamp.now(),
            status: 'active' as const
          },
          {
            text: "You looked out the window today like you were searching for something. Maybe it's hope. I hope you find it.",
            signoff: "The Stranger On The Bus",
            tag: "Hope",
            hearts: 176,
            createdAt: Timestamp.now(),
            status: 'active' as const
          },
          {
            text: "I noticed you helped that elderly person with their bag. In a world that can be cold, your kindness was a warm light.",
            signoff: "The Stranger On The Bus",
            tag: "Kindness",
            hearts: 198,
            createdAt: Timestamp.now(),
            status: 'active' as const
          },
          {
            text: "You've been on this bus every day this week, and every day you choose to keep going. That's not small. That's everything.",
            signoff: "The Stranger On The Bus",
            tag: "Perseverance",
            hearts: 165,
            createdAt: Timestamp.now(),
            status: 'active' as const
          },
          {
            text: "I heard you on the phone trying to comfort someone. You have a gift for making people feel less alone. Don't forget that about yourself.",
            signoff: "The Stranger On The Bus",
            tag: "Gift",
            hearts: 187,
            createdAt: Timestamp.now(),
            status: 'active' as const
          },
          {
            text: "We're all just strangers sharing the same journey for a few stops. But in this moment, you matter to me. You matter.",
            signoff: "The Stranger On The Bus",
            tag: "Connection",
            hearts: 209,
            createdAt: Timestamp.now(),
            status: 'active' as const
          }
        ];

        for (const message of seedMessages) {
          await addDoc(messagesRef, message);
        }
        
        console.log('Added initial seed messages to Firebase');
        
        // Initialize stats
        await addDoc(collection(db, 'analytics'), {
          messagesTaken: 0,
          messagesLeft: seedMessages.length,
          lastUpdated: Timestamp.now()
        });
      }
    } catch (error) {
      console.error('Error adding seed messages:', error);
    }
  }
};

export { db }; 