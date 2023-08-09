const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const router = require("./routes")


app.get("/",router)

app.listen(port,_=> console.log(`this app run at port ${port}`))