// Import required libraries.
const express = require('express');
const bodyParser = require('body-parser');

//Import routes
const amdinRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const taskRoutes = require("./routes/task");

//Import middleware

const headerToken = require("./middleware/header_token")

//Create the express app, and adding the relevant routes to the app.
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use("/user", headerToken);
app.use("/user", amdinRoutes);
app.use("/users", userRoutes);
app.use("/task", taskRoutes);


module.exports = app;
