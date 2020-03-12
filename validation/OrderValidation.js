
const Joi = require('joi');


exports.order = function (Order) {
    const OrderSchema = {
        'description': Joi.string().required(),
        'location': Joi.string().required(),
        'phone': Joi.string().required(),
        'section_id': Joi.string().required(),
        'createdAt': Joi.string().required(),
        'country_id' :Joi.string().required(),
        'file' :Joi.string().required(),
        'count':Joi.number().required(),
    }
    return Joi.validate(Order, OrderSchema);
}

