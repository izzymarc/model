import React, { useEffect, useState } from 'react';
import { app, auth, db, storage } from '../../lib/firebase';
import { query, collection, getDocs, limit } from 'firebase/firestore';
import { ref, listAll } from 'firebase/storage';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { motion } from 'framer-motion';

const FirebaseStatus: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState<'testing' | 'connected' | 'error'>('testing');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [firebaseInfo, setFirebaseInfo] = useState<any>(null);
  const [testResults, setTestResults] = useState<{
    auth: boolean;
    firestore: boolean;
    storage: boolean;
  }>({ 
    auth: false, 
    firestore: false, 
    storage: false 
  });

  useEffect(() => {
    const testConnection = async () => {
      try {
        let results = { auth: false, firestore: false, storage: false };
        let info: any = {};
        
        // Test Firestore connection
        try {
          const q = query(collection(db, 'users'), limit(1));
          const querySnapshot = await getDocs(q);
          results.firestore = true;
          info.firestore = {
            connected: true,
            collections: ['users', 'portfolio', 'blogPosts', 'media'],
            documentExists: querySnapshot.size > 0
          };
        } catch (err) {
          console.error('Firestore connection error:', err);
          info.firestore = { connected: false, error: err instanceof Error ? err.message : String(err) };
        }
        
        // Test Storage connection
        try {
          const storageRef = ref(storage);
          const result = await listAll(storageRef);
          results.storage = true;
          info.storage = {
            connected: true,
            prefixes: result.prefixes.map(prefix => prefix.fullPath),
            files: result.items.length
          };
        } catch (err) {
          console.error('Storage connection error:', err);
          info.storage = { connected: false, error: err instanceof Error ? err.message : String(err) };
        }
        
        // Test Auth connection
        try {
          // Just checking if auth is available
          const authInstance = getAuth(app);
          results.auth = true;
          info.auth = {
            connected: true,
            currentUser: auth.currentUser?.email || 'Not signed in'
          };
        } catch (err) {
          console.error('Auth connection error:', err);
          info.auth = { connected: false, error: err instanceof Error ? err.message : String(err) };
        }

        // Set results
        setTestResults(results);
        setFirebaseInfo(info);
        
        if (results.auth && results.firestore && results.storage) {
          setConnectionStatus('connected');
        } else {
          setConnectionStatus('error');
          setErrorMessage('Some Firebase services are not connected');
        }
      } catch (err) {
        console.error('Failed to test Firebase connection:', err);
        setConnectionStatus('error');
        setErrorMessage(err instanceof Error ? err.message : String(err));
      }
    };

    testConnection();
  }, []);

  const ServiceStatus = ({ connected, label }: { connected: boolean; label: string }) => (
    <div className="flex items-center space-x-2">
      <div className={`w-3 h-3 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
      <span>{label}: {connected ? 'Connected' : 'Disconnected'}</span>
    </div>
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Firebase Status</h2>
      
      <div className="mb-6 p-4 rounded-lg bg-white dark:bg-gray-800 shadow">
        <div className="text-lg font-semibold mb-3">Connection Status</div>
        
        {connectionStatus === 'testing' && (
          <div className="flex items-center text-yellow-600 dark:text-yellow-500">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Testing connection...
          </div>
        )}
        
        {connectionStatus === 'connected' && (
          <div className="text-green-600 dark:text-green-500 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Connected to Firebase
          </div>
        )}
        
        {connectionStatus === 'error' && (
          <div className="text-red-600 dark:text-red-500">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Connection Error
            </div>
            {errorMessage && <div className="mt-2 text-sm bg-red-50 dark:bg-red-900/20 p-2 rounded">{errorMessage}</div>}
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <motion.div 
          whileHover={{ y: -5 }}
          className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow"
        >
          <h3 className="font-semibold mb-3">Authentication</h3>
          <ServiceStatus connected={testResults.auth} label="Auth Service" />
          {firebaseInfo?.auth?.currentUser && (
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Current user: {firebaseInfo.auth.currentUser}
            </div>
          )}
        </motion.div>
        
        <motion.div 
          whileHover={{ y: -5 }}
          className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow"
        >
          <h3 className="font-semibold mb-3">Firestore</h3>
          <ServiceStatus connected={testResults.firestore} label="Firestore Service" />
          {firebaseInfo?.firestore?.collections && (
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Collections: {firebaseInfo.firestore.collections.join(', ')}
            </div>
          )}
        </motion.div>
        
        <motion.div 
          whileHover={{ y: -5 }}
          className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow"
        >
          <h3 className="font-semibold mb-3">Storage</h3>
          <ServiceStatus connected={testResults.storage} label="Storage Service" />
          {firebaseInfo?.storage?.files !== undefined && (
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Files in root: {firebaseInfo.storage.files}
            </div>
          )}
        </motion.div>
      </div>
      
      <div className="mt-6">
        <div className="font-semibold mb-2">Firebase Configuration:</div>
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded text-sm font-mono">
          <div><span className="text-gray-500 dark:text-gray-400">Project ID:</span> {import.meta.env.VITE_FIREBASE_PROJECT_ID || 'Not configured'}</div>
          <div><span className="text-gray-500 dark:text-gray-400">Auth Domain:</span> {import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'Not configured'}</div>
          <div><span className="text-gray-500 dark:text-gray-400">Storage Bucket:</span> {import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'Not configured'}</div>
        </div>
      </div>
      
      {firebaseInfo && (
        <div className="mt-6">
          <div className="font-semibold mb-2">Firebase Connection Details:</div>
          <pre className="bg-gray-50 dark:bg-gray-700 p-3 rounded text-sm overflow-auto max-h-60">
            {JSON.stringify(firebaseInfo, null, 2)}
          </pre>
        </div>
      )}
      
      <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
        <p>
          <strong>Note:</strong> If you're seeing connection errors, make sure:
        </p>
        <ul className="list-disc pl-5 mt-2">
          <li>Your Firebase project is correctly set up</li>
          <li>You've set up the right permissions for Auth, Firestore, and Storage</li>
          <li>Your .env file contains correct Firebase configuration values</li>
          <li>You've initialized Firebase with <code>firebase-tools</code> if you're using local emulators</li>
        </ul>
      </div>
    </div>
  );
};

export default FirebaseStatus; 