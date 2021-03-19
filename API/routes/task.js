// Import required libraries.
const express=require("express");

// Import middleware and controllers
const authenticator = require("../middleware/authenticator");
const taskController  = require("../controller/task");

// Define the router
const taskRouter = express.Router();

// Add login required (authenticator) middleware.
taskRouter.use('/', authenticator);

// Define routes that require user to be logged in.
taskRouter.get('/forUser/:id', taskController.getTasks);
taskRouter.post('/', taskController.createTask);

module.exports = taskRouter;
