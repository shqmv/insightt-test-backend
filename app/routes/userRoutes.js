import { Router } from "express";

import { login, register, logout, recover } from "../controllers/userController.js";

/**
 * User-related routes using Express Router.
 *
 * @constant
 * @type {import('express').Router}
 *
 * @description
 * Defines endpoints for user authentication and account management.
 *
 * @routes
 * POST /login    - Authenticate and log in a user
 * POST /register - Register a new user
 * POST /recover  - Initiate password recovery
 * POST /logout   - Log out the current user and revoke their token
 */
export const userRoutes = Router();
userRoutes.post('/login', login);
userRoutes.post('/register', register);
userRoutes.post('/recover', recover);
userRoutes.post('/logout', logout);