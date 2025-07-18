import express from "express";

import { userRoutes } from "./userRoutes.js";
import { taskRoutes } from "./taskRoutes.js";

/**
 * Main application routes using Express Router.
 *
 * @constant
 * @type {import('express').Router}
 *
 * @description
 * Defines the base route (`/`) that returns a simple JSON message,
 * and mounts user-related and task-related routes under `/users` and `/tasks` respectively.
 */
export const routes = express.Router();

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'API Rest' });
});
routes.use('/users', userRoutes);
routes.use('/tasks', taskRoutes);