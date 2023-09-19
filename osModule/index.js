let os=require('os')

let x
// x=os.platform()
//x=os.arch()
//x=os.hostname()
//x=os.platform()
//x=os.tmpdir()
//x=os.type()
//x=os.userInfo()
//x=os.freemem()
x=os.totalmem()
console.log(x)