// Import the required libraries
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Import the user model
const User = require('../models/user');

// Export function to allow a user to login
exports.login = (req, res, next) => {
  let fetched_user = null;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Wrong email id or password."
        })
      }
      fetched_user = user;
      return bcrypt.compare(req.body.password, user.password)
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Wrong email id or password."
        });
      }
      const token = jwt.sign(
        { email: fetched_user.email, userId: fetched_user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' });
      return res.status(200).json({
        message: "Authenticated",
        jwt: token,
        userId: fetched_user._id,
        expiresIn: 3600
      });
    })
    .catch(err => {
      console.log(error);
      return res.status(401).json({
        message: "Wrong email id or password."
      });
    })
}

// Export the function to allow the user to get a list of users from the database
exports.getUsers = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.currentpage;
  const query = User.find();
  let fetchedUsers;
  if (pageSize && currentPage) {
    query
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  query.find().select({email:1})
    .then(documents => {
      fetchedUsers = documents;
      return User.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Users fetched successfully",
        users: fetchedUsers,
        totalUsers: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching users failed"
      })
    });
}
