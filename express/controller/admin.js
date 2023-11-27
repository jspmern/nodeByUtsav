let path = require("path");
let fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
let app = express();
app.use(bodyParser.json());
//let path = require("path");
//if you want to see body value in console for that reason we will have to install body-parser

let db = path.join(__dirname, "../db/data.js");
let adminTemp = path.join(__dirname, "../public/admin.html");
let adminTemplate = (req, res) => {
  fs.readFile(adminTemp, "utf-8", (err, data) => {
    if (err) {
      res.sne("somthing wrong while reading the admintemplate");
    } else {
      res.send(data);
    }
  });
};
let adminLogin = (req, res) => {
  let { text, pass } = req.body;
  fs.readFile(db, "utf-8", (err, data) => {
    if (err) {
      res.send("somthing while reading the data");
    } else {
      let originalData = JSON.parse(data);
      let findData = originalData.find((item) => {
        return item.text == text && item.pass == pass && item.role == "admin";
      });
       
      if (findData) {

        res.json({login:true,user:findData});
      } else {
        res.redirect("/admin");
      }
    }
  });
}
let countData=(req,res)=>{
  fs.readFile(db,'utf-8',(err,data)=>{
    if(err)
    {
      res.send('somthing error is there while reading the file')
    }
    else{
      let originalData=JSON.parse(data)
      let length=originalData.length
      let count=0
      let adminCount=originalData.map((item)=>{
        if(item.role=="admin")
        {
          count++
        }
      })
      let normalCount=length-count
      res.send({total:length,adminCount:count,normal:normalCount})
    }
  })
}
let adminListing=(req,res)=>{
  let {id,text,username,pass,img}=req.body
     console.log(req.body)
     let imagearr=[]
     req.files.forEach(file => {
      imagearr.push(file.filename)
  });
  let obj={id,text,fullName:username,pass,img:imagearr,profile:img}
   fs.readFile(path.join(__dirname,'../db/Details.js'),'utf-8',(err,data)=>{
    if(err)
    {
      res.send({msg:'somthing error while reading'})
    }
    else{
      let globalArr=[]
       let originalData=JSON.parse(data)
       let findData=originalData.find((item)=>{
        return item.id==obj.id
       })
       if(findData)
       {
        let updateDate=originalData.map((item)=>{
          if(item.id==obj.id)
          {
            return   item=obj
          }
          else{
            return item
          }
          
       })
         globalArr=updateDate
       }
       else{
          globalArr=[...originalData,obj]
       }
      fs.writeFile(path.join(__dirname,'../db/Details.js'),JSON.stringify(globalArr),(err)=>{
        if(err)
        {
          res.send({msg:"somthing error while reading the file"})
        }
        else{
            res.send({msg:"sucessfully created"})
        }
      })
       
      
    }
   })
     
}

//this is the for the finding more details for admin
let moreDetails=(req,res)=>{
  let id=  req.params.id
  fs.readFile(path.join(__dirname,'../db/Details.js'),'utf-8',(err,data)=>{
    if(err)
    {
      res.send({msg:"somthing error while reading the data"})
    }
    else{
      let orignalData=JSON.parse(data)
      let finddata=orignalData.find((item)=>{
        return item.id==id
      })
      if(finddata)
      {
         fs.readFile(path.join(__dirname,"../public/MoreDetails.html"),'utf-8',(err,data)=>{
          if(err)
          {
            res.send({msg:"somthing error while reading the data"})
          }
          else{
           let modifiedHtml=data 
                        .replace("{{fullName}}",finddata.fullName)
                        .replace("{{text}}",finddata.text)
                         .replace("{{pass}}",finddata.pass)
                         .replace("{{img}}",finddata.profile)
                        res.send(modifiedHtml)
          }
          
         })
      }
      else{
        res.send({msg:"somthing wrong while reading"})
      }
    }
  })

           
}
module.exports = {
  adminLogin,
  adminTemplate,
  countData,
  adminListing,
  moreDetails
};
