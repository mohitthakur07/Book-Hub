const Joi = require('joi');

module.exports.bookSchema = Joi.object({
    books: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string().allow("",null),
        author: Joi.string().required(),
        contact: Joi.number().required(),
    }).required()
});

