import { Router } from "express";

import { isAuthenticated } from "../middleware/auth.js";
import { createTask, getTasks, updateTask, updateTaskStatus, deleteTask } from "../controllers/taskController.js";

/**
 * Task-related routes using Express Router.
 *
 * @constant
 * @type {import('express').Router}
 *
 * @description
 * Defines endpoints for creating, retrieving, updating, marking as done, and deleting tasks.
 * All routes require the user to be authenticated via the `isAuthenticated` middleware.
 *
 * @routes
 * POST   /         - Create a new task
 * GET    /         - Get all tasks
 * PATCH  /:id      - Update a specific task
 * PATCH  /done/:id - Mark a specific task as done
 * DELETE /:id      - Delete a specific task
 */
export const taskRoutes = Router();
taskRoutes.post('/', isAuthenticated, createTask);
taskRoutes.get('/', isAuthenticated, getTasks);
taskRoutes.patch('/:id', isAuthenticated, updateTask);
taskRoutes.patch('/done/:id', isAuthenticated, updateTaskStatus);
taskRoutes.delete('/:id', isAuthenticated, deleteTask);