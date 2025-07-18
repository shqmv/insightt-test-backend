import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import admin from 'firebase-admin';

import { env_data } from '../../env.js';
// import serviceAccount from './service_account.json' with { type: 'json' };

/**
 * Firebase configuration object for initializing the Firebase app.
 *
 * @constant
 * @type {Object}
 *
 * @description
 * Contains the configuration details required to connect to Firebase services.
 * The configuration includes API key, authentication domain, project ID, storage bucket,
 * messaging sender ID, and app ID, all sourced from environment variables.
 */
const firebaseConfig = {
  apiKey: env_data.firebaseApiKey,
  authDomain: env_data.firebaseAuthDomain,
  projectId: env_data.firebaseProjectId,
  storageBucket: env_data.firebaseStorageBucket,
  messagingSenderId: env_data.firebaseMessagingSenderId,
  appId: env_data.firebaseAppId,
};

/**
 * Initialized Firebase app instance.
 *
 * @constant
 * @type {FirebaseApp}
 *
 * @description
 * Initializes the Firebase app using the provided `firebaseConfig` object.
 * This instance serves as the entry point for interacting with Firebase services.
 */
const app = initializeApp(firebaseConfig);

/**
 * Firestore database instance for the initialized Firebase app.
 *
 * @constant
 * @type {Firestore}
 *
 * @description
 * Retrieves the Firestore database instance associated with the initialized Firebase app.
 * This instance is used to perform database operations such as reading and writing data to Firestore.
 */
export const db = getFirestore(app);

/**
 * Initialized Firebase Admin app instance.
 *
 * @constant
 * @type {admin.App}
 *
 * @description
 * Initializes the Firebase Admin SDK with the provided service account credentials.
 * This instance allows server-side access to Firebase services with administrative privileges.
 */
admin.initializeApp({
  // credential: admin.credential.cert(serviceAccount),
  credential: admin.credential.cert(env_data.firebaseServiceAccount),
});

/**
 * Firebase Authentication instance for the initialized Firebase app.
 *
 * @constant
 * @type {Auth}
 *
 * @description
 * Retrieves the Firebase Authentication instance associated with the initialized Firebase app.
 * This instance is used to manage user authentication operations, such as signing in, signing out,
 * and managing user sessions.
 */
export const auth = getAuth(app);

/**
 * Firebase Admin Authentication instance.
 *
 * @constant
 * @type {admin.auth.Auth}
 *
 * @description
 * Retrieves the Firebase Admin Authentication instance for the initialized Firebase Admin app.
 * This instance provides server-side access to manage user authentication, including creating,
 * updating, and deleting user accounts with administrative privileges.
 */
export const adminAuth = admin.auth();