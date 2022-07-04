const Joi = require('joi')

const schema = Joi.object(
    {
    
        firstName: Joi.string().alphanum().min(3).max(30).required(),
        lastName:  Joi.string().alphanum().min(3).max(30).required(),
        username:  Joi.string().min(6).max(16).required(),
        password:  Joi.string().required(),
        email:     Joi.string().email().required(),
        address:   Joi.string().required(),
        phone:     Joi.string().min(9).max(13).required()
    }
)

module.exports = schema 