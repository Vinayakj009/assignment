// Import required libraries.
const express=require("express");

// Import controllers
const adminController  = require("../controller/admin");

// Define the router
const admin_router = express.Router();

// Define non-logged in routes
admin_router.post('/', adminController.createUser);
admin_router.delete('/', adminController.deleteUser);

module.exports = admin_router;
