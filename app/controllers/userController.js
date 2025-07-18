import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

import { auth, adminAuth } from "./../config/auth/firebase/auth.js";
import { validateUser } from "./../utils/validators.js"
import { getHttpStatusCode } from "./../utils/functions.js"

/**
 * Authenticates a user with email and password using Firebase Authentication.
 *
 * @async
 * @function
 * @param {Object} req - The HTTP request object containing email and password.
 * @param {Object} res - The HTTP response object used to send the result.
 * @returns {Promise<void>} A promise that resolves with authentication tokens or an error response.
 *
 * @description
 * Extracts email and password from the request body and attempts to sign in the user using
 * Firebase Authentication. Returns a 200 status with access and refresh tokens on success,
 * or an error status with the Firebase error code on failure.
 */
export const login = async (req, res) => {
  try {
    // Extract data from body
    const { email, password } = req.body;

    // Create data object
    /** @type { UserSchemaLoginRequest } */
    const requestData = {
      email: email,
      password: password
    }

    // Get user data
    const userCredential = await signInWithEmailAndPassword(auth, requestData.email, requestData.password);

    // Get token data
    const { refreshToken, accessToken } = userCredential.user.stsTokenManager;

    // Create response object
    /** @type { UserSchemaLoginResponse } */
    const responseData = {
      message: "Login exitoso",
      refreshToken: refreshToken,
      accessToken: accessToken
    }

    res.status(200).json(responseData);
  } catch (error) {
    // console.table(error);
    res.status(getHttpStatusCode(error.code)).json({ error: error.code });
  }
};

/**
 * Registers a new user with email and password using Firebase Authentication.
 *
 * @async
 * @function
 * @param {Object} req - The HTTP request object containing email and password.
 * @param {Object} res - The HTTP response object used to send the result.
 * @returns {Promise<void>} A promise that resolves with authentication tokens or an error response.
 *
 * @description
 * Extracts email and password from the request body, validates the password using `validateUser`.
 * If validation fails, returns a 400 status with validation errors. Creates a new user in Firebase
 * Authentication and returns a 201 status with access and refresh tokens on success, or an error
 * status with the Firebase error code on failure.
 */
export const register = async (req, res) => {
  try {
    // Extract data from body
    const { email, password } = req.body;

    // Validate data
    const validation = validateUser({ password });
    if (validation.length > 0) {
      return res.status(400).json({ "message": validation })
    }

    // Create data object
    /** @type { UserSchemaCreateRequest } */
    const insertData = {
      email: email,
      password: password
    }

    // Insert data object
    const userCredential = await createUserWithEmailAndPassword(auth, insertData.email, insertData.password);

    // Get token data
    const { refreshToken, accessToken } = userCredential.user.stsTokenManager;

    // Create response object
    /** @type { UserSchemaCreateResponse } */
    const responseData = {
      message: "User created",
      refreshToken: refreshToken,
      accessToken: accessToken
    }

    // Return response object
    res.status(201).json(responseData);
  } catch (error) {
    // console.table(error);
    res.status(getHttpStatusCode(error.code)).json({ error: error.code });
  }
};

/**
 * Sends a password reset email to the user via Firebase Authentication.
 *
 * @async
 * @function
 * @param {Object} req - The HTTP request object containing the user's email.
 * @param {Object} res - The HTTP response object used to send the result.
 * @returns {Promise<void>} A promise that resolves with a success message or an error response.
 *
 * @description
 * Extracts the email from the request body and sends a password reset email using Firebase
 * Authentication. Returns a 201 status with a success message on success, or an error status
 * with the Firebase error code on failure.
 */
export const recover = async (req, res) => {
  try {
    // Extract data from body
    const { email } = req.body;

    // Create data object
    /** @type { UserSchemaCreateRequest } */
    const recoverData = {
      email: email
    }

    // Recover data object
    await sendPasswordResetEmail(auth, recoverData.email);

    // Create response object
    /** @type { UserSchemaRecoverResponse } */
    const responseData = {
      message: "Email sent"
    }

    // Return response object
    res.status(201).json(responseData);
  } catch (error) {
    // console.table(error);
    res.status(getHttpStatusCode(error.code)).json({ error: error.code });
  }
};

/**
 * Logs out a user by revoking their refresh tokens using Firebase Admin Authentication.
 *
 * @async
 * @function
 * @param {Object} req - The HTTP request object containing the authorization header with a token.
 * @param {Object} res - The HTTP response object used to send the result.
 * @returns {Promise<void>} A promise that resolves with a success message or an error response.
 *
 * @description
 * Extracts the authorization token from the request header, validates its format, and verifies it
 * using Firebase Admin Authentication to obtain the user ID. Revokes the user's refresh tokens
 * and returns a 200 status with a success message on success, or a 401 or error status with the
 * Firebase error code on failure.
 */
export const logout = async (req, res) => {
  try {
    // Extract data from request
    const authHeader = req.headers.authorization;

    // Create data object
    /** @type { UserSchemaLogoutRequest } */
    const requestData = {
      authorization: authHeader
    }

    // Validate if token was received
    if (!requestData.authorization || !requestData.authorization.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token no proporcionado o inválido" });
    }

    // Extract token
    const idToken = requestData.authorization.split(" ")[1];

    // Verify token to get uid
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // Revoke auth
    await adminAuth.revokeRefreshTokens(uid);

    // Create response object
    /** @type { UserSchemaLogoutResponse } */
    const responseObject = {
      message: "Successful logout"
    }

    res.status(200).json(responseObject);
  } catch (error) {
    console.table(error);
    res.status(getHttpStatusCode(error.code)).json({ error: error.code });
  }
};