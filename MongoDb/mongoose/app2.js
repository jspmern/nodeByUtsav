let mongoose = require("mongoose");
//this is for the connection
mongoose
  .connect("mongodb://127.0.0.1:27017/pratice")
  .then((item) => {
    console.log("connected with db");
  })
  .catch((err) => {
    console.log("this is the errror");
  });
//this is for schema
let studentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    lowercase:true,
    trim:true,
    unique:true,
    index:true,
    minLength:7,
    
    //minLength:[40,'must be at least 40']
  },
  course: String,
  age: Number,
  gender:  {
    type:String,
    enum:["male","female","other"]
  },
  email:{
    type:String,
    validate(value)
    {
      console.log(value)
      if(!value.length>6)
      {
        throw new Error ('email must be greater then the 6')
      }
    }
  },
  salary: Number,
  Date: {
    type: Date,
    default: Date.now,
  },
});

//this  is for the model
let StudentDetails = new mongoose.model("student", studentSchema);
//form here we are going to see  inbuit validator

async function addData()
{
     let res=  new StudentDetails({fullName:'utsav kuamr jha1',age:28,course:"MERN",gender:"male",email:"utsavmaithili@gmail.com",salary:4000})
     let data=await res.save()
     console.log(data)
}
addData()











//this is add one user

// async function addOneUser() {
//   try {
//     let data = new StudentDetails({
//       fullName: "utsav kumar jha",
//       course: "MERN",
//       age: 24,
//       gender: "M",
//       email: "utsavmaithili@gmail.com",
//       salary: 70000,
//     });
//     let res = await data.save();
//     console.log(res);
//   } catch {
//     console.log("hello this is erro");
//   }
// }
// addOneUser();


//this is for the insertMany for the db
// async function insertMultiple()
// {

//       try{
//         let stu1=new StudentDetails({
//             fullName: "Bob Williams",
//             course: "Mathematics",
//             age: 30,
//             gender: "Male",
//             email: "bob.williams@example.com",
//             salary: 70000,
//           })
//           let stu2=  new StudentDetails( {
//             fullName: "Eva Davis",
//             course: "Chemistry",
//             age: 26,
//             gender: "Female",
//             email: "eva.davis@example.com",
//             salary: 58000,
//           })
//           let stu3=  new StudentDetails( {
//             fullName: "Davis",
//             course: "Chemistry",
//             age: 27,
//             gender: "Female",
//             email: "eva.davis@example.com",
//             salary: 50000,
//           })
//           let stu4=  new StudentDetails( {
//             fullName: "vijaya",
//             course: "Mern",
//             age: 29,
//             gender: "Female",
//             email: "vijaya.davis@example.com",
//             salary: 68000,
//           })
//           let stu5=  new StudentDetails( {
//             fullName: "rashi",
//             course: "Mern",
//             age: 23,
//             gender: "Female",
//             email: "rashi.davis@example.com",
//             salary: 40000,
//           })
//           let stu6=  new StudentDetails( {
//             fullName: "yash",
//             course: "java",
//             age: 27,
//             gender: "Female",
//             email: "yash.davis@example.com",
//             salary: 55000,
//           })
//           let result= await StudentDetails.insertMany([stu1,stu2,stu3,stu4,stu5,stu6])
//           console.log(result)
//       }
//       catch(e)
//       {
//         console.log(e)
//       }

      
// }
// insertMultiple()

//this is the for fiding the one data

//aggrigate function 
// async function findOne()
// {
//    //let res= await StudentDetails.find({age:{$lt:25}},{fullName:1})
//    let res= await StudentDetails.find({course:{$nin:['MERN','java']}},{fullName:1})
//    console.log('this is the result',res)
// }
// findOne()

//this is the logical operator for the mongodb (and , or ,not)

// async function  logicalOperator()
// {
//        let data= await StudentDetails.find({$or:[{course:"MERN"},{age:{$gt:25}}]},{age:1,course:1,fullName:1}).sort({fullName:-1})
//        console.log(data)
// }
// logicalOperator();

//this is for the update the document 
// async function updateData()
// {
//     //   let data= await StudentDetails.updateOne({fullName:"utsav kumar jha"},{$set:{fullName:"utsavmaithili"}})
//     let data= await StudentDetails.findOneAndUpdate({fullName:"utsav kumar jha"},{$set:{fullName:"utsavjha"}})
//       console.log(data)
// }
// updateData()

//this is for the deletion

// async function deleteHandler()
// {
//     let data= await StudentDetails.deleteOne({fullName:"utsavmaithili"})
//     console.log(data)
// }
// deleteHandler()