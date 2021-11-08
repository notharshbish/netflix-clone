import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import movieRouter from './routes/movies.js'
import genreRouter from './routes/genre.js'
import authRouter from './routes/auth.js'
import fs from 'fs' 
import mysql from 'mysql'
import mongoose from 'mongoose'
import allMoviesRouter from './routes/allMoviesRouter.js'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import bodyParser from 'body-parser'

//Server
const app = express()
const PORT = process.env.PORT || 5000   
dotenv.config()
//db 
export const mysqldb = mysql.createConnection({
    host : "localhost" ,
    user : "root" , 
    password : process.env.DB_PASSWORD   , 
    database : "moviesdb"
})

mysqldb.connect((err) => {
    if(err) {
        console.log(err.message)
    }
    else {
        console.log("Connected !")
    }
})

mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser : true , 
    useUnifiedTopology : true 
}).then(() => app.listen(PORT , () => {console.log(`Server is running on port ${PORT}`)}))

//middleware
app.use(cors({
    methods : ["GET" ,"POST"] , 
    origin : "http://localhost:3000" , 
    credentials : true , 
}))
app.use(express.json())
app.use(cookieParser())

//route middleware
app.use('/' , movieRouter)
app.use('/' , genreRouter)
app.use('/user' , authRouter)
app.use('/' , allMoviesRouter)
//listener
