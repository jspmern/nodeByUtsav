let http=require('http')
let fs=require('fs')
let server=http.createServer((req,res)=>{
 if (req.url==='/')
 {
   fs.readFile(`${__dirname}/home.html`,'utf-8',(err,data)=>{
    res.writeHead(200,{"content-type":"text/html"})
    res.end(data)
   })
    
 }
 
 else if(req.url ==='/about')
 {
    fs.readFile(`${__dirname}/About.html`,'utf-8',(err,data)=>{
        res.writeHead(200,{"content-type":"text/html"})
        res.end(data)
       })
 }
 else if(req.url === '/contact')
 {
    fs.readFile(`${__dirname}/Contact.html`,'utf-8',(err,data)=>{
        res.writeHead(200,{"content-type":"text/html"})
        res.end(data)
       })
 }
 else{
    res.writeHead(404,{'content-type':'text/html'})
    res.end('<h1>page is not found</h1>')
 }
})
server.listen(8000,'127.0.0.1' ,(err)=> {
    console.log(`server is listen at port 8000`)
    
})