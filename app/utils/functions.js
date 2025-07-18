import { FirebaseErrors } from "./../utils/const.js"

/**
 * Retrieves the corresponding HTTP status code for a given Firebase Authentication error code.
 *
 * @function
 * @param {string} firebaseCode - The Firebase error code (e.g., 'auth/invalid-email').
 * @returns {number|undefined} The associated HTTP status code, or `undefined` if no match is found.
 *
 * @description
 * Searches the `FirebaseErrors` map to find which HTTP status code contains the provided
 * Firebase error code. Returns the status code as a number or `undefined` if not found.
 */
export function getHttpStatusCode(firebaseCode) {
  return Number(
    Object.keys(FirebaseErrors).find((key) =>
      FirebaseErrors[Number(key)].includes(firebaseCode)
    )
  );
}