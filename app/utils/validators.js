/**
 * Validates a task object to ensure it meets the required criteria.
 *
 * @function
 * @param {Object} task - The task object to validate.
 * @param {string} task.title - The title of the task.
 * @returns {string[]} An array of validation error messages, empty if valid.
 *
 * @description
 * Checks that the task has a title of at least 3 characters and that it is a string.
 * Returns an array of error messages if any validations fail.
 */
export const validateTask = (task) => {
  const errors = [];
  if (!task.title || task.title.length < 3) {
    errors.push('The title needs to be 3 characters at least');
  }
  if (task.title && typeof task.title !== 'string') {
    errors.push('Invalid title value');
  }
  return errors;
};

/**
 * Validates a user object to ensure it meets the required criteria.
 *
 * @function
 * @param {Object} user - The user object to validate.
 * @param {string} user.password - The user's password.
 * @returns {string[]} An array of validation error messages, empty if valid.
 *
 * @description
 * Checks that the password is a string of at least 6 characters.
 * Returns an array of error messages if any validations fail.
 *
 * @note
 * The first condition mentions a minimum of 3 characters, but the message says 6.
 * Consider updating the logic to match the message or vice versa.
 */

export const validateUser = (user) => {
  const errors = [];
  if (!user.password || user.password.length < 3) {
    errors.push('The password needs to be 6 characters at least');
  }
  if (user.password && typeof user.password !== 'string') {
    errors.push('Invalid password value');
  }
  return errors;
};