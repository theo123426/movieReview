const axios = require("axios")

let instanceAxios = axios.create({
    baseURL:"https://moviesdatabase.p.rapidapi.com",
    headers: {
        'X-RapidAPI-Key': 'cb1d05c8c8msh2e8e1d42b21044ap1a8544jsnb3d00ce6da57',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
      }
})

module.exports = instanceAxios