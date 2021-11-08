import session from 'express-session'
import jwt from 'jsonwebtoken' 

const auth = async(req,res,next) => {
    const token = req.headers['auth-token']
    try {
        const verified = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)
        req.user = verified
        next()
    }
    catch(err) {
        res.status(400).send("Invalid token !")
    }
}

export {auth}