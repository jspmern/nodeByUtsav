//file module in asynchrouns

let fs=require('fs')  

//write file
 //if there is not an error on that time you are getting the null
// fs.writeFile('demo.txt',' hii i am from dark side',(err)=>{
//     console.log('file created successfully')
//     console.log(err)
// })

// //override
// fs.writeFile('demo.txt','hii i am from dark side again',(err)=>{
//     console.log('file created successfully again after the update')
// })


//update 
// fs.appendFile('demo.txt',"hiii i am append",(err)=>{
//     console.log('your text is updated')
// })

//read file
// fs.readFile('demo.txt','utf-8',(err,data)=>{
//     console.log('data is :',data)
//     console.log(err)

// })


//copy file
// fs.copyFile('demo.txt','newfile.txt',(err)=>{
//     console.log('copy done')
// })

// //remove file
// fs.unlink('newfile.txt',(err)=>{
//     console.log('delete')
// })