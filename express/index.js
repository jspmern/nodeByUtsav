const express = require("express");
let app = express();
let path = require("path");
let fs = require("fs");
//if you want to see body value in console for that reason we will have to install body-parser
const bodyParser = require("body-parser");
//this is for the file upload file
let multer = require("multer");
//this is inbuild middlware for serving  public file
app.use(express.static(path.join("public")));
//this is the middlware for the reading data in console in express libraray
app.use(bodyParser.json());
//this is for the path of db
let db = path.join(__dirname, "db/data.js");
// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "image/"); // Upload images will be stored in the 'uploads/images/' directory
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });
//this is for root
app.get("/", (req, res) => {
  console.log(path.join(__dirname, "public"));
});
//this is our about page
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public/about.html"));
});
//this is for the service page
app.get("/service", (req, res) => {
  res.sendFile(path.join(__dirname, "public/service.html"));
});
//this is for about and later onward its became singleproduct
app.get("/about/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "public/home.html"));
});
//this is for the serving login page
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public/login.html"));
});
//this is for the logining data if user is availble then give access of login page other wise send to registration page
app.post("/login", (req, res) => {
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
});
//this is for the downloading the data
app.get("/download", (req, res) => {
  let pathx = path.join(__dirname, "public/abc.pdf");
  res.download(pathx);
});
//this is for the registration getting the data and posting the data
app.get("/registor", (req, res) => {
  res.sendFile(path.join(__dirname, "public/registorion.html"));
});

// app.post('/registor',upload.single('image'),(req,res)=>{
//   if (!req.file) {
//     return res.status(400).send('No file uploaded.');
// }
//   console.log('hii ii am post')
//   console.log(req.file)
//   res.send('sucessfully added')
// })
app.post("/registor", upload.single("image"), (req, res) => {
  console.log(req.body);
  console.log(req.file.path);
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  let { fullName, text, password } = req.body;
  let newData = {
    id: new Date().getMilliseconds(),
    text: text,
    fullName: fullName,
    pass: password,
    img: req.file.path,
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
});
app.get('/allUser',(req,res)=>{
   fs.readFile(db,'utf-8',(err,data)=>{
    if(err)
    {
      res.send('somthing werong while reading')
    }
    else{
      let  originalData=JSON.parse(data)
      res.send(originalData)
    }
   })
})
app.get("*", (req, res) => {
  res.send("link is not found");
});

app.listen(8000, () => {
  console.log("i am listing at prot no is :8000");
});
