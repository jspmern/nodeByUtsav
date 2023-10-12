const http = require("http");
const path = require("path");
const fs = require("fs");
let server = http.createServer();

server.on("request", (req, res) => {
  if (req.url === "/style.css") {
    // Serve the CSS file for all routes
    const cssFilePath = path.join(
      __dirname,
      "..",
      "public",
      "css",
      "style.css"
    );
    fs.readFile(cssFilePath, "utf8", (err, data) => {
      if (err) {
       
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("CSS file not found");
      } else {
        res.writeHead(200, { "Content-Type": "text/css" });

        res.end(data);
      }
    });
  } else if (req.url === "/") {
    let homePath = path.join(__dirname, "..", "public", "index.html");
    fs.readFile(homePath, "utf-8", (err, data) => {
      res.end(data);
    });
  } else if (req.url === "/about") {
   let aboutPath=path.join(__dirname,'..','public','about.html')
       fs.readFile(aboutPath,'utf-8',(err,data)=>{
         if(err)
         {
            res.writeHead(404,{"Content-Type":"text/plain"})
            res.end('about page is not available')
         }
         else{
            res.writeHead(200,{"Content-Type":'text/html'})
            res.end(data)
         }
       })
  } else if (req.url == "/service") {
   let servicePath=path.join(__dirname,'..','public','service.html')
   fs.readFile(servicePath,'utf-8',(err,data)=>{
      if(err)
      {
         res.writeHead(404,{"Content-Type":'text/plain'})
         res.end('service page is not found')
      }
      else{
         res.writeHead(200,{"Content-Type":"text/html"})
         res.end(data)
      }
   })
    res.end("hello this side service");
  } else if (req.url == "/contact") {
   let contactPath=path.join(__dirname,'..','public','contact.html')
   fs.readFile(contactPath,'utf-8',(err,data)=>{
      if(err)
      {
         res.writeHead(404,{"Content-Type":'text/plain'})
         res.end('contact is not found')
      }
      else{
         res.writeHead(200,{"Content-Type":"text/html"})
         res.end(data)
      }
   })
    res.end("hello this side contact");
  } else if (req.url == "/product") {
   let productPath=path.join(__dirname,'..','public','product.html')
   fs.readFile(productPath,'utf-8',(err,data)=>{
      if(err)
      {
         res.writeHead(404,{"Content-Type":'text/plain'})
         res.end('product page is not found')
      }
      else{
         res.writeHead(200,{"Content-Type":"text/html"})
         res.end(data)
      }
   })
     
  } else {
    res.end("not found");
  }
});
server.listen("8000", (err) => {
  if (err) {
    console.log("somthing error while creating server");
  } else {
    console.log("port we are listing in 8000");
  }
});
