const express = require('express');
const cors = require('cors');
const routes = require('./routes')
const socketIO = require('socket.io')
const http = require('http')

const app = express()
var corsOptions = {
    origin: 'https://www.finamassa.online'
}
const server = http.createServer(app)

const io = socketIO(server)

var red, blue, reset
red   = '\u001b[31m'
blue  = '\u001b[34m'
reset = '\u001b[0m'


io.on('connection', socket =>{
    console.log(blue+'usuario conectado'+reset)

    socket.on('hasPedido', (information)=>{
        console.log(blue+`informação recebida: ${information}`+reset)
        if(information){
            io.sockets.emit('hasPedido', information)
        }
    })

    socket.on('disconnect', ()=>{
        console.log(red+'Usuario desconectado'+reset)
    })
})

app.use(cors())
app.use(express.json())
app.use(routes)

server.listen(3000)