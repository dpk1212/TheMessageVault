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

// Message operations
export const messageService = {
  // Get random message for taking
  async getRandomMessage(): Promise<Message | null> {
    try {
      const messagesRef = collection(db, 'messages');
      const q = query(
        messagesRef, 
        where('status', '==', 'active'),
        orderBy('createdAt', 'desc'),
        limit(50) // Get 50 recent messages and pick random from those
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
      
      console.log(`Found ${messages.length} messages, selecting random one`);
      return messages[Math.floor(Math.random() * messages.length)];
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

// Seed data for initial setup
export const seedService = {
  async addInitialMessages(): Promise<void> {
    try {
      const messagesRef = collection(db, 'messages');
      const snapshot = await getDocs(query(messagesRef, limit(1)));
      
      // Only add seed data if no messages exist
      if (snapshot.empty) {
        const seedMessages = [
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