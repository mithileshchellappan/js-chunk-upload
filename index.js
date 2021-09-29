const http = require('http');
const fs = require('fs')
const path = require('path')
const server = http.createServer()
server.on('listening',()=>console.log('listening'))
server.on('request',(req,res)=>{
    if(req.url==='/'){
        res.end(fs.readFileSync('index.html'))
        return
    }
    if(req.url==="/upload"){
        const fileName = req.headers["file-name"]
        req.on('data',chunk=>{
            fs.appendFileSync(fileName,chunk)
            console.log("received chunk")
        })
        res.end("uploaded")
    }
})


server.listen(8080)