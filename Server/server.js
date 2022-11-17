const express = require('express')
require('dotenv').config()
const{dbConnection}=require('../database/config')
const cors = require('cors');
const { socketController } = require('../Controllers/sockets');


class Server{
    constructor(){
        this.app=express();
        this.port = process.env.PORT;
        this.paths={
            auth:'/api/auth',
            task:'/api/task'

        }
        this.connectToDB();
        this.addMiddlewares();
        this.setRoutes();

        this.sockets();
    }
    //base de datos
    async connectToDB(){
        await dbConnection();
    }
    addMiddlewares(){
        //Cors
        this.app.use(cors())
        // lectura y paseo del body
        this.app.use(express.json());
        // public folder
        this.app.use(express.static('public'))

    }
    setRoutes(){
        //Rutas
        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.task, require('../routes/route-tasks'))
    }
    sockets(){
       this.io.on(
            'connection',
            socket=> socketController(socket,this.io)
       )
    }
    listen(){
        //Escuchar en puerto 4000
        this.app.use(this.port,()=>{
            console.log('Servidor corriendo en puerto',process.env.PORT)
        })
    }

}
module.exports= Server;