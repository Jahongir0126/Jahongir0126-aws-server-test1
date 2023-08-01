import Joi from 'joi'

const courseValidation =(data)=>{
    const schema = Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required(),
        author: Joi.string().min(1).max(20).required()
    })

    return schema.validate(data)
}

export {
    courseValidation
}