const express = require("express")
require('dotenv').config()
const {dbConnection} = require('./database/config')
const app = express();
app.use(express.static('public'))
app.use(express.json())
app.use('/api/auth',require('./routes/auth'))
const cors=require('cors')
dbConnection();
app.use(cors())

// app.get("/",(req,res)=>{
//     res.json({
//         ok:true
//     })
// })

app.use('/api/task',require('./routes/route-tasks'))

app.listen(process.env.PORT,()=>{
    console.log('Servidor corriendo en puerto',process.env.PORT)
})
const Server = require('./Server/server');
const myServer = new Server();
myServer.listen();
