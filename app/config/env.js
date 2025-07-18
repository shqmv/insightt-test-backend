import { config } from "dotenv"

config();

/**
 * Environment configuration object containing application settings.
 *
 * @constant
 * @type {Object}
 *
 * @description
 * Stores configuration values loaded from environment variables for the application.
 * Includes settings for the server port, Firebase service account, Firebase app configuration,
 * and MongoDB connection details. Defaults to port 3000 if `PORT` is not specified.
 */
export const env_data = {
  port: process.env.PORT || 3000,
  firebaseServiceAccount: JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT),
  firebaseApiKey: process.env.FIREBASE_API_KEY,
  firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
  firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
  firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  firebaseAppId: process.env.FIREBASE_APP_ID,
  mongoDbUri: process.env.MONGODB_URI,
  mongoDbDatabaseName: process.env.MONGODB_DATABASE_NAME,
  mongoDbCollectionTaskName: process.env.MONGODB_COLLECTION_TASK_NAME,
}