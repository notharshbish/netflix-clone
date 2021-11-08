import express, { json } from 'express'
import fs from 'fs'
import { auth } from '../utils/verifytoken.js'
import { mysqldb } from '../server.js'

const genreRouter = express.Router()

genreRouter.get('/genres/:choice' , auth , async (req,res) => {
    const genreMovies = mysqldb.query("SELECT * FROM movies WHERE genre = ?" , req.params.choice , (err,data) => {
        if(err) return res.status(400).send({err})
        res.json(data)
    }) 
})

genreRouter.get('/getMovies' , auth ,  async (req,res) => {
    mysqldb.query("SELECT * FROM specificMovies" , (err,data) => {
        if(err) res.status(400).json({err})
        res.json(data)
    }) 
})

export default genreRouter