const http = require('http')
const url = require('url')
const port = 9800
const hostname = '127.0.0.1'
const server = http.createServer((req, res) => {
    console.log(req.url)
    if(req.url==='/'){
        res.end('handle("hello")')
    }
})
server.listen(port, hostname, ()=>{
    console.log(`Server running at port: ${hostname}:${port}`)
})