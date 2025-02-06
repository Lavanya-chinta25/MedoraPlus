const express = require("express");
const app = express();
require('dotenv').config();
require('./Models/db.js');
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const AuthRouter = require("./Routers/AuthRouter.js");
const Products = require("./Routers/Products.js");


app.use(bodyParser.json())
app.use(cors());
app.use('/auth',AuthRouter);
app.use("/products",Products);
app.listen(PORT, ()=>{console.log("Server is listening")});