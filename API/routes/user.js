const express=require("express");
const userController  = require("../controller/user");
const user_router = express.Router();

user_router.post('/', userController.createUser);
user_router.delete('/', userController.deleteUser);

module.exports = user_router;
