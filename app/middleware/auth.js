import { adminAuth } from "../config/auth/firebase/auth.js";

/**
 * Middleware to authenticate requests using Firebase Admin Authentication.
 *
 * @async
 * @function
 * @param {Object} req - The HTTP request object containing the authorization header with a Bearer token.
 * @param {Object} res - The HTTP response object used to send error responses if authentication fails.
 * @param {Function} next - The next middleware function to call if authentication is successful.
 * @returns {Promise<void>} A promise that resolves when the user is authenticated, or sends a 401 response on failure.
 *
 * @description
 * Extracts the Bearer token from the authorization header. Verifies the token using Firebase Admin SDK,
 * checks whether it has been revoked, and attaches the decoded user data to the request object if valid.
 * Sends a 401 response if the token is missing, invalid, or revoked.
 */
export const isAuthenticated = async (req, res, next) => {
  try {
    const idToken = req.headers.authorization?.split('Bearer ')[1];
    if (!idToken) {
      return res.status(401).json({ error: 'No se proporcionó token' });
    }

    // Verify token and get decoded data
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // Get user's information and verify if token was revoke
    const user = await adminAuth.getUser(uid);
    const tokenValidSince = Math.floor(new Date(user.tokensValidAfterTime).getTime() / 1000); // Conver to seconds

    // Compare iat (issued-at time, in seconds) with revoke time
    if (decodedToken.iat < tokenValidSince) {
      return res.status(401).json({ error: 'Token revocado o inválido' });
    }

    // If token is valid, add user's data to request
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: `Invalid token: ${error.message}` });
  }
};