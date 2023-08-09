const express = require('express');
const routes = express.Router();



// Add routes
routes.get('/',(req,res) =>{
    res.send("MASUK ROUTER")
});

module.exports = routes;