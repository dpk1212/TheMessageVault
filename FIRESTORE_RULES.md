# Firestore Security Rules for The Message Vault

Go to Firebase Console → Firestore Database → Rules and replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to messages and analytics
    match /messages/{document} {
      allow read: if true;
      allow create: if request.auth == null; // Allow anonymous message creation
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

Click **"Publish"** to apply these rules.

This allows:
- ✅ Anyone to read messages and stats
- ✅ Anonymous users to create messages  
- ✅ Anonymous users to increment heart counts
- ✅ Stats tracking functionality
- ✅ Supporter wall functionality 