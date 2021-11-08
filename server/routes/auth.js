import express from  'express' 
import { loginValidation, regsiterValidation } from '../utils/validation.js'
import Users from '../models/user.js'
import bcrypt, { genSalt } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { mysqldb } from '../server.js'
import { v4 as uuidv4 } from 'uuid'


const authRouter = express.Router() 

authRouter.post('/register' , async (req,res) => {
    const {err} = regsiterValidation(req.body)

    if(err) return res.status(500).send(err.details[0].message)

    const emailExists = await Users.findOne({email : req.body.email})
    if(emailExists) return res.status(500).send("User already exists!")

    const salt = await genSalt(10) 
    const hashedPassword = await bcrypt.hash(req.body.password  , salt)
    const uId = uuidv4()

    Users.create({
        id : uId ,  
        email : req.body.email , 
        password : hashedPassword , 
        username : req.body.username
    }, (err,data) => {
        if(err) return res.status(400).send(err)
        // console.log(data._id)
        mysqldb.query("SELECT * FROM movies ORDER BY RAND() LIMIT 5" , (err,sql) => {
            if(err) console.log(err)

            mysqldb.query("INSERT INTO users(uId,username,recommendations) VALUES (?,?,?)" , [uId , req.body.username , JSON.stringify(sql)] , (err,data) => {
                if(err) throw err
            })
        })
        const token = jwt.sign({_id : data._id}  ,  process.env.ACCESS_TOKEN_SECRET)
        res.status(200).header('auth-token'  ,  token).end()
    })
})


authRouter.post('/login'  , async (req,res)  => {
    const {err} = loginValidation(req.body)
    if(err) return res.status(400).send(err.details[0].message)

    const user = await Users.findOne({email : req.body.email})
    if(!user) return res.status(400).send("Email Id or Password is incorrect !")

    const passwordExists  = await bcrypt.compare(req.body.password ,user.password )
    if(!passwordExists) return res.status(400).send("Email Id or Password is incorrect !")

    const token =  await jwt.sign({id : user.id} , process.env.ACCESS_TOKEN_SECRET)
    res.cookie('_ga' , token)
    res.end()
})

export default authRouter