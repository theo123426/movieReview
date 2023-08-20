const express = require('express');
const routes = express.Router();
const userRoutes = require("./userRoutes");
const movieRoute = require('./movieRoute');
const userController = require("../controller/userController/userController")
const {authentication} = require("../middleware/auth")


// Add routes
routes.post('/add',userController.addNewUser);
routes.post('/login',userController.loginUser)
routes.use(authentication)
routes.use('/user',userRoutes);
routes.use("/movie",movieRoute)

module.exports = routes;