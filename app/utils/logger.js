import { createLogger, format as _format, transports as _transports } from "winston";

/**
 * Winston logger instance configured for application logging.
 *
 * @constant
 * @type {import('winston').Logger}
 *
 * @description
 * Creates a logger that records messages with a minimum level of 'info'.
 * It logs messages in JSON format with timestamps.
 * 
 * - Errors (`level: 'error'`) are written to `logs/error.log`.
 * - All logs (`level: 'info'` and above) are written to `logs/combined.log`.
 */

export const logger = createLogger({
  level: 'info',
  format: _format.combine(
    _format.timestamp(),
    _format.json()
  ),
  transports: [
    new _transports.File({ filename: 'logs/error.log', level: 'error' }),
    new _transports.File({ filename: 'logs/combined.log' }),
  ],
});

/**
 * Adds a console transport to the logger in non-production environments.
 *
 * @description
 * When the application is not running in production (`NODE_ENV !== 'production'`),
 * this adds a `Console` transport to the Winston logger with simple formatting,
 * allowing log output to be printed to the terminal for easier debugging.
 */
if (process.env.NODE_ENV !== 'production') {
  logger.add(new _transports.Console({
    format: _format.simple(),
  }));
}