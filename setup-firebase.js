import admin from 'firebase-admin';
import { readFileSync } from 'fs';

// Initialize Firebase Admin
const serviceAccount = JSON.parse(readFileSync('./service-account.json', 'utf8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'model-e0deb.appspot.com'
});

const db = admin.firestore();
const auth = admin.auth();

// Enable Email/Password authentication
async function enableEmailPasswordAuth() {
  try {
    // Create a new user with email/password
    const user = await auth.createUser({
      email: 'admin@example.com',
      password: 'admin123',
      displayName: 'Admin User'
    });
    
    // Set custom claims for admin role
    await auth.setCustomUserClaims(user.uid, { admin: true });
    console.log('Admin user created and custom claims set');
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
}

// Create initial collections and documents
async function createInitialData() {
  const collections = {
    users: {
      admin: {
        email: 'admin@example.com',
        role: 'admin',
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      }
    },
    portfolio: {
      initial: {
        title: 'Sample Portfolio Item',
        description: 'This is a sample portfolio item',
        imageUrl: '',
        category: 'fashion',
        isPublished: true,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      }
    },
    blogPosts: {
      initial: {
        title: 'Welcome to the Blog',
        slug: 'welcome-to-the-blog',
        content: 'This is a sample blog post',
        excerpt: 'Welcome to our blog',
        isPublished: true,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      }
    }
  };

  for (const [collectionName, documents] of Object.entries(collections)) {
    for (const [docId, data] of Object.entries(documents)) {
      try {
        await db.collection(collectionName).doc(docId).set(data);
        console.log(`Created ${docId} in ${collectionName} collection`);
      } catch (error) {
        console.error(`Error creating ${docId} in ${collectionName}:`, error);
      }
    }
  }
}

// Set up Firestore security rules
async function setupFirestoreRules() {
  const rules = `
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /portfolio/{itemId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /blogPosts/{postId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
`;

  try {
    await admin.securityRules().releaseFirestoreRulesetFromSource(rules);
    console.log('Firestore security rules updated');
  } catch (error) {
    console.error('Error setting Firestore rules:', error);
  }
}

// Set up Storage security rules
async function setupStorageRules() {
  const rules = `
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
`;

  try {
    const bucket = admin.storage().bucket();
    await bucket.setMetadata({
      metadata: {
        firebaseStorageDownloadTokens: 'default'
      }
    });
    console.log('Storage bucket configured');
  } catch (error) {
    console.error('Error configuring storage bucket:', error);
  }
}

// Run setup
async function setupFirebase() {
  try {
    await enableEmailPasswordAuth();
    await setupFirestoreRules();
    await setupStorageRules();
    await createInitialData();
    console.log('Firebase setup completed successfully');
  } catch (error) {
    console.error('Error during Firebase setup:', error);
  } finally {
    process.exit();
  }
}

setupFirebase(); 