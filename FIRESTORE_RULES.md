# Firestore Security Rules for The Message Vault

## URGENT: Apply these rules to your Firebase Console

Go to Firebase Console > Firestore Database > Rules and paste this:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to messages
    match /messages/{messageId} {
      allow read, write: if true;
    }
    
    // Allow read/write access to supporters  
    match /supporters/{supporterId} {
      allow read, write: if true;
    }
    
    // Allow read/write access to analytics
    match /analytics/{analyticsId} {
      allow read, write: if true;
    }
    
    // Allow read/write access to any other collections
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

## Important Notes:

1. **THESE ARE OPEN RULES** - They allow anyone to read/write your database
2. For production, you should implement proper authentication and more restrictive rules
3. For now, this gets the app working immediately
4. You can tighten security later once everything is functional

## How to Apply:

1. Go to https://console.firebase.google.com/
2. Select your project: `themessagevault-84ea0`
3. Go to "Firestore Database" in the left sidebar
4. Click the "Rules" tab
5. Replace the existing rules with the code above
6. Click "Publish"

The site should work immediately after applying these rules! 