/**
 * Global error handling middleware for Express.
 *
 * @function
 * @param {Object} err - The error object, which may contain a `status` and `message` property.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object used to send the error response.
 * @param {Function} next - The next middleware function (not used but required by Express for error handling).
 * @returns {void}
 *
 * @description
 * Logs the error stack to the console and sends a JSON response with the error message and appropriate status code.
 * Defaults to HTTP 500 and a generic message if specific details are not provided.
 */
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  });
};