// Import required libraries.
const mongoose = require('mongoose');

//Create schema for users.
const userSchema = mongoose.Schema({
  email: { type: String, require:true, unique: true},
  password: { type: String, require:true}
});

//Export the model.
module.exports=mongoose.model('User', userSchema);
