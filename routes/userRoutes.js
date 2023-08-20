const express = require('express');
const userRoutes = express.Router();
const userController = require("../controller/userController/userController")

userRoutes.put("/edit/:id",userController.editProfile)


module.exports = userRoutes