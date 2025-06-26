import { 
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
import { db, analyticsService } from './firebase';

export interface SupportCandle {
  id: string;
  situation: string;
  category: string;
  timestamp: Timestamp;
  expiresAt: Timestamp;
  lightsSent: number;
  messagesReceived: number;
  status: 'active' | 'expired';
  sessionId: string;
}

export interface CandleSupport {
  id: string;
  candleId: string;
  supportType: 'light' | 'message';
  message?: string;
  timestamp: Timestamp;
  sessionId: string;
}

export const candleService = {
  // Light a new candle (submit support request)
  async lightCandle(candleData: {
    situation: string;
    category: string;
  }): Promise<string | null> {
    try {
      const now = Timestamp.now();
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7); // 7 days from now
      
      const sessionId = await analyticsService.getCurrentSessionId();
      
      const docRef = await addDoc(collection(db, 'support_candles'), {
        situation: candleData.situation,
        category: candleData.category,
        sessionId,
        timestamp: now,
        expiresAt: Timestamp.fromDate(expiresAt),
        lightsSent: 0,
        messagesReceived: 0,
        status: 'active'
      });
      
      console.log('Candle lit successfully with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error lighting candle:', error);
      return null;
    }
  },

  // Get active candles for the wall
  async getActiveCandles(): Promise<SupportCandle[]> {
    try {
      const candlesRef = collection(db, 'support_candles');
      const q = query(
        candlesRef,
        where('status', '==', 'active'),
        orderBy('timestamp', 'desc'),
        limit(50)
      );
      
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as SupportCandle));
    } catch (error) {
      console.error('Error getting candles:', error);
      return [];
    }
  },

  // Send light (support) to a candle
  async sendLight(candleId: string): Promise<boolean> {
    try {
      const sessionId = await analyticsService.getCurrentSessionId();
      
      // Add support record
      await addDoc(collection(db, 'candle_support'), {
        candleId,
        supportType: 'light',
        sessionId,
        timestamp: Timestamp.now()
      });
      
      // Increment lights count on candle
      const candleRef = doc(db, 'support_candles', candleId);
      await updateDoc(candleRef, {
        lightsSent: increment(1)
      });
      
      console.log('Light sent to candle:', candleId);
      return true;
    } catch (error) {
      console.error('Error sending light:', error);
      return false;
    }
  },

  // Send message support to a candle
  async sendMessage(candleId: string, message: string): Promise<boolean> {
    try {
      const sessionId = await analyticsService.getCurrentSessionId();
      
      // Add support record with message
      await addDoc(collection(db, 'candle_support'), {
        candleId,
        supportType: 'message',
        message,
        sessionId,
        timestamp: Timestamp.now()
      });
      
      // Increment messages count on candle
      const candleRef = doc(db, 'support_candles', candleId);
      await updateDoc(candleRef, {
        messagesReceived: increment(1)
      });
      
      console.log('Message sent to candle:', candleId);
      return true;
    } catch (error) {
      console.error('Error sending message:', error);
      return false;
    }
  },

  // Check if user has already supported this candle
  async hasUserSupported(candleId: string): Promise<boolean> {
    try {
      const sessionId = await analyticsService.getCurrentSessionId();
      const supportRef = collection(db, 'candle_support');
      const q = query(
        supportRef,
        where('candleId', '==', candleId),
        where('sessionId', '==', sessionId),
        limit(1)
      );
      
      const snapshot = await getDocs(q);
      return !snapshot.empty;
    } catch (error) {
      console.error('Error checking user support:', error);
      return false;
    }
  }
};
