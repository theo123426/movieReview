const express = require('express')
const {getMostPopularMovie, getRatingMovieById, getListMovieGenre} = require('../controller/movieController/movieController')
const movieRoute = express.Router()

movieRoute.get("/",getMostPopularMovie)
movieRoute.get("/list",getListMovieGenre)
movieRoute.get("/:id",getRatingMovieById)

module.exports = movieRoute