import Joi from '@hapi/joi'

const regsiterValidation = (data) => {
    const schema = Joi.object({
        email : Joi.string().min(10).email().required()  , 
        password : Joi.string().min(8).required() , 
        username : Joi.string().min(5).required()
    })
    return schema.validate(data)
}

const loginValidation = (data) => {
    const schema = Joi.object({ 
        email : Joi.string().min(10).email().required()  , 
        password : Joi.string().min(8).required() 
    })
    return schema.validate(data)
} 

export {loginValidation , regsiterValidation }