import express from 'express'
import fs from 'fs' 
import { mysqldb } from '../server.js'
import { spawn } from 'child_process'
import {PythonShell} from 'python-shell'
import {auth} from '../utils/verifytoken.js'

const allMoviesRouter = express.Router()

// allMoviesRouter.get('/' , (req,res) => {
//     fs.readdir('./data/' , (err,files) => {
//         files.map(file => {
//             fs.readFile(`data/${file}` , (err,data) => {
//                 if(err) return res.status(500).json({err})
//                 const dataJson = JSON.parse(data) 
//                 const genre = file.substring(0,file.indexOf('.'))
//                 const moviesArray = dataJson[genre] 
//                 moviesArray.map(movie => {
//                     const url = movie.banner.url
//                     const titleId = Number(url.match(/\d+/g))
//                     const poster = movie.poster 
//                     const banner = JSON.stringify(movie.banner)
//                     mysqldb.query('INSERT INTO movies values (? ,? ,?, ?)' , [titleId , genre , poster , banner])
//                 })
//             })
//         })
//     })
// })

allMoviesRouter.post('/getUser' , auth , async(req,res) => {
    mysqldb.query("SELECT * FROM users WHERE uId = ?" , req.user.id , (err,data) => {
        if(err) return res.status(500).send({err})
        res.status(200).json(data)
    })
})



allMoviesRouter.post('/recommend' , async(req,res) => {
    const {movie , id } = req.body
    //setting lastMovie 
    mysqldb.query("UPDATE users SET lastMovie = ? WHERE uId = ?" , [movie , id] , (err,data) => {
        if(err) return res.send({err}).statusCode(400)
    })

    // getting the recommendations 
    let options = {
        mode : 'text' , 
        pythonOptions : ['-u'] , 
        args : [movie]
    }
    PythonShell.run('./recommender.py' , options ,  (err,data) => {
        if(err) console.log('This is in recommend : ' ,  err)
        // console.log(data[0])
        mysqldb.query("UPDATE users SET recommendations = ? WHERE uId = ?" , [data[0] , id] , (err,sql) => {
            if(err) return res.status(500).send({err})
            return res.send(data[0])
        })
    })
})

export default allMoviesRouter