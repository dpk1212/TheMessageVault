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

// Firebase config - replace with your actual config
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "themessagevault-84ea0.firebaseapp.com",
  projectId: "themessagevault-84ea0",
  storageBucket: "themessagevault-84ea0.appspot.com",
  messagingSenderId: "362976942819",
  appId: "your-app-id"
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
      if (snapshot.empty) return null;
      
      const messages = snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data()
      } as Message));
      
      return messages[Math.floor(Math.random() * messages.length)];
    } catch (error) {
      console.error('Error getting random message:', error);
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
      const docRef = await addDoc(collection(db, 'messages'), {
        ...messageData,
        hearts: 0,
        createdAt: Timestamp.now(),
        status: 'active'
      });
      
      // Update stats
      await statsService.incrementMessagesLeft();
      
      return docRef.id;
    } catch (error) {
      console.error('Error adding message:', error);
      return null;
    }
  },

  // Increment heart count
  async addHeart(messageId: string): Promise<boolean> {
    try {
      const messageRef = doc(db, 'messages', messageId);
      await updateDoc(messageRef, {
        hearts: increment(1)
      });
      return true;
    } catch (error) {
      console.error('Error adding heart:', error);
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
      const snapshot = await getDocs(collection(db, 'analytics'));
      
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
      const statsRef = doc(db, 'analytics', 'stats');
      await updateDoc(statsRef, {
        messagesTaken: increment(1),
        lastUpdated: Timestamp.now()
      });
    } catch (error) {
      console.error('Error incrementing messages taken:', error);
    }
  },

  // Increment messages left
  async incrementMessagesLeft(): Promise<void> {
    try {
      const statsRef = doc(db, 'analytics', 'stats');
      await updateDoc(statsRef, {
        messagesLeft: increment(1),
        lastUpdated: Timestamp.now()
      });
    } catch (error) {
      console.error('Error incrementing messages left:', error);
    }
  }
};

export { db }; 