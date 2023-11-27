const express = require("express");
let app = express();
let path = require("path");
//if you want to see body value in console for that reason we will have to install body-parser
const bodyParser = require("body-parser");
//this is inbuild middlware for serving  public file   
app.use(express.static(path.join("public")));
app.use(express.static(path.join("image")));
//this is the middlware for the reading data in console in express libraray
app.use(bodyParser.json());
 let route=require('./routes/index')
 app.use('/',route)
app.listen(8000, () => {
  console.log("i am listing at prot no is :8000");
});
