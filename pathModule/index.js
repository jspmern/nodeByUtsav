const path= require('node:path')
//console.log(path)
//console.log(path.basename('C:/Users/HP/Desktop/node/fsModule/asynchronous/demo.txt')) //in base name we have to give forward slash inseted of backward slash
 
//console.log(path.basename('C:/Users/HP/Desktop/node/fsModule/asynchronous/demo.txt'))  //we are getting base module

//console.log(path.extname('C:/Users/HP/Desktop/node/fsModule/asynchronous/demo.txt'))   //it is give the extension name
//console.log(path.parse('C:/Users/HP/Desktop/node/fsModule/asynchronous/demo.txt'))   //it is give in object formate(root,dir,base,ext,name)

//console.log(path.dirname('C:/Users/HP/Desktop/node/fsModule/asynchronous/demo.txt'))   //it is give the directroy name


console.log(__filename)   //it is give all the file name included index.js
console.log(__dirname)    //it give the directory name


console.log(path.join(__dirname,'abc','xyz'))