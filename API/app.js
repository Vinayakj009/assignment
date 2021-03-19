// Import required libraries.
const express = require('express');
const mongoose = require('mongoose'); // I am using mongoose to connect to the Mongo DB.
const bodyParser = require('body-parser');

//Import routes
const userRoutes = require("./routes/user");
const amdinRoutes = require("./routes/admin");

//Import middleware

const headerToken = require("./middleware/header_token")

//Create the express app, and adding the relevant routes to the app.
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use("/user", headerToken);
app.use("/user", amdinRoutes);
app.use("/users", userRoutes);

//Connect to MongoDB.
//If you are running the app using docker, then update the docker-compose file with the required env variables.
//If you are running the app without using docker, then update the requried env variables in the package.json file.
mongoose.connect("mongodb://" + process.env.MONGO_USERNAME + ":" + process.env.MONGO_PASSWORD + "@" + process.env.MONGO_HOST + ":" + process.env.MONGO_PORT + "/" + process.env.MONGO_DB_NAME + "?authSource=admin") // Adding authSource is required. You can change the name of the admin db for security, but mention it here.
  .then(() => {
    console.log("Connected to mongodb");
  }).catch(() => {
    console.log("Error: Cound not connect to mongodb");
  })

module.exports = app;
