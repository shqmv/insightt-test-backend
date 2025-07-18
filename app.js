import express, { json, urlencoded } from "express";
import cors from "cors";

import { routes } from "./app/routes/index.js";
import { errorHandler } from "./app/middleware/error.js";
import { logger } from "./app/utils/logger.js";
import { env_data } from './app/config/env.js';
import { connectToDatabase, closeDatabaseConnection } from "./app/config/database/mongodb/database.js"

/**
 * Initializes and configures the Express application.
 *
 * @description
 * - Applies CORS middleware with specific origin, methods, and headers.
 * - Parses incoming requests with JSON and URL-encoded payloads.
 * - Mounts main API routes under `/api`.
 * - Registers a global error handler middleware.
 * - Connects to the database and starts the server on the specified port.
 * - Handles graceful shutdown on `SIGINT` by closing the database connection.
 */
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(json());
app.use(urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Error handling
app.use(errorHandler);

async function startApp() {
  try {
    await connectToDatabase();
    app.listen(env_data.port, () => {
      logger.info(`Server started in port ${env_data.port}`);
    });
  } catch (error) {
    logger.error('Error initializing aplication: ', error);
    process.exit(1);
  }
}

// Closing server event
process.on('SIGINT', async () => {
  await closeDatabaseConnection();
  process.exit(0);
});

// Start server
startApp();