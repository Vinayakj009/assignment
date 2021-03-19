// Import required libraries.
const mongoose = require('mongoose');

//Create schema for users.
const taskSchema = mongoose.Schema({
  title: { type: String, require:true},
  description: { type: String, require:true},
  user_id: { type: String, require:true}
});

//Export the model.
module.exports=mongoose.model('Task', taskSchema);
