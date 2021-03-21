// Import required libraries
const mongoose = require('mongoose');

// Import the required controllers to create the required entries
const adminController = require("../../API/controller/admin");

// Import the app required for testing.
const app = require("../../API/app");

async function dropAllCollections () {
  const collections = Object.keys(mongoose.connection.collections)
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName]
    try {
      await collection.drop()
    } catch (error) {
      // This error happens when you try to drop a collection that's already dropped. Happens infrequently.
      // Safe to ignore.
      if (error.message === 'ns not found') return

      // This error happens when you use it.todo.
      // Safe to ignore.
      if (error.message.includes('a background operation is currently running')) return

      console.log(error.message)
    }
  }
}

exports.setupDB = (db_name)=>{
  beforeAll(async () => {
    const url = "mongodb://" + process.env.MONGO_USERNAME + ":" + process.env.MONGO_PASSWORD + "@" + process.env.MONGO_HOST + ":" + process.env.MONGO_PORT + "/"+db_name+"?authSource=admin";
    await mongoose.connect(url, { useNewUrlParser: true })
  })

  afterAll(async () => {
    await dropAllCollections()
    // Closes the Mongoose connection
    await mongoose.connection.close()
  })
}
