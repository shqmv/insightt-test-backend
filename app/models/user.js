/**
 * @typedef {Object} UserSchemaCreateRequest
 * @property {string} email - User's email
 * @property {string} password - User's password
 */

/**
 * @typedef {Object} UserSchemaCreateResponse
 * @property {string} message - Response's message
 * @property {string} refreshToken - User's refresh token
 * @property {string} accessToken - User's access token
 */

/**
 * @typedef {Object} UserSchemaLoginRequest
 * @property {string} email - User's email
 * @property {string} password - User's password
 */

/**
 * @typedef {Object} UserSchemaLoginResponse
 * @property {string} message - Response's message
 * @property {string} refreshToken - User's refresh token
 * @property {string} accessToken - User's access token
 */

/**
 * @typedef {Object} UserSchemaRecoverResponse
 * @property {string} message - Response's message
 */

/**
 * @typedef {Object} UserSchemaLogoutRequest
 * @property {string} authorization - User's access token
 */

/**
 * @typedef {Object} UserSchemaLogoutResponse
 * @property {string} message - Response's message
 */