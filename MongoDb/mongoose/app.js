let mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/jsp').then((item)=>{
    console.log('your db is connected')
}).catch((err)=>{
    console.log('this is the error')
})

//this is for the schema (means you can define which sort of data you want to store and define)
let detailschema=new mongoose.Schema(
    {
        name:{
            type:String,
            require:true
        },
        course:String,
        email:String,
        age:Number,
        gender:String,
        isPartOfJsp:Boolean,
        date:{
            type:Date,
            default:Date.now
        }
    }
)
//this is going to create the modal for my collection
let  Detail=new mongoose.model('student',detailschema)

//this is the time we have to store the collection inside the collection
// async function insertOneData()
// {
//         try{
//              let insertOne=new Detail({names:'utsav',course:'mern',emailss:"utsavmaithili@gmail.com",gender:"M",isPartOfJsp:true});
//              let data = await insertOne.save()
//              console.log('this is the data',data)
//         }
//         catch(e)
//         {
//             console.log(e)
//         }
// }
// insertOneData()


// This is the time for the add multiple collection  at the one time
// async function  insertManyData()
// {
//     try{
//         let   stu1= new Detail({name:'aman',course:'java',emailss:"utsavmaithili@gmail.com",gender:"M",isPartOfJsp:true})
//         let   stu2= new Detail({name:'rashi',course:'mern',emailss:"utsavmaithili@gmail.com",gender:"M",isPartOfJsp:true})
//         let   stu3= new Detail({name:'miku',course:'python',emailss:"utsavmaithili@gmail.com",gender:"M",isPartOfJsp:true})
//         let   stu5= new Detail({name:'ankansha',course:'java',emailss:"utsavmaithili@gmail.com",gender:"M",isPartOfJsp:true})
//         let   stu4= new Detail({name:'rashi',course:'mern',emailss:"utsavmaithili@gmail.com",gender:"M",isPartOfJsp:true})
  
//         let data= await Detail.insertMany([stu1,stu2,stu3,stu4,stu5])
//         console.log(data)
//     }
//     catch{
//         console.log('somthing error is occure')
//     }
      
// }  
// insertManyData() 


//this is for the reading the file in the db

// async function readData()
// {
//        let result= await Detail.find({name:"utsav"},{name:1}).limit(2)
//        console.log(result)
// }
// readData()


//advance filter in the mongodb
async  function advanceFilter()
{
    let result= await Detail.find({})
}

