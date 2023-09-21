// let fs=require('fs')
// fs.writeFileSync('app1.js','')
 
  //1 st way
// exports.add=function()
// {
//     console.log('hii i am add')
// }
//  exports.sub=function()
// {
//     console.log('hii i am sub')
// }

//2nd way
let add=function()
{
    console.log('hii i am add')
}
 let sub=function()
{
    console.log('hii i am sub')
}
module.exports={add,sub}