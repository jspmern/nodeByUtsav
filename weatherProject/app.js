let http = require("http");
let fs = require("fs");
let server = http.createServer();
let axios = require("axios");
//this is for readfile
let x = fs.readFileSync("index.html", "utf-8");
//this is for getting data
let cardHtml = "";
axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
  const temp = res.data;
 
  temp.forEach((data) => {
    const demo = x
      .replace("{name}", data.name)
      .replace("{email}", data.email)
      .replace("{username}", data.username);

    cardHtml += demo;
  });
});

server.on("request", (req, res) => {
  if (req.url === "/") {
    //     fetch('https://jsonplaceholder.typicode.com/users').then((data)=>{
    //     return data.json()
    //   }).then((item)=>{
    //     console.log(item)
    //   })

    res.end(cardHtml);
  } else if (req.url === "/admin") {
    res.end("hello i am admin");
  } else if (req.url === "/login") {
    res.end("hello i am login");
  }
});

server.listen("8000", (err) => {
  console.log("connected at port 8000");
});
