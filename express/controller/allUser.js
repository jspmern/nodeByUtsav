let path = require("path");
let fs = require("fs");
let db = path.join(__dirname, "../db/data.js");
//this is alll user view
let allUserView=(req, res) => {
    fs.readFile(db, "utf-8", (err, data) => {
      if (err) {
        res.send("somthing werong while reading");
      } else {
        let originalData = JSON.parse(data);
        res.send(originalData);
      }
    });
  }
  //this is for singleUserDelete
  let singleUserDelete=(req, res) => {
    fs.readFile(db, "utf-8", (err, data) => {
      if (err) {
        res.send("somthing wrong while reading the data");
      } else {
        let orignalData = JSON.parse(data);
        let delteData = orignalData.filter((item) => {
          return item.id != req.params.id;
        });
        fs.writeFile(db, JSON.stringify(delteData), (err) => {
          if (err) {
            res.send("while reading the data i am facing the error");
          } else {
            res.json({ delete: true });
          }
        });
      }
    });
  }
  //this is for update User
  let updateUser=(req, res) => {
    let { id, text, fullName, pass } = req.body;
    fs.readFile(db, "utf-8", (err, data) => {
      if (err) {
        res.send("somthing error while reading the db");
      } else {
        let orignalData = JSON.parse(data);
        let findData=orignalData.find((item)=>{
          return item.text==text
        })
        if(findData)
        {
          res.send({msg:"user is already is there"})
        }
        else{
          let updataData = orignalData.map((item) => {
            if (item.id == id) {
              return {
                ...item,
                id,
                text,
                fullName,
                img: req.file ? req.file.filename : item.img,
                pass,
              };
            } else {
              return item;
            }
          });
          fs.writeFile(db,JSON.stringify(updataData),(err)=>{
            if(err)
            {
              res.send({update:false})
            }
            else{
              res.json({update:true})
            }
          })
        }  
      }
    });
  }
  //this is for creating update View
  let updateUserView=(req, res) => {
    let id = req.params.id;
    let templatePath = path.join(__dirname, "../public/edit.html");
    fs.readFile(db, "utf-8", (err, data) => {
      if (err) {
        res.send("somthing error while reding the data");
      } else {
        let orignalData = JSON.parse(data);
        let findData = orignalData.find((item) => {
          return item.id == id;
        });
        if (findData) {
          fs.readFile(templatePath, "utf-8", (err, data) => {
            if (err) {
              res.send("somthing error while reding the template");
            } else {
              const modifiedHtml = data
                .replace("{{id}}", findData.id)
                .replace("{{fullName}}", findData.fullName)
                .replace("{{text}}", findData.text)
                .replace("{{pass}}", findData.pass)
                .replace("{{img}}", findData.img)
                .replace("{{imgs}}", findData.img);
              res.send(modifiedHtml);
            }
          });
        } else {
          res.send("data is not available");
        }
      }
    });
  }

  //this is for the export
  module.exports={
     allUserView,
     singleUserDelete,
     updateUser,
     updateUserView
  }
