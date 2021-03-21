// Import the required libraries
const bcrypt = require("bcrypt");

// Import the user model
const User = require('../models/user');

function createNewUser(email, password){
  return bcrypt.hash(password, 10)
    .then(hash => {
      const user = new User({
        email: email,
        password: hash
      })
      return user.save();
    })
}

exports.createNewUser = createNewUser;

// Export controller function to create a user.
exports.createUser = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    res.status(401).json({
      message: "You did not supply valid email id or password"
    })
    return;
  }
  createNewUser(email,password)
    .then(result => {
      res.status(201).json({
        message: "User created"
      })
    }).catch(err => {
      res.status(500).json({
        message: "The email id has already been used"
      })
    });
}

// Export controller function to delete a user
exports.deleteUser = (req, res, next) => {
  User.deleteOne({
    email: req.query.email
  })
    .then(result => {
      if (result.deletedCount == 0) {
        throw "Email id does not exist"
      }
      res.status(202).json({
        message: "User deleted"
      })
    }).catch(err => {
      if(err != "Email id does not exist"){
        console.dir(err)
        console.log(err);
      }
      res.status(500).json({
        message: "The email id does not exist"
      })
    });
}
