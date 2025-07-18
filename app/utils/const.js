/**
 * A frozen object mapping HTTP status codes to Firebase Authentication error codes.
 *
 * @constant
 * @type {Object<number, string[]>}
 *
 * @description
 * Maps specific HTTP status codes to corresponding Firebase Auth error identifiers to
 * standardize error handling in the application.
 */
export const FirebaseErrors = Object.freeze({
  400: ['auth/wrong-password', 'auth/invalid-email'],
  401: ['auth/invalid-credential'],
  404: ['auth/user-not-found'],
  409: ['auth/email-already-in-use'],
  429: ['auth/too-many-requests'],
});