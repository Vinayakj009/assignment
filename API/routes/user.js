// Import required libraries.
const express=require("express");

// Import middleware and controllers
const authenticator = require("../middleware/authenticator");
const userController  = require("../controller/user");

// Define the router
const user_router = express.Router();

// Define non-logged in routes
user_router.post('/login', userController.login);

// Add login required (authenticator) middleware.
user_router.use('/', authenticator);

// Define routes that require user to be logged in.
user_router.get('/', userController.getUsers);

module.exports = user_router;
