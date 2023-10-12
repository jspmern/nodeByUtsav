let http=require('http')
let fs=require('fs')
 
let server=http.createServer();
//this is old method to read
//  server.on("request",(req,res)=>{
//     fs.readFile('demo.txt','utf-8',(err,data)=>{
//         if(err)console.log(err)
//         console.log(data)
 
//         res.writeHead(200,{"content-type":"application/json"})
//         res.write(data)
//         res.end()
//     })
    
//     //res.writeHead({"content-type":"application/josn"})
    
// })


//by using stream
server.on("request",(req,res)=>{
    const rstream=fs.createReadStream('demo.txt')
    rstream.on('data',(chunk)=>{
        res.write(chunk)
    })
    rstream.on('end',()=>{
        res.end()
    })
    rstream.on('error',(err)=>{
        res.end('file not found')
    })
})


server.listen('8000')
 