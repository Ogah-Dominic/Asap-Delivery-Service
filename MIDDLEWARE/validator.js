const Joi = require('@hapi/joi');
const validateResturrant = (req, res, next)=>{
    const schema  = Joi.object({
        Name: Joi.string().required(),
        email: Joi.string().required(),
        phoneNumber: Joi.string().pattern(/^[0-9]{11}$/).required(),
        password: Joi.string().min(8).pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]*$/).required()
        .messages({
            'string.base': 'Password must be a string',
            'string.empty': 'Password cannot be empty',
            'string.min': 'Password must be at least {{#limit}} characters long',
            'any.required': 'Password is required',
            'string.pattern.base': 'Password must contain at least 1 number or alphebet and 1 symbol',
          }),
        confirmPassword: Joi.string().required()
    })

    const {error} = schema.validate(req.body);
    if (error) {
        const validateError = error.details.map((detail)=>detail.message);
        // const validateError = error.details[0].message
        res.status(409).json({
            message: validateError
        })
    } else {
        next()
    }
};

module.exports = validateResturrant;