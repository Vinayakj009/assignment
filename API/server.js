const http = require('http');
const app = require('./app');
const mongoose = require('mongoose'); // I am using mongoose to connect to the Mongo DB.
const debug = require('debug')('node-angular');

/* I have got most of this code from the course.
   While Max did not explain what the following function does, I have a general idea of what it does.
   The following function check whether the supplied port argument is a named pipe, or a port to be used.
   The function returns the file name as it is, if it named pipe, it returns the name as a string.
   If the arugment is a number greater than 0, then it is a valid port, and the function returns the integer port.
   Else it returns a false, indicating that there was an error.
*/
const normalizePort = val => {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    //named pipe
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

/* This is a callback function, which is called if there is an error while initializing the server */
const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.lerror(bind + " required elevated privilages");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit;
      break;
    default:
      throw error;
  }
}

/* Tthis is a callback which is called when the server has started listening for http calls via a port, or named pipe */

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  debug("Listening on " + bind);
};


//Connect to MongoDB.
//If you are running the app using docker, then update the docker-compose file with the required env variables.
//If you are running the app without using docker, then update the requried env variables in the package.json file.
mongoose.connect("mongodb://" + process.env.MONGO_USERNAME + ":" + process.env.MONGO_PASSWORD + "@" + process.env.MONGO_HOST + ":" + process.env.MONGO_PORT + "/" + process.env.MONGO_DB_NAME + "?authSource=admin",
  { useNewUrlParser: true, useUnifiedTopology: true }) // Adding authSource is required. You can change the name of the admin db for security, but mention it here.
  .then(() => {
    console.log("Connected to mongodb");
  }).catch(() => {
    console.log("Error: Cound not connect to mongodb");
  })

const port = normalizePort(process.env.PORT || 8000); //Normalise port function from before used to confirm the supplied port
app.set('port', port);                                //Uses the port supplied by the environment, or defaults to 8000
const server = http.createServer(app);
server.on("error", onError);                          //Adding onError callback to the server.
server.on("listening", onListening);                  //Adding onListening callback to the server.
server.listen(port);                                  //Server is told to start serving.
