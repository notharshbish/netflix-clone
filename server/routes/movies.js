import express from 'express'
import fs from 'fs'
import {auth} from '../utils/verifytoken.js'
import { mysqldb } from '../server.js'

const movieRouter = express.Router()

movieRouter.get('/title/:id' , auth , async(req,res) => {
    const {id}  = req.params
    mysqldb.query("SELECT * FROM movies WHERE titleId = ?" , id , (err , data) => {
        if(err) return res.status(500).send({err})
        
        return res.send(data[0])
    })
})

movieRouter.get('/recommends' , async (req,res) => {
    const {userId} = req.params 
    mysqldb.query("SELECT * FROM users WHERE uId = ?" , userId , (err,data) => {
        if(err) return res.status(400).send({err})
        return res.send(data)
    })
})



export default movieRouter