const express = require('express');
const Task = require('../models/Tasks')

const crearTask = async(req,res=express.request)=>{
    const task = new Task(req.body);
    try{
        task.user=req.uid;
        const saved = await task.save();
        res.json({
            ok:true,
            task:saved
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            ok: false,
            msg:'Error Interno'
        })
    }

}
const listarTask = async(req,res = express.request)=>{
    const tasks = await Task.find().populate('user','name');
    try{
        res.status(200).json({
            ok:true,
            tasks,
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Error Interno',
        })
    }
}
const actualizarTask = async(req,res = express.request)=>{

}
const eliminarTask = async(req,res = express.request)=>{
    
}
module.exports={
    crearTask,
    listarTask,
    actualizarTask,
    eliminarTask
}