// Import the required models
const Task = require("../models/task")
const User = require("../models/user")

// Export the function to get user tasks.
exports.getTasks = (req, res, next)=>{
  const userId = req.params.id;
  let fetchedTasks;
  User.findById(userId)
  .then(user =>{
    if(!user){
      return res.status(404).json({
        message: "Could not find a user with the given id"
      })
    }
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.currentpage;
    const query = Task.find();
    if(pageSize && currentPage){
      query
        .skip(pageSize*(currentPage-1))
        .limit(pageSize);
    }
    return query.find().select({title:1, description: 1, user_id:1});
  })
  .then( tasks =>{
    fetchedTasks = tasks;
    return Task.count({'user_id':userId});
  })
  .then(taskCount =>{
    res.status(200).json({
      message: "Successfully fetched tasks",
      tasks: fetchedTasks,
      taskCount: taskCount
    });
  })
  .catch(error =>{
    console.log(error);
    res.status(500).json({
      message: "Could not get list of tasks"
    })
  })
}

// Export the funciton to create and assign tasks
exports.createTask = (req, res, next) =>{
  const task = new Task({
    user_id: req.userData.userId,
    title: req.body.title,
    description: req.body.description
  })
  task.save()
  .then(result =>{
    res.status(201).json({
      message: "Task successfully added"
    })
  })
  .catch(error =>{
    res.status(500).json({
      message: "There was an issue while creating the task"
    })
  })
}
