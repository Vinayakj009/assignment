// Import the required libraries
const jwt = require("jsonwebtoken")

// Import the user model
const User = require('../models/user');

// Export the middleware
module.exports = (req, res, next) =>{
  try{
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token,process.env.JWT_SECRET);
    User.findOne({'email':decodedToken.email})
    .then(user =>{
      if(!user){
        return res.status(401).json({message:"Could not find the user. The user may have been deleted."});
      }
      req.userData = {email: user.email, userId:user._id}
      next();
    }).catch(error=>{
      console.log(error);
      res.status(401).json({message:"Could not verify your session"});
    })
  }catch(error){
    res.status(401).json({message:"Your session has expired"});
  }
};
