import { auth, db, storage } from './config';
import { connectAuthEmulator } from 'firebase/auth';
import { connectFirestoreEmulator } from 'firebase/firestore';
import { connectStorageEmulator } from 'firebase/storage';

/**
 * Connect to Firebase emulators when in development environment
 * or running on localhost
 */
export const connectToEmulators = () => {
  // Check if we're in development mode or on localhost
  if (window.location.hostname === 'localhost' || 
      window.location.hostname === '127.0.0.1' || 
      process.env.NODE_ENV === 'development') {
    
    // Track which emulators have been connected successfully
    const connected = {
      auth: false,
      firestore: false,
      storage: false
    };
    
    // Connect to Auth emulator
    try {
      connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
      connected.auth = true;
    } catch (error) {
      console.error('❌ Failed to connect to Auth emulator:', error);
    }
    
    // Connect to Firestore emulator
    try {
      connectFirestoreEmulator(db, 'localhost', 8080);
      connected.firestore = true;
    } catch (error) {
      console.error('❌ Failed to connect to Firestore emulator:', error);
    }
    
    // Connect to Storage emulator
    try {
      connectStorageEmulator(storage, 'localhost', 9199);
      connected.storage = true;
    } catch (error) {
      console.error('❌ Failed to connect to Storage emulator:', error);
    }
    
    // Log connected emulators
    const connectedServices = Object.entries(connected)
      .filter(([_, isConnected]) => isConnected)
      .map(([service]) => service);
    
    if (connectedServices.length > 0) {
      console.log(`📱 Connected to Firebase emulators: ${connectedServices.join(', ')}`);
    } else {
      console.warn('⚠️ No Firebase emulators were connected. Make sure they are running with: npm run emulators');
    }
  }
}; 