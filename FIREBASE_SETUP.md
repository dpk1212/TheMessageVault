# Firebase Setup for The Message Vault

## 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Name it "themessagevault-84ea0" (or similar)
4. Enable Google Analytics (optional)
5. Create project

## 2. Set up Firestore Database

1. In your Firebase project, go to "Firestore Database"
2. Click "Create database"
3. Start in **production mode** for security
4. Choose your preferred location (US-central1 recommended)

## 3. Configure Security Rules

In Firestore Database > Rules, replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to messages and analytics
    match /messages/{document} {
      allow read: if true;
      allow create: if request.auth == null; // Allow anonymous writes
      allow update: if request.auth == null && 
        resource.data.keys().hasOnly(['hearts']) && 
        request.resource.data.hearts == resource.data.hearts + 1;
    }
    
    match /analytics/{document} {
      allow read: if true;
      allow write: if true; // For stats updates
    }
    
    match /supporters/{document} {
      allow read: if true;
      allow create: if true;
    }
  }
}
```

## 4. Get Your Config

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Web" icon to add a web app
4. Register your app with a nickname
5. Copy the config object

## 5. Update Firebase Config

Replace the config in `src/services/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

## 6. Test the Connection

1. Build and deploy your app
2. Try leaving a message - it should save to Firestore
3. Check your Firebase Console > Firestore to see the data
4. Try taking a message - it should load from Firestore

## Collections Structure

Your Firestore will have these collections:

- **messages**: User-submitted messages
  - `text`: string
  - `signoff`: string  
  - `tag`: string
  - `hearts`: number
  - `createdAt`: timestamp
  - `status`: 'active' | 'reported' | 'removed'

- **analytics**: Usage statistics
  - `messagesTaken`: number
  - `messagesLeft`: number
  - `lastUpdated`: timestamp

- **supporters**: Supporter wall entries
  - `name`: string
  - `tier`: 'kindness' | 'compassion' | 'healing'
  - `joinedDate`: timestamp
  - `message`: string (optional)

## That's it!

Once configured, your app will:
- ✅ Save new messages to Firebase
- ✅ Load random messages from Firebase  
- ✅ Track heart counts in real-time
- ✅ Update vault statistics
- ✅ Handle moderation and reporting 