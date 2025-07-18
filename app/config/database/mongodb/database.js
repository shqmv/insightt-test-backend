import { MongoClient, ServerApiVersion } from "mongodb";

import { env_data } from '../../env.js';

/**
 * MongoDB client instance connected using the provided connection URI.
 *
 * @constant
 * @type {MongoClient}
 *
 * @description
 * Initializes a new MongoClient with the specified server API version and strict mode enabled.
 * This client is configured to throw deprecation warnings and use Server API v1.
 *
 * Make sure to call `client.connect()` before performing any database operations.
 */
export const client = new MongoClient(env_data.mongoDbUri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

/**
 * Indicates whether the MongoDB client is connected to the database.
 *
 * @constant
 * @type {boolean}
 *
 * @description
 * A flag to track the connection status of the MongoDB client.
 * Set to `false` by default, indicating the client is not connected.
 * Update this flag to `true` after successfully calling `client.connect()`.
 */
let _isConnected = false;

/**
 * Establishes a connection to the MongoDB database using the configured client.
 *
 * @async
 * @function
 * @returns {Promise<MongoClient>} The connected MongoDB client instance.
 *
 * @description
 * Connects to the MongoDB database if not already connected. Checks the `_isConnected` flag
 * to avoid redundant connection attempts. If the connection is successful, updates the
 * `_isConnected` flag to `true` and logs a success message. If the connection fails, logs
 * the error and throws it.
 *
 * Make sure to handle the returned client appropriately for database operations.
 */
export async function connectToDatabase() {
  if (!_isConnected) {
    try {
      await client.connect();
      console.log("Connection to MongoDB stablished");
      _isConnected = true;
    } catch (error) {
      console.error("Error connecting to MongoDB: ", error);
      throw error;
    }
  }
  return client;
}

/**
 * Closes the connection to the MongoDB database.
 *
 * @async
 * @function
 * @returns {Promise<void>} A promise that resolves when the connection is closed.
 *
 * @description
 * Closes the MongoDB client connection if it is currently connected. Checks the `_isConnected` flag
 * to ensure the connection is only closed when necessary. Upon successful closure, logs a message
 * and sets the `_isConnected` flag to `false`. If the client is not connected, the function does nothing.
 */
export async function closeDatabaseConnection() {
  if (_isConnected) {
    await client.close();
    console.log("MongoDB connection was closed");
    _isConnected = false;
  }
}