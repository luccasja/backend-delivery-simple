const express = require('express');
const cors = require('cors');
const routes = require('./routes')
process.env.TZ = 'America/Sao_Paulo';
const app = express()
var corsOptions = {
    origin: 'http://localhost:3000'
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(routes)

app.listen(2525)