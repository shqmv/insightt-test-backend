import { ObjectId } from "mongodb";

import { client } from "./../config/database/mongodb/database.js"
import { env_data } from "../config/env.js";
import { validateTask } from "./../utils/validators.js"

/**
 * Creates a new task in the MongoDB database.
 *
 * @async
 * @function
 * @param {Object} req - The HTTP request object containing user authentication and task data.
 * @param {Object} res - The HTTP response object used to send the result.
 * @returns {Promise<void>} A promise that resolves when the task is created or an error is handled.
 *
 * @description
 * Extracts the user ID from the request and task title from the request body. Validates the task title
 * using the `validateTask` function. If validation fails, returns a 400 status with validation errors.
 * Creates a task object with the provided title, user ID, and timestamps, then inserts it into the
 * MongoDB collection specified in `env_data`. Returns a 201 status with the created task details
 * on success, or a 500 status with an error message on failure.
 */
export const createTask = async (req, res) => {
  try {
    // Extract user id
    const userId = req.user.uid;

    // Extract data from body
    const { title } = req.body;

    // Validate data
    const validation = validateTask({ title });
    if (validation.length > 0) {
      return res.status(400).json({ "message": validation })
    }

    // Create data object
    /** @type { TaskSchemaCreateRequest } */
    const insertData = {
      title: title,
      done: false,
      createdBy: userId,
      createdAt: new Date(),
      updatedBy: null,
      updatedAt: null
    }

    // Insert data object
    const task = await client.db(env_data.mongoDbDatabaseName).collection(env_data.mongoDbCollectionTaskName).insertOne(insertData);

    // Create response object
    /** @type { TaskSchemaCreateResponse } */
    const responseData = {
      message: "Task created",
      _id: task.insertedId,
      ...insertData
    }

    // Return response object
    res.status(201).json(responseData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Retrieves all tasks for the authenticated user from the MongoDB database.
 *
 * @async
 * @function
 * @param {Object} req - The HTTP request object containing user authentication data.
 * @param {Object} res - The HTTP response object used to send the result.
 * @returns {Promise<void>} A promise that resolves with the list of tasks or an error response.
 *
 * @description
 * Extracts the user ID from the request and queries the MongoDB collection specified in `env_data`
 * for tasks created by the user. Returns a 200 status with an array of tasks on success, or a 500
 * status with an error message on failure.
 */
export const getTasks = async (req, res) => {
  try {
    // Extract user id
    const userId = req.user.uid;

    // Get tasks
    /** @type { Array<TaskSchemaGetResponse> } */
    const tasks = await client.db(env_data.mongoDbDatabaseName)
      .collection(env_data.mongoDbCollectionTaskName)
      .find({ createdBy: userId })
      .toArray();

    // Return response object
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Updates an existing task in the MongoDB database.
 *
 * @async
 * @function
 * @param {Object} req - The HTTP request object containing user authentication, task ID, and update data.
 * @param {Object} res - The HTTP response object used to send the result.
 * @returns {Promise<void>} A promise that resolves with the updated task or an error response.
 *
 * @description
 * Extracts the user ID from the request and task ID from the URL parameters. Validates the task ID
 * and checks if the task exists and belongs to the user. Validates the updated title using the
 * `validateTask` function. If validation fails or the task is not found, returns a 400 or 404 status
 * respectively. Updates the task with the new title, user ID, and timestamp, then saves it to the
 * MongoDB collection specified in `env_data`. Returns a 200 status with the updated task details
 * on success, or a 500 status with an error message on failure.
 */
export const updateTask = async (req, res) => {
  try {
    // Extract user id
    const userId = req.user.uid;

    // Extract and validate task id
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid task id' });
    }

    // Get task
    /** @type { TaskSchemaGetResponse } */
    const task = await client.db(env_data.mongoDbDatabaseName)
      .collection(env_data.mongoDbCollectionTaskName)
      .findOne({ _id: new ObjectId(id), createdBy: userId });

      // Check if task exists
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Extract data from body
    const { title } = req.body;

    // Validate data
    const validation = validateTask({ title });
    if (validation.length > 0) {
      return res.status(400).json({ "message": validation })
    }

    // Update values
    if (title) task.title = title;
    task.updatedBy = userId;
    task.updatedAt = new Date();

    // Update MongoDB
    /** @type { import('mongodb').UpdateResult } */
    await client.db(env_data.mongoDbDatabaseName)
      .collection(env_data.mongoDbCollectionTaskName)
      .updateOne(
        { _id: new ObjectId(id), createdBy: userId },
        { $set: task }
      );

    // Create response object
    /** @type { TaskSchemaUpdateResponse } */
    const responseObject = {
      message: "Record updated",
      ...task
    }

    // Devolver la tarea actualizada
    res.status(200).json(responseObject);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Error updating task' });
  }
};

/**
 * Updates the status of an existing task in the MongoDB database.
 *
 * @async
 * @function
 * @param {Object} req - The HTTP request object containing user authentication, task ID, and status data.
 * @param {Object} res - The HTTP response object used to send the result.
 * @returns {Promise<void>} A promise that resolves with the updated task or an error response.
 *
 * @description
 * Extracts the user ID from the request and task ID from the URL parameters. Validates the task ID
 * and checks if the task exists and belongs to the user. Extracts the `done` status from the request
 * body, defaulting to `false` if not provided. Updates the task's status, user ID, and timestamp, then
 * saves it to the MongoDB collection specified in `env_data`. Returns a 200 status with the updated
 * task details on success, or a 400, 404, or 500 status with an error message on failure.
 */
export const updateTaskStatus = async (req, res) => {
  try {
    // Extract user id
    const userId = req.user.uid;

    // Extract and validate task id
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid task id' });
    }

    // Extact data from body
    const { done = false } = req.body;

    // Get task
    /** @type { TaskSchemaGetResponse } */
    const task = await client.db(env_data.mongoDbDatabaseName)
      .collection(env_data.mongoDbCollectionTaskName)
      .findOne({ _id: new ObjectId(id), createdBy: userId });

    // Check if task exists
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Update values
    task.done = done;
    task.updatedBy = userId;
    task.updatedAt = new Date();

    // Update MongoDB
    /** @type { import('mongodb').UpdateResult } */
    await client.db(env_data.mongoDbDatabaseName)
      .collection(env_data.mongoDbCollectionTaskName)
      .updateOne(
        { _id: new ObjectId(id), createdBy: userId },
        { $set: task }
      );

    // Create response object
    /** @type { TaskSchemaUpdateResponse } */
    const responseObject = {
      message: "Status updated",
      ...task
    }

    // Devolver la tarea actualizada
    res.status(200).json(responseObject);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Error updating task' });
  }
};

/**
 * Deletes a task from the MongoDB database.
 *
 * @async
 * @function
 * @param {Object} req - The HTTP request object containing user authentication and task ID.
 * @param {Object} res - The HTTP response object used to send the result.
 * @returns {Promise<void>} A promise that resolves with a success message or an error response.
 *
 * @description
 * Extracts the user ID from the request and task ID from the URL parameters. Validates the task ID
 * and checks if the task exists and belongs to the user. If valid, deletes the task from the MongoDB
 * collection specified in `env_data`. Returns a 200 status with a success message on deletion, or a
 * 400, 404, or 500 status with an error message on failure.
 */
export const deleteTask = async (req, res) => {
  try {
    // Extract user id
    const userId = req.user.uid;

    // Extract task id
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid task id' });
    }

    // Get task
    const task = await client.db(env_data.mongoDbDatabaseName)
      .collection(env_data.mongoDbCollectionTaskName)
      .findOne({ _id: new ObjectId(id), createdBy: userId });

    // Check if task exists
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Delete record
    await client.db(env_data.mongoDbDatabaseName)
      .collection(env_data.mongoDbCollectionTaskName)
      .deleteOne({ _id: new ObjectId(id), createdBy: userId });
    
    res.status(200).json({ "message": "Record deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};