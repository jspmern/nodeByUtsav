const fs=require('fs')

//create file
//  fs.writeFileSync('read.txt','hello this is my first node js ')
//override
// fs.writeFileSync('read.txt','hello i am override data')

//update data
// fs.appendFileSync('read.txt','  hii i am new update')

//read data  (here you are getting buffer data,if you want oringnal data you have one method is toString())
// let data=fs.readFileSync('read.txt')
// console.log(data.toString())
{/* <Buffer 68 65 6c 6c 6f 20 69 20 61 6d 20 6f 76 65 72 72 69 64 65 20 64 61 74 61 68 69 69 20 69 20 61 6d 20 6e 65 77 20 75 70 64 61 74 65 20 20 68 69 69 20 69 ... 35 more bytes> */}

//renamefile
// fs.renameSync('read.txt','crud.txt')

// //create folder using nodejs
// fs.mkdirSync('newFolder')

// //delete folder
// fs.rmdirSync('newFolder')

//read data without buffer data
// let oringnal=fs.readFileSync('crud.txt','utf-8')
// console.log(oringnal)


// //copy file
// fs.copyFileSync( 'crud.txt','crudCopy.txt')

//dekete file
//fs.unlinkSync('crudCopy.txt')

//fs.mkdirSync('fsModule')
fs.mkdirSync('fsModule/sync')
