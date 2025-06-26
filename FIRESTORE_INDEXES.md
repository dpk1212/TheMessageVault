# Required Firestore Indexes for Candlewall Feature

## URGENT: Create these indexes in Firebase Console

The candlewall feature requires these composite indexes to work properly.

### How to Create Indexes:

**Option 1: Use the error links (Easiest)**
1. When you see the console error "The query requires an index", click the provided link
2. It will take you directly to the Firebase Console to create the index
3. Click "Create Index" 

**Option 2: Manual creation**
1. Go to Firebase Console: https://console.firebase.google.com/
2. Select your project: `themessagevault-84ea0`
3. Go to "Firestore Database" → "Indexes" tab
4. Click "Create Index"
5. Add the indexes below:

### Required Indexes:

#### Index 1: support_candles collection
- **Collection ID**: `support_candles`
- **Fields to index**:
  - `status` (Ascending)
  - `timestamp` (Descending)
- **Query scope**: Collection

#### Index 2: candle_support collection  
- **Collection ID**: `candle_support`
- **Fields to index**:
  - `candleId` (Ascending)
  - `sessionId` (Ascending)
- **Query scope**: Collection

### Why These Are Needed:

- **Index 1**: For the `getActiveCandles()` query that filters by status and orders by timestamp
- **Index 2**: For the `hasUserSupported()` query that checks if a user already supported a specific candle

### Index Creation Time:
- Indexes usually take 1-5 minutes to build
- You'll see "Building..." status initially
- Once complete, the candlewall will work perfectly!

## Alternative: Use the Auto-Generated Links

The fastest way is to:
1. Try submitting a candle (it will fail)
2. Look in browser console for the Firebase error
3. Click the provided link to auto-create the index
4. Wait for it to build (1-5 minutes)
5. Try again! 