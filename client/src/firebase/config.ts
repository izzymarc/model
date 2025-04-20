import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported, Analytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBAzP919YPTA9f2lM8ijgiwh1xXvA_7qMk",
  authDomain: "model-e0deb.firebaseapp.com",
  projectId: "model-e0deb",
  storageBucket: "model-e0deb.appspot.com",
  messagingSenderId: "215934344615",
  appId: "1:215934344615:web:0d9334feffc6583f9fea82",
  measurementId: "G-FJVJ9QYPD2"
};

// Initialize Firebase - handle possible duplicate app initialization
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log("Firebase initialized successfully");
} catch (error) {
  // If already initialized, use the existing app
  const existingApps = getApps();
  app = existingApps.length ? existingApps[0] : initializeApp(firebaseConfig);
  console.warn("Using existing Firebase app instance");
}

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics conditionally
let analytics: Analytics | null = null;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

export { analytics };
export default app; 