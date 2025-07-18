/**
 * @typedef {Object} TaskSchemaCreateRequest
 * @property {string} title - Task's title
 * @property {boolean} done - Task's completition
 * @property {string} createdBy - User who created this task
 * @property {Date} createdAt - Creation date
 * @property {string | null} updatedBy - User who updated this task
 * @property {Date | null} updatedAt - Update date
 */

/**
 * @typedef {Object} TaskSchemaCreateResponse
 * @property {string} message - Response's message
 * @property {string} _id - Task's id
 * @property {string} title - Task's title
 * @property {boolean} done - Task's completition
 * @property {string} createdBy - User who created this task
 * @property {Date} createdAt - Creation date
 * @property {null} updatedBy - User who updated this task
 * @property {null} updatedAt - Update date
 */

/**
 * @typedef {Object} TaskSchemaGetResponse
 * @property {string} _id - Task's id
 * @property {string} title - Task's title
 * @property {boolean} done - Task's completition
 * @property {string} createdBy - User who created this task
 * @property {Date} createdAt - Creation date
 * @property {string | null} updatedBy - User who updated this task
 * @property {Date | null} updatedAt - Update date
 */

/**
 * @typedef {Object} TaskSchemaUpdateRequest
 * @property {string | null} title - Task's title
 * @property {string | null} updatedBy - User who updated this task
 * @property {Date | null} updatedAt - Update date
 */

/**
 * @typedef {Object} TaskSchemaUpdateResponse
 * @property {string} message - Response's message
 * @property {string} _id - Task's id
 * @property {string} title - Task's title
 * @property {boolean} done - Task's completition
 * @property {string} createdBy - User who created this task
 * @property {Date} createdAt - Creation date
 * @property {string | null} updatedBy - User who updated this task
 * @property {Date | null} updatedAt - Update date
 */

/**
 * @typedef {Object} TaskSchemaDeleteResponse
 * @property {string} message - Response's message
 */