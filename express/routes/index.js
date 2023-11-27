const express=require('express');
const { error, allProductData, productView } = require('../controller/product');
const { updateUserView, updateUser, singleUserDelete, allUserView } = require('../controller/allUser');
const {   aboutview, serviceView, registorView, singlePage, loginView, checkLogin, download, registration } = require('../controller/login');
const upload = require('../config/multer');
const { adminLogin, adminTemplate, countData, adminListing, moreDetails } = require('../controller/admin');
const router=express.Router()
let app = express();
//if you want to see body value in console for that reason we will have to install body-parser
let path = require("path");
let fs = require("fs");
//this is inbuild middlware for serving  public file   
app.use(express.static(path.join("../public"))); 
// router.get("/",homeView );
//this is our about page
router.get("/about", aboutview);
//this is for the service page
router.get("/service",serviceView );
//this is for about and later onward its became singleproduct
router.get("/about/:id",singlePage );
//this is for the serving login page
router.get("/login",loginView );
//this is for the logining data if user is availble then give access of login page other wise send to registration page
router.post("/login",checkLogin);
//this is for the downloading the data
router.get("/download", download);
//this is for the registration getting the data and posting the data
router.get("/registor",registorView);

router.post("/registor", upload.single("image"),registration);
router.get("/allUser",allUserView );
//this is for the delete action
router.delete("/singleUserDelete/:id",singleUserDelete );

//this for the update user
router.put("/updateUser", upload.single("image"), updateUser);

//this is updateUserView
router.get("/editUserTemp/:id",updateUserView );
//this is for the product view
router.get('/product',productView)
//this is route for the product page
router.get('/allproduct',allProductData)
router.get('/admin',adminTemplate)
router.post('/adminlogin',adminLogin)
router.get('/count',countData)
router.post('/adminlisting',upload.array('images', 13),adminListing)
router.get("/moreuser/:id",moreDetails)
router.get("*", error);
module.exports=router