let path = require("path");
let fs = require("fs");
let db = path.join(__dirname, "../db/data.js");
console.log(db)
//this is for the root
// let homeView=(req, res) => {
//     console.log(path.join(__dirname,"public"));
//   }
  //this is for the about view
  let aboutview=(req, res) => {
    res.sendFile(path.join(__dirname,"../public/about.html"));
  }
  //this is for the service view
  let serviceView=(req, res) => {
    res.sendFile(path.join(__dirname, "../public/service.html"));
  }
  //this is the registrationview
  let registorView= (req, res) => {
    res.sendFile(path.join(__dirname, "../public/registorion.html"));
  }

//this is for about and later onward its became singleproduct
let singlePage=(req, res) => {
  console.log(req.parms)
    res.sendFile(path.join(__dirname, "../public/home.html"));
  }
  //this is for the login page
  let loginView=(req, res) => {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  }
//check loginornot
let checkLogin=(req, res) => {
  
    fs.readFile(db, "utf-8", (err, data) => {
      if (err) {
        res.status(404).send("errror while reading the file");
      } else {
        let x = JSON.parse(data);
        let checkUserIsAvailableOrNot = x.find((data) => {
          return data.text == req.body.text;
        });
        //this is for condition for the user is available or not
        if (!checkUserIsAvailableOrNot) {
          res.send({ exist: false });
        } else {
          res.send({ exist: true });
        }
      }
    });
  }
  //this is for the downloading 
  let download=(req, res) => {
    let pathx = path.join(__dirname, "../public/abc.pdf");
    res.download(pathx);
  }

  //this is for the registration
  let registration=(req, res) => {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    let { fullName, text, password } = req.body;
    let newData = {
      id: Date.now(),
      text: text,
      fullName: fullName,
      pass: password,
      img: req.file.filename,
    };
     
    //read file
    fs.readFile(db, "utf-8", (err, data) => {
      if (err) {
        res.send("somthing get error while reding from db");
      } else {
        let orignalData = JSON.parse(data);
        let findData = orignalData.find((item) => {
          return item.text == text;
        });
        if (findData) {
          res.send("this user is alredy in db give another name");
        } else {
          let newCreatedData = [...orignalData, newData];
          fs.writeFile(db, JSON.stringify(newCreatedData), (err) => {
            if (err) {
              res.send("while inserting your data our db is fail");
            } else {
              // File uploaded successfully
              res.send("File uploaded!");
            }
          });
        }
      }
    });
  }
  
  module.exports={
    registration,
    download,
    checkLogin,
    loginView,
    singlePage,
    registorView,
    serviceView,
    aboutview,
     
  }